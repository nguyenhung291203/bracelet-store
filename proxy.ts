// proxy.ts
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

const AUTH_PAGES = ["/login", "/register"]
const PUBLIC_PAGES = ["/shop"]

const ROLE_ROUTES = {
  ADMIN: "/admin/dashboard",
  CUSTOMER: "/shop",
  EMPLOYEE: "/seller/dashboard",
} as const

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/.well-known")
  ) {
    return NextResponse.next()
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  console.log("🔍 Proxy Debug:", {
    pathname,
    hasToken: !!token,
    role: token?.role,
  })

  const isAuthPage = AUTH_PAGES.some((path) => pathname.startsWith(path))
  const isPublicPage = PUBLIC_PAGES.some((path) => pathname.startsWith(path))

  // Case 1: Chưa login + truy cập protected page
  if (!token && !isAuthPage && !isPublicPage) {
    console.log("❌ No token, redirecting to login")
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Case 2: Đã login + vào trang auth → redirect theo role
  if (token && isAuthPage) {
    console.log("✅ Has token but on auth page, redirecting by role")
    
    const redirectPath = req.nextUrl.searchParams.get("redirect")
    
    // Nếu có redirect param và không phải auth page
    if (redirectPath && !AUTH_PAGES.some(p => redirectPath.startsWith(p))) {
      return NextResponse.redirect(new URL(redirectPath, req.url))
    }
    
    // ✅ Redirect theo role
    const role = token.role as keyof typeof ROLE_ROUTES
    const defaultRoute = ROLE_ROUTES[role] || "/"
    
    console.log(`🎯 Redirecting ${role} to ${defaultRoute}`)
    return NextResponse.redirect(new URL(defaultRoute, req.url))
  }

  // Case 3: Đã login + đang ở home "/" → redirect theo role
  if (token && pathname === "/") {
    const role = token.role as keyof typeof ROLE_ROUTES
    const defaultRoute = ROLE_ROUTES[role]
    
    if (defaultRoute) {
      console.log(`🎯 Redirecting from home to ${defaultRoute}`)
      return NextResponse.redirect(new URL(defaultRoute, req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}