import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

interface UserWithSubscription {
  subscriptionStatus?: string;
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuth = !!req.auth;
  const user = req.auth?.user as UserWithSubscription | undefined;

  // Redirect authenticated users away from auth pages
  const authPaths = ["/login", "/signup"];
  const isAuthPage = authPaths.some((p) => pathname.startsWith(p));

  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Check subscription status for dashboard access
  if (pathname.startsWith("/dashboard") && isAuth) {
    if (user?.subscriptionStatus !== "active") {
      return NextResponse.redirect(new URL("/billing", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/billing/:path*", "/login", "/signup"],
};
