import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

const AUTH_PAGES = ["/login", "/register","/shop"]

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
    secret: process.env.JWT_ACCESS_SECRET,
  })

  const isAuthPage = AUTH_PAGES.some((path) =>
    pathname.startsWith(path)
  )

  if (!token && !isAuthPage) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}
