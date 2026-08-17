"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];
const PAYMENT_STATUSES = ["pending", "paid", "failed"];

export default function OrderStatusForm({ order }) {
  const router = useRouter();
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await fetch(`/api/orders/${order._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderStatus, paymentStatus }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="border border-border rounded-lg p-6 space-y-4 h-fit">
      <h2 className="font-serif text-lg">Update Order</h2>
      <div>
        <label className="block text-sm mb-1">Order Status</label>
        <select
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)}
          className="w-full border border-border rounded px-3 py-2 text-sm capitalize"
        >
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">Payment Status</label>
        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          className="w-full border border-border rounded px-3 py-2 text-sm capitalize"
        >
          {PAYMENT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSave} disabled={saving} className="btn-gold px-5 py-2 rounded text-sm">
        {saving ? "Saving..." : "Update Order"}
      </button>
    </div>
  );
}
