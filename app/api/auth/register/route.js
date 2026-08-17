import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashPassword, signCustomerToken, setCustomerSessionCookie } from "@/lib/auth";

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  await connectDB();

  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const user = await User.create({ name: name.trim(), email: email.toLowerCase().trim(), passwordHash });

  const token = await signCustomerToken(user);
  await setCustomerSessionCookie(token);

  return NextResponse.json({ id: user._id, name: user.name, email: user.email });
}
