import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger todas las rutas /dashboard excepto /dashboard/login
  if (pathname.startsWith("/dashboard") && !pathname.startsWith("/dashboard/login")) {
    const sessionCookie = request.cookies.get("dashboard_auth")?.value;
    const expected = process.env.ADMIN_DASHBOARD_PASSWORD;

    if (!expected || !sessionCookie || sessionCookie !== expected) {
      const loginUrl = new URL("/dashboard/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
