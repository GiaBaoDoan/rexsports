import { NextRequest, NextResponse } from "next/server";

// const authRoutes = ["/auth"];
// const protectedRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  // const { pathname } = request.nextUrl;

  // const isProtectedRoute = protectedRoutes.some((route) =>
  //   pathname.startsWith(route)
  // );
  // const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (token) {
    return NextResponse.redirect(new URL("/dashboard/overview", request.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
