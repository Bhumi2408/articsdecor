import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { getCurrentUser, getCurrentAdmin } from "@/lib/auth";

export async function GET(req, { params }) {
  const { id } = await params;
  await connectDB();

  const order = await Order.findById(id).lean();
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const admin = await getCurrentAdmin();
  if (admin) return NextResponse.json(order);

  const user = await getCurrentUser();
  if (user && order.user?.toString() === user.sub) return NextResponse.json(order);

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// Lets a customer cancel their own order while it's still unpaid — used when
// a UPI payment is abandoned. The order is removed entirely so it never
// shows up in order history; the cart is left untouched by the caller.
export async function DELETE(req, { params }) {
  const { id } = await params;
  const session = await getCurrentUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const order = await Order.findById(id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (order.user?.toString() !== session.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (order.paymentStatus === "paid") {
    return NextResponse.json({ error: "Cannot cancel a paid order" }, { status: 400 });
  }

  await Order.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req, { params }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  await connectDB();

  const allowed = {};
  if (body.orderStatus) allowed.orderStatus = body.orderStatus;
  if (body.paymentStatus) allowed.paymentStatus = body.paymentStatus;

  const order = await Order.findByIdAndUpdate(id, allowed, { new: true });
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(order);
}
