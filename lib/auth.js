import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "session_token";
export const ADMIN_SESSION_COOKIE = "admin_session_token";

const customerSecret = new TextEncoder().encode(process.env.JWT_SECRET || "dev_customer_jwt_secret_change_me");
const adminSecret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || "dev_admin_jwt_secret_change_me");

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

async function sign(payload, secret, expiresIn) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

async function verify(token, secret) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function signCustomerToken(user) {
  return sign({ sub: user._id.toString(), email: user.email, name: user.name, role: "customer" }, customerSecret, "30d");
}

export async function signAdminToken(admin) {
  return sign({ sub: admin._id.toString(), email: admin.email, name: admin.name, role: "admin" }, adminSecret, "7d");
}

export async function setCustomerSessionCookie(token) {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearCustomerSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function setAdminSessionCookie(token) {
  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSessionCookie() {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
}

export async function getCurrentUser() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verify(token, customerSecret);
}

export async function getCurrentAdmin() {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verify(token, adminSecret);
}
