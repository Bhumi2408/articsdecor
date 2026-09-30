import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { createRazorpayOrder } from "@/lib/razorpay";

export async function POST(req) {
  const { orderId } = await req.json();
  if (!orderId) return NextResponse.json({ error: "Order id required" }, { status: 400 });

  await connectDB();
  const order = await Order.findById(orderId);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  const razorpayOrder = await createRazorpayOrder({
    amount: order.total,
    receipt: order.orderNumber,
  });

  order.razorpayOrderId = razorpayOrder.id;
  order.paymentMethod = "razorpay";
  await order.save();

  return NextResponse.json({
    keyId: process.env.RAZORPAY_KEY_ID,
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    orderNumber: order.orderNumber,
    name: order.shippingAddress?.fullName || "",
    email: order.shippingAddress?.email || "",
    phone: order.shippingAddress?.phone || "",
  });
}
