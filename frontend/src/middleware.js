import { NextResponse } from "next/server";
export function middleware(request) {
  const token = request.cookies.get("access_token");
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/pages/:path*",
};
