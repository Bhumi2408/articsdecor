import crypto from "crypto";

function encode(value) {
  return encodeURIComponent(String(value).trim()).replace(/%20/g, "+");
}

function toQueryString(data) {
  return Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k}=${encode(v)}`)
    .join("&");
}

export function generateSignature(data, passphrase) {
  let str = toQueryString(data);
  if (passphrase) str += `&passphrase=${encode(passphrase)}`;
  return crypto.createHash("md5").update(str).digest("hex");
}

export function getPayfastActionUrl() {
  return process.env.PAYFAST_MODE === "live"
    ? "https://www.payfast.co.za/eng/process"
    : "https://sandbox.payfast.co.za/eng/process";
}

// Field order matters for PayFast's signature check, so callers must render
// the returned object's entries in this same order as hidden form fields.
export function buildPaymentPayload({ order, returnUrl, cancelUrl, notifyUrl }) {
  const data = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: notifyUrl,
    name_first: (order.shippingAddress?.fullName || "Customer").split(" ")[0],
    email_address: order.shippingAddress?.email || "",
    m_payment_id: order.orderNumber,
    amount: Number(order.total).toFixed(2),
    item_name: `Lute Diamonds Order ${order.orderNumber}`,
  };
  const signature = generateSignature(data, process.env.PAYFAST_PASSPHRASE);
  return { ...data, signature };
}

export function verifyItnSignature(data) {
  const { signature, ...rest } = data;
  return generateSignature(rest, process.env.PAYFAST_PASSPHRASE) === signature;
}
