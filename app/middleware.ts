import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("sb-access-token")?.value;
  const pathname = req.nextUrl.pathname;
  
  // Public paths that don't require authentication
  const isPublicPath = 
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/auth") ||
    pathname === "/";

  // Check if user is authenticated
  if (!token && !isPublicPath) {
    // No token and not on public path, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (token && isPublicPath && pathname !== "/auth/callback") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
