import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { verifyItnSignature } from "@/lib/payfast";

export async function POST(req) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData.entries());

  if (!verifyItnSignature(data)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  await connectDB();

  const order = await Order.findOne({ orderNumber: data.m_payment_id });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  if (data.payment_status === "COMPLETE") {
    order.paymentStatus = "paid";
    order.orderStatus = "processing";
  } else if (data.payment_status === "FAILED") {
    order.paymentStatus = "failed";
  }
  order.payfastPaymentId = data.pf_payment_id || order.payfastPaymentId;
  await order.save();

  return new NextResponse("OK", { status: 200 });
}
