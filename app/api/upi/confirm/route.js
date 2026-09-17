import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { getCurrentUser } from "@/lib/auth";

// Called once the customer taps "Pay Now" and is sent off to their UPI app.
// UPI has no client-side signature to verify like Razorpay, so we cannot
// know here whether the payment actually succeeded — the order is only
// tagged as a UPI order and stays "pending". An admin must check the actual
// UPI/bank statement and mark it "paid" from the admin orders panel before
// the customer's order page will show it as paid.
export async function POST(req) {
  const { orderId } = await req.json();
  if (!orderId) return NextResponse.json({ error: "Order id required" }, { status: 400 });

  const session = await getCurrentUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const order = await Order.findById(orderId);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (order.user?.toString() !== session.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  order.paymentMethod = "upi";
  await order.save();

  return NextResponse.json({ ok: true, orderNumber: order.orderNumber });
}
