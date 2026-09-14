"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { formatINR } from "@/lib/format";
import Breadcrumbs from "@/components/Breadcrumbs";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  country: "South Africa",
};

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);

  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const subtotal = items.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  // Shipping is free for every order.
  const total = subtotal;

  async function handleSubmit(e) {
    e.preventDefault();

    if (items.length === 0) return;

    setSubmitting(true);
    setError("");

    try {
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((i) => ({
            product: i.productId,
            name: i.name,
            price: i.price,
            qty: i.qty,
            image: i.image,
          })),
          shippingAddress: form,
        }),
      });

      const order = await orderRes.json();

      if (orderRes.status === 401) {
        router.push("/account/login?next=/checkout");
        return;
      }

      if (!orderRes.ok) {
        throw new Error(
          order.error || "Could not place order"
        );
      }

      const payRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order._id,
        }),
      });

      const payData = await payRes.json();

      if (!payRes.ok) {
        throw new Error(
          payData.error || "Could not start payment"
        );
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error(
          "Could not load Razorpay checkout. Please check your connection."
        );
      }

      const rzp = new window.Razorpay({
        key: payData.keyId,
        amount: payData.amount,
        currency: payData.currency,
        name: "Artics Decorr",
        description: `Order ${payData.orderNumber}`,
        order_id: payData.razorpayOrderId,
        prefill: {
          name: payData.name,
          email: payData.email,
          contact: payData.phone,
        },
        theme: { color: "#770800" },
        handler: async function (response) {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderNumber: payData.orderNumber,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
              throw new Error(
                verifyData.error || "Payment verification failed"
              );
            }

            clear();
            router.push(`/checkout/success?order=${payData.orderNumber}`);
          } catch (err) {
            setError(err.message);
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setSubmitting(false);
            setError("Payment was cancelled. You can try again.");
          },
        },
      });

      rzp.on("payment.failed", function (resp) {
        setError(
          resp.error?.description || "Payment failed. Please try again."
        );
        setSubmitting(false);
      });

      rzp.open();
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  /* Empty cart */
  if (items.length === 0) {
    return (
      <main className=" bg-[#f5f3ee] text-[#132c47]">
        
          <Breadcrumbs
            image="/products/p16.png"
            title="Checkout"
            items={[{ label: "Checkout" }]}
          />

        <section className="flex min-h-[70vh] items-center justify-center px-5 py-20">
          <div className="w-full max-w-xl text-center">

            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#132c47]/10 bg-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-8 w-8 text-[#770800]"
              >
                <path
                  d="M6 8h12l1 13H5L6 8Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />

                <path
                  d="M9 8a3 3 0 0 1 6 0"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#770800]">
              Checkout
            </p>

            <h1 className="font-serif text-4xl leading-tight text-[#132c47] sm:text-5xl">
              Your cart is
              <br />
              <span className="italic text-[#770800]">
                empty.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#132c47]/55">
              There are no items ready for checkout. Explore our
              collection and find something perfect for your space.
            </p>

            <Link
              href="/shop"
              className="mt-9 inline-flex items-center gap-4 rounded-full bg-[#132c47] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f5f3ee] transition-all duration-300 hover:bg-[#770800]"
            >
              Explore Collection
              <span className="text-base">→</span>
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee] pb-24 text-[#132c47]">

      {/* Breadcrumb */}
      <div>
        <Breadcrumbs
          image="/products/p16.png"
          title="Checkout"
          items={[{ label: "Checkout" }]}
        />
      </div>

      {/* Header */}
      <section className="mx-auto w-full max-w-[1400px] px-5 pb-14 pt-16 sm:px-8 sm:pb-16 sm:pt-20 lg:px-12">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">

          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#770800]">
              Complete Your Order
            </p>

            <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.02em] text-[#132c47] sm:text-6xl lg:text-7xl">
              Secure&nbsp;
              <span className="italic text-[#770800]">
              Checkout.
              </span>
            </h1>
          </div>

          <div className="max-w-xs border-l border-[#132c47]/15 pl-5 lg:mb-1">
            <p className="text-sm leading-6 text-[#132c47]/55">
              Complete your details below and continue to a
              secure payment.
            </p>

            <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#132c47]/35">
              Secure Payment · Free Shipping
            </p>
          </div>

        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="h-px bg-[#132c47]/10" />
      </div>

      {/* Checkout Content */}
      <section className="mx-auto w-full max-w-[1400px] px-5 pt-12 sm:px-8 sm:pt-14 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-20">

          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit}
            className="min-w-0"
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-8 bg-[#770800]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#132c47]/45">
                Shipping Information
              </span>
            </div>

            <div className="border-y border-[#132c47]/10 py-8">

              {/* Contact */}
              <div className="mb-10">
                <div className="mb-6">
                  <h2 className="font-serif text-2xl text-[#132c47]">
                    Your Details
                  </h2>

                  <p className="mt-2 text-xs text-[#132c47]/40">
                    Please provide the details required for delivery.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Full Name"
                    value={form.fullName}
                    onChange={(v) =>
                      setForm({
                        ...form,
                        fullName: v,
                      })
                    }
                    required
                  />

                  <Field
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={(v) =>
                      setForm({
                        ...form,
                        email: v,
                      })
                    }
                    required
                  />

                  <Field
                    label="Phone Number"
                    value={form.phone}
                    onChange={(v) =>
                      setForm({
                        ...form,
                        phone: v,
                      })
                    }
                  />

                  <Field
                    label="Country"
                    value={form.country}
                    onChange={(v) =>
                      setForm({
                        ...form,
                        country: v,
                      })
                    }
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <div className="mb-6">
                  <h2 className="font-serif text-2xl text-[#132c47]">
                    Delivery Address
                  </h2>

                  <p className="mt-2 text-xs text-[#132c47]/40">
                    Where should we deliver your order?
                  </p>
                </div>

                <div className="space-y-5">

                  <Field
                    label="Street Address"
                    value={form.address}
                    onChange={(v) =>
                      setForm({
                        ...form,
                        address: v,
                      })
                    }
                    required
                  />

                  <div className="grid gap-5 sm:grid-cols-3">
                    <Field
                      label="City"
                      value={form.city}
                      onChange={(v) =>
                        setForm({
                          ...form,
                          city: v,
                        })
                      }
                      required
                    />

                    <Field
                      label="Province"
                      value={form.province}
                      onChange={(v) =>
                        setForm({
                          ...form,
                          province: v,
                        })
                      }
                      required
                    />

                    <Field
                      label="Postal Code"
                      value={form.postalCode}
                      onChange={(v) =>
                        setForm({
                          ...form,
                          postalCode: v,
                        })
                      }
                      required
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 flex items-start gap-3 border border-[#770800]/15 bg-[#770800]/[0.04] px-4 py-4">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#770800] text-[10px] text-white">
                  !
                </span>

                <p className="text-xs leading-5 text-[#770800]">
                  {error}
                </p>
              </div>
            )}

            {/* Payment */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={submitting}
                className="group flex h-14 w-full items-center justify-center gap-5 bg-[#770800] px-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#f5f3ee] transition-all duration-300 hover:bg-[#132c47] hover:shadow-[0_15px_35px_rgba(119,8,0,.18)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>
                  {submitting
                    ? "Opening Razorpay..."
                    : "Pay with Razorpay"}
                </span>

                {!submitting && (
                  <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>

              <p className="mt-4 text-center text-[9px] uppercase tracking-[0.2em] text-[#132c47]/30">
                Secure payment powered by Razorpay
              </p>
            </div>
          </form>

          {/* ================= ORDER SUMMARY ================= */}
          <aside className="lg:sticky lg:top-28 lg:self-start">

            <div className="relative overflow-hidden bg-[#132c47] p-7 text-[#f5f3ee] sm:p-8">

              {/* Decorative circle */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-60 w-60 rounded-full border border-white/[0.06]" />

              <div className="relative">

                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#c8ad76]">
                  Your Selection
                </p>

                <h2 className="font-serif text-3xl leading-tight">
                  Order
                  <br />
                  <span className="italic text-[#c8ad76]">
                    Summary.
                  </span>
                </h2>

                <div className="my-7 h-px bg-white/10" />

                {/* Items */}
                <div className="mb-6 max-h-[300px] space-y-4 overflow-y-auto pr-2">

                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex gap-4"
                    >
                      {/* Image */}
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-white/[0.08]">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>

                      {/* Details */}
                      <div className="min-w-0 flex-1">
                        <p className="font-serif text-sm leading-5 text-white/90">
                          {item.name}
                        </p>

                        <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/30">
                          Qty × {item.qty}
                        </p>
                      </div>

                      <div className="shrink-0 text-right text-xs text-white/70">
                        {formatINR(item.price * item.qty)}
                      </div>
                    </div>
                  ))}

                </div>

                <div className="h-px bg-white/10" />

                {/* Subtotal */}
                <div className="flex justify-between py-4">
                  <span className="text-xs text-white/45">
                    Subtotal
                  </span>

                  <span className="text-sm">
                    {formatINR(subtotal)}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span className="text-xs text-white/45">
                    Shipping
                  </span>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#c8ad76]">
                    Free
                  </span>
                </div>

                {/* Total */}
                <div className="mt-5 flex items-end justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                    Total
                  </span>

                  <span className="font-serif text-2xl text-[#f5f3ee]">
                    {formatINR(total)}
                  </span>
                </div>

                {/* Trust */}
                <div className="mt-7 border-t border-white/10 pt-5">
                  <div className="flex items-center gap-3">
                    <span className="text-[#c8ad76]">✦</span>

                    <p className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                      Free shipping on every order
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </aside>
        </div>
      </section>
    </main>
  );
}


/* =========================================================
   FIELD COMPONENT
========================================================= */

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}) {
  return (
    <div>
      <label className="mb-2.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#132c47]/50">
        {label}
        {required && (
          <span className="ml-1 text-[#770800]">*</span>
        )}
      </label>

      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-13 w-full rounded-none border border-[#132c47]/12 bg-white px-4 py-3 text-sm text-[#132c47] outline-none transition placeholder:text-[#132c47]/20 hover:border-[#132c47]/25 focus:border-[#770800]/50 focus:ring-1 focus:ring-[#770800]/10"
      />
    </div>
  );
}