import crypto from "crypto";

const API_BASE = "https://api.razorpay.com/v1";

function authHeader() {
  const token = Buffer.from(
    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
  ).toString("base64");
  return `Basic ${token}`;
}

// Amount must be in the smallest currency unit (paise for INR).
export async function createRazorpayOrder({ amount, receipt, notes }) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt,
      notes,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.description || "Could not create Razorpay order");
  }
  return data;
}

export function verifyPaymentSignature({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) {
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  return expected === razorpay_signature;
}

export function verifyWebhookSignature(rawBody, signature) {
  if (!process.env.RAZORPAY_WEBHOOK_SECRET || !signature) return false;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  return expected === signature;
}
