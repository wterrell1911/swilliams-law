// Admin authentication — requires environment variables, no fallback credentials

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const AUTH_COOKIE_NAME = 'admin_auth';

function assertCredentialsConfigured(): void {
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    throw new Error(
      'ADMIN_USERNAME and ADMIN_PASSWORD environment variables are required. ' +
      'No fallback credentials are permitted in the template.'
    );
  }
}

function generateToken(username: string): string {
  const payload = {
    username,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

function verifyToken(token: string): { valid: boolean; username?: string } {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    if (payload.exp < Date.now()) {
      return { valid: false };
    }
    return { valid: true, username: payload.username };
  } catch {
    return { valid: false };
  }
}

export async function adminLogin(username: string, password: string): Promise<{
  success: boolean;
  error?: string;
}> {
  assertCredentialsConfigured();
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = generateToken(username);
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });
    return { success: true };
  }
  return { success: false, error: 'Invalid credentials' };
}

export async function adminLogout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token).valid;
}

export async function getAdminUser(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  const result = verifyToken(token);
  return result.valid ? result.username || null : null;
}

export function adminAuthMiddleware(request: NextRequest): NextResponse | null {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isLoginPage = request.nextUrl.pathname === '/portal/login';

  if (!token || !verifyToken(token).valid) {
    if (!isLoginPage && request.nextUrl.pathname.startsWith('/portal')) {
      const loginUrl = new URL('/portal/login', request.url);
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  } else if (isLoginPage) {
    return NextResponse.redirect(new URL('/portal/dashboard', request.url));
  }

  return null;
}
