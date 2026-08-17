import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { verifyPassword, signAdminToken, setAdminSessionCookie } from "@/lib/auth";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  await connectDB();

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (!admin || !(await verifyPassword(password, admin.passwordHash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await signAdminToken(admin);
  await setAdminSessionCookie(token);

  return NextResponse.json({ id: admin._id, name: admin.name, email: admin.email });
}
