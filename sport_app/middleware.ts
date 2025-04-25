import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// const authPattern = /^\/auth(\/.*)?$/;
// const protectedPattern = /^\/dashboard(\/.*)?$/;

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith("/auth");
  const isProtectedRoute = pathname.startsWith("/dashboard");

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard/overview", request.url));
  }

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
