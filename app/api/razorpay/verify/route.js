// NOTE: Razorpay is disabled for now — checkout uses UPI (see /api/upi).
// Kept as-is so it can be re-enabled later by wiring CheckoutPage.jsx back
// to this endpoint.
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { verifyPaymentSignature } from "@/lib/razorpay";

export async function POST(req) {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderNumber,
  } = await req.json();

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderNumber) {
    return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
  }

  await connectDB();
  const order = await Order.findOne({ orderNumber });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  if (order.razorpayOrderId !== razorpay_order_id) {
    return NextResponse.json({ error: "Order mismatch" }, { status: 400 });
  }

  const valid = verifyPaymentSignature({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  if (!valid) {
    order.paymentStatus = "failed";
    await order.save();
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
  }

  order.paymentStatus = "paid";
  order.orderStatus = "processing";
  order.razorpayPaymentId = razorpay_payment_id;
  await order.save();

  return NextResponse.json({ ok: true, orderNumber: order.orderNumber });
}
