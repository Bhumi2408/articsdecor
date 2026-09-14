// app/account/orders/[id]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { getCurrentUser } from "@/lib/auth";
import Breadcrumbs from "@/components/Breadcrumbs";
import { formatINR } from "@/lib/format";

const ArrowIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

const PinIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

const ReceiptIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <path d="M6 3.5h12v17l-3-1.8-3 1.8-3-1.8-3 1.8z" />
    <path d="M9 8h6M9 11.5h6M9 15h3.5" />
  </svg>
);

const CheckIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <path d="m5 12 4 4L19 6" />
  </svg>
);

function statusStyle(status = "") {
  const s = status.toLowerCase();

  if (["delivered", "completed"].includes(s)) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (["shipped", "dispatched"].includes(s)) {
    return "border-[#132c47]/20 bg-[#132c47]/[0.07] text-[#132c47]";
  }

  if (["processing", "confirmed", "paid"].includes(s)) {
    return "border-[#770800]/20 bg-[#770800]/[0.06] text-[#770800]";
  }

  if (
    ["cancelled", "canceled", "failed", "refunded", "unpaid"].includes(s)
  ) {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

function Badge({ label, value }) {
  return (
    <div className="group rounded-2xl border border-[#132c47]/10 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#770800]/25 hover:shadow-[0_15px_35px_-25px_rgba(19,44,71,0.45)]">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#7b7b7b]">
        {label}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.07em] ${statusStyle(
            value
          )}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#770800] opacity-70" />
          {value || "—"}
        </span>
      </div>
    </div>
  );
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function OrderDetailPage({ params }) {
  const { id } = await params;

  const session = await getCurrentUser();

  await connectDB();

  const order = await Order.findById(id).lean();

  if (!order || order.user?.toString() !== session.sub) {
    notFound();
  }

  const addr = order.shippingAddress || {};

  const placedOn = order.createdAt ? formatDate(order.createdAt) : null;

  return (
    <div className="min-h-screen bg-[#f5f3ee] pb-24">
      {/* =====================================================
          BREADCRUMBS
      ====================================================== */}
      <div className="bg-white border-b border-[#132c47]/[0.07]">
        <Breadcrumbs
          items={[
            { label: "My Account", href: "/account" },
            { label: "Orders", href: "/account/orders" },
            { label: order.orderNumber },
          ]}
        />
      </div>

      <div className="mx-auto mt-8 max-w-6xl">
        {/* =====================================================
            TOP HEADER
        ====================================================== */}
        <div className="mb-8">
          <Link
            href="/account/orders"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-[13px]
              font-semibold
              uppercase
              tracking-[0.1em]
              text-[#132c47]/70
              transition-colors
              duration-300
              hover:text-[#770800]
            "
          >
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            All Orders
          </Link>

          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#132c47] text-white shadow-sm">
                  <ReceiptIcon className="h-5 w-5" />
                </span>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#770800]">
                    Order Details
                  </p>

                  <h1 className="mt-1 text-[27px] font-semibold leading-tight tracking-[-0.02em] text-[#132c47] sm:text-[34px]">
                    {order.orderNumber}
                  </h1>
                </div>
              </div>

              {placedOn && (
                <p className="mt-4 text-[14px] text-[#6c6c6c]">
                  Placed on{" "}
                  <span className="font-medium text-[#132c47]">
                    {placedOn}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* =====================================================
            STATUS CARDS
        ====================================================== */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Badge label="Order Status" value={order.orderStatus} />
          <Badge label="Payment Status" value={order.paymentStatus} />
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <div className="mt-7 grid gap-7 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-start">
          {/* ===================================================
              LEFT
          ==================================================== */}
          <div className="space-y-7">
            {/* ITEMS */}
            <div className="overflow-hidden rounded-2xl border border-[#132c47]/10 bg-white shadow-[0_15px_45px_-35px_rgba(19,44,71,0.45)]">
              <div className="flex items-center justify-between border-b border-[#132c47]/[0.07] bg-[#f5f3ee] px-5 py-4 sm:px-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#770800]">
                    Your Purchase
                  </p>

                  <h2 className="mt-1 text-[15px] font-semibold text-[#132c47]">
                    Order Items
                  </h2>
                </div>

                <span className="rounded-full bg-[#132c47] px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-white">
                  {order.items?.length || 0} Items
                </span>
              </div>

              <ul className="divide-y divide-[#132c47]/[0.07]">
                {order.items?.map((item, i) => (
                  <li
                    key={i}
                    className="
                      group
                      flex
                      items-center
                      gap-4
                      px-5
                      py-5
                      transition-colors
                      duration-300
                      hover:bg-[#f5f3ee]/60
                      sm:px-6
                    "
                  >
                    {/* IMAGE */}
                    {item.image ? (
                      <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl border border-[#132c47]/10 bg-[#f5f3ee] sm:h-[82px] sm:w-[82px]">
                        <img
                          src={item.image}
                          alt={item.name || ""}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-xl bg-[#f5f3ee] text-[#132c47]/30 sm:h-[82px] sm:w-[82px]">
                        <ReceiptIcon className="h-6 w-6" />
                      </div>
                    )}

                    {/* INFO */}
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-semibold leading-snug text-[#132c47] sm:text-[16px]">
                        {item.name}
                      </p>

                      <p className="mt-1.5 text-[13px] text-[#777]">
                        {item.qty} × {formatINR(item.price)}
                      </p>
                    </div>

                    {/* PRICE */}
                    <p className="shrink-0 text-[14px] font-bold text-[#132c47] sm:text-[16px]">
                      {formatINR(item.price * item.qty)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* SHIPPING ADDRESS */}
            <div className="rounded-2xl border border-[#132c47]/10 bg-white p-5 shadow-[0_15px_45px_-35px_rgba(19,44,71,0.4)] sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#770800]/[0.08] text-[#770800]">
                  <PinIcon className="h-[19px] w-[19px]" />
                </span>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#770800]">
                    Delivery
                  </p>

                  <h2 className="mt-0.5 text-[15px] font-semibold text-[#132c47]">
                    Shipping Address
                  </h2>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-[#f5f3ee] p-4 sm:p-5">
                <div className="space-y-1.5 text-[14px] leading-[1.65] text-[#626262]">
                  <p className="font-semibold text-[#132c47]">
                    {addr.fullName}
                  </p>

                  {addr.address && <p>{addr.address}</p>}

                  <p>
                    {[addr.city, addr.province, addr.postalCode]
                      .filter(Boolean)
                      .join(", ")}
                  </p>

                  {addr.country && <p>{addr.country}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              SUMMARY
          ==================================================== */}
          <aside className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl bg-[#132c47] shadow-[0_20px_50px_-25px_rgba(19,44,71,0.6)]">
              {/* SUMMARY HEADER */}
              <div className="relative overflow-hidden px-6 pb-6 pt-7">
                <div className="absolute -right-16 -top-20 h-44 w-44 rounded-full border border-white/10" />
                <div className="absolute -right-6 -top-10 h-28 w-28 rounded-full border border-[#770800]/30" />

                <p className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
                  Order Summary
                </p>

                <h2 className="relative mt-2 text-[23px] font-semibold text-white">
                  Payment Details
                </h2>
              </div>

              {/* SUMMARY BODY */}
              <div className="border-t border-white/10 px-6 py-6">
                <dl className="space-y-4 text-[14px]">
                  <div className="flex items-center justify-between">
                    <dt className="text-white/60">Subtotal</dt>
                    <dd className="font-medium text-white">
                      {formatINR(order.subtotal)}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between">
                    <dt className="text-white/60">Shipping</dt>

                    <dd
                      className={
                        order.shippingFee
                          ? "font-medium text-white"
                          : "font-semibold text-emerald-300"
                      }
                    >
                      {order.shippingFee
                        ? formatINR(order.shippingFee)
                        : "Free"}
                    </dd>
                  </div>
                </dl>

                {/* TOTAL */}
                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
                        Total Amount
                      </p>

                      <p className="mt-1 text-[13px] text-white/60">
                        Inclusive of applicable charges
                      </p>
                    </div>

                    <span className="text-[25px] font-semibold tracking-tight text-white">
                      {formatINR(order.total)}
                    </span>
                  </div>
                </div>

                {/* CONTINUE SHOPPING */}
                <Link
                  href="/shop"
                  className="
                    group
                    relative
                    mt-6
                    flex
                    h-[52px]
                    items-center
                    justify-center
                    gap-2
                    overflow-hidden
                    rounded-xl
                    bg-white
                    px-5
                    text-[13px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-[#132c47]
                    transition-all
                    duration-300
                    hover:bg-[#770800]
                    hover:text-white
                  "
                >
                  <span>Continue Shopping</span>

                  <ArrowIcon className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
                </Link>
              </div>
            </div>

            {/* SMALL TRUST BOX */}
            <div className="mt-4 rounded-2xl border border-[#132c47]/10 bg-white p-5">
              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#132c47]/[0.07] text-[#132c47]">
                  <CheckIcon className="h-4 w-4" />
                </span>

                <div>
                  <p className="text-[13px] font-semibold text-[#132c47]">
                    Thank you for shopping with us
                  </p>

                  <p className="mt-1 text-[12.5px] leading-relaxed text-[#777]">
                    Your order details and delivery information are available
                    above.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}