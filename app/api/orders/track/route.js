import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  const { orderNumber, email } = await req.json();
  if (!orderNumber || !email) {
    return NextResponse.json({ error: "Order number and email are required" }, { status: 400 });
  }

  await connectDB();

  const order = await Order.findOne({
    orderNumber: orderNumber.trim().toUpperCase(),
    "shippingAddress.email": email.toLowerCase().trim(),
  }).lean();

  if (!order) {
    return NextResponse.json({ error: "No matching order found" }, { status: 404 });
  }

  return NextResponse.json({
    orderNumber: order.orderNumber,
    orderStatus: order.orderStatus,
    paymentStatus: order.paymentStatus,
    createdAt: order.createdAt,
    total: order.total,
    items: order.items,
  });
}
