import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

const protectedRoutes = ["/dashboard", "/profile"];
const authRoutes = ["/login", "/register"];

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;


  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (!token) {


    if (isProtected) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }

  try {
    const payload = verifyToken(token);



    if (isAuthRoute) {

      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("JWT Verify Error:", error);

    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");

    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/register"],
};
