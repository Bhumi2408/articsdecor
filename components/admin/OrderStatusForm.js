// components/admin/OrderStatusForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];
const PAYMENT_STATUSES = ["pending", "paid", "failed"];

const labelClass =
  "mb-1.5 block text-[12.5px] font-semibold uppercase tracking-[0.07em] text-[#6B6B6B]";

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-black/10 bg-white px-3.5 py-2.5 pr-10 text-[14.5px] capitalize text-[#141414] outline-none transition-all focus:border-[#BF9A3A] focus:ring-2 focus:ring-[#BF9A3A]/20"
        >
          {options.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A8A8A]"
        >
          <path d="m6 9.5 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

export default function OrderStatusForm({ order }) {
  const router = useRouter();
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const dirty = orderStatus !== order.orderStatus || paymentStatus !== order.paymentStatus;

  async function handleSave() {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch(`/api/orders/${order._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus, paymentStatus }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not update order");

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="h-fit rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
      <h2 className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-[#8A8A8A]">
        Update Order
      </h2>

      <div className="mt-5 space-y-5">
        <Select
          label="Order Status"
          value={orderStatus}
          onChange={setOrderStatus}
          options={ORDER_STATUSES}
        />
        <Select
          label="Payment Status"
          value={paymentStatus}
          onChange={setPaymentStatus}
          options={PAYMENT_STATUSES}
        />

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13.5px] text-red-700"
          >
            {error}
          </div>
        )}

        {saved && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-[13.5px] text-emerald-700">
            Order updated.
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving || !dirty}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#141414] py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#BF9A3A] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {saving ? "Saving..." : "Update Order"}
        </button>

        {!dirty && !saving && (
          <p className="text-center text-[12.5px] text-[#9A9A9A]">No changes to save.</p>
        )}
      </div>
    </div>
  );
}