import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  
  // Protect only user-specific pages; product browsing and details remain public
  const isProfileRoute = pathname.startsWith("/profile");

  if (isProfileRoute) {
    const sessionToken = request.cookies.get("better-auth.session_token") || 
                         request.cookies.get("__secure-better-auth.session_token");

    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"]
};
