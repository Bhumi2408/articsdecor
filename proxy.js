import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const customerSecret = new TextEncoder().encode(process.env.JWT_SECRET || "dev_customer_jwt_secret_change_me");
const adminSecret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || "dev_admin_jwt_secret_change_me");

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.articsdecorr.com"
).replace(/\/$/, "");

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

  // Forward the current pathname as a request header so the root layout's
  // generateMetadata() can read it (via next/headers) and render an actual
  // <link rel="canonical"> tag for every page — including any page added
  // later, with nothing per-page to remember.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Also set it as an HTTP `Link` header (Google/Bing treat this the same
  // as the HTML tag) as a harmless extra signal for non-HTML responses.
  res.headers.set("Link", `<${SITE_URL}${pathname}>; rel="canonical"`);

  return res;
}

export const config = {
  matcher: [
    "/((?!api/|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|mp4|css|js)$).*)",
  ],
};
