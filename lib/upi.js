// UPI (intent-based) payment configuration.
// Razorpay remains wired up in lib/razorpay.js for future use — UPI is the
// active payment method for now.

export const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID || "8860166301@axl";
export const UPI_PAYEE_NAME = process.env.NEXT_PUBLIC_UPI_PAYEE_NAME || "Artics Decorr";
export const UPI_MCC = process.env.NEXT_PUBLIC_UPI_MCC || "8931";

// Builds a standard UPI deep link (`upi://pay?...`). Opening this on a
// mobile device launches the user's installed UPI apps (GPay, PhonePe,
// Paytm, etc.) with the amount and payee pre-filled.
export function buildUpiLink({ amount, note, txnRef }) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: UPI_PAYEE_NAME,
    mc: UPI_MCC,
    tr: txnRef,
    tn: note,
    am: Number(amount).toFixed(2),
    cu: "INR",
  });

  return `upi://pay?${params.toString()}`;
}
