    // middleware.js
    import { NextResponse } from "next/server";
    import { verifyToken } from "@/lib/jwt";

    export function middleware(req) {
    const token = req.cookies.get("token")?.value;

    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/admin")) {
        if (!token) return NextResponse.redirect(new URL("/login", req.url));

        const user = verifyToken(token);
        if (!user || user.role !== "admin") {
        return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
    }

    // Apply middleware only to specific routes
    export const config = {
    matcher: ["/admin/:path*"],
    };