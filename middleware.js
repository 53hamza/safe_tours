// middleware.js
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(req) {
  console.log("🔍 Middleware running for:", req.nextUrl.pathname); // Debug log

  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (!token) {
      console.log("❌ No token, redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const user = verifyToken(token);
    if (!user || user.role !== "admin") {
      console.log("❌ Invalid/Unauthorized token");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    console.log("✅ Token valid, user allowed");
  }

  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/:path*"],
};

