import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Allow login page and auth callback without session
  if (pathname === "/portal/login" || pathname.startsWith("/api/auth")) {
    // If user is already logged in and on login page, redirect to dashboard
    if (user && pathname === "/portal/login") {
      const url = request.nextUrl.clone()
      url.pathname = "/portal/dashboard"
      return NextResponse.redirect(url)
    }
    return supabaseResponse
  }

  // Protect all /portal/* routes
  if (pathname.startsWith("/portal") && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/portal/login"
    return NextResponse.redirect(url)
  }

  // Protect /portal/admin/* routes — require admin role
  if (pathname.startsWith("/portal/admin") && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (!profile || profile.role !== "admin") {
      const url = request.nextUrl.clone()
      url.pathname = "/portal/dashboard"
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
