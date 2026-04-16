import { type NextRequest, NextResponse } from "next/server"
import { adminAuthMiddleware } from "@/lib/admin-auth"

export async function middleware(request: NextRequest) {
  // Use simple admin auth
  const authResponse = adminAuthMiddleware(request)
  if (authResponse) return authResponse
  
  return NextResponse.next()
}

export const config = {
  matcher: ["/portal/:path*"],
}
