import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const customerSecret = new TextEncoder().encode(process.env.JWT_SECRET || "dev_customer_jwt_secret_change_me");
const adminSecret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || "dev_admin_jwt_secret_change_me");

async function isValid(token, secret) {
  if (!token) return false;
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get("admin_session_token")?.value;
    if (!(await isValid(token, adminSecret))) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  if (
    pathname.startsWith("/account") &&
    pathname !== "/account/login" &&
    pathname !== "/account/register"
  ) {
    const token = req.cookies.get("session_token")?.value;
    if (!(await isValid(token, customerSecret))) {
      const url = req.nextUrl.clone();
      url.pathname = "/account/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
