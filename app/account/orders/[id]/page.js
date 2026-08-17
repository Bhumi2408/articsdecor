import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { getCurrentUser } from "@/lib/auth";
import Breadcrumbs from "@/components/Breadcrumbs";
import { formatZAR } from "@/lib/format";

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  const session = await getCurrentUser();
  await connectDB();
  const order = await Order.findById(id).lean();
  if (!order || order.user?.toString() !== session.sub) notFound();

  return (
    <div className="container-lute max-w-3xl pb-20">
      <Breadcrumbs
        items={[
          { label: "My Account", href: "/account" },
          { label: "Orders", href: "/account/orders" },
          { label: order.orderNumber },
        ]}
      />
      <h1 className="font-serif text-3xl mb-8">Order {order.orderNumber}</h1>

      <div className="grid sm:grid-cols-2 gap-6 mb-8 text-sm">
        <div className="border border-border rounded-lg p-4">
          <p className="text-muted">Order Status</p>
          <p className="font-medium capitalize">{order.orderStatus}</p>
        </div>
        <div className="border border-border rounded-lg p-4">
          <p className="text-muted">Payment Status</p>
          <p className="font-medium capitalize">{order.paymentStatus}</p>
        </div>
      </div>

      <table className="w-full text-sm mb-8">
        <thead>
          <tr className="border-b border-border text-left text-muted">
            <th className="py-2">Item</th>
            <th className="py-2">Qty</th>
            <th className="py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, i) => (
            <tr key={i} className="border-b border-border">
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.qty}</td>
              <td className="py-2">{formatZAR(item.price * item.qty)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ml-auto max-w-xs space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatZAR(order.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{order.shippingFee ? formatZAR(order.shippingFee) : "Free"}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>{formatZAR(order.total)}</span>
        </div>
      </div>

      <div className="mt-8 border-t border-border pt-6 text-sm text-muted">
        <p className="font-medium text-foreground mb-1">Shipping Address</p>
        <p>{order.shippingAddress.fullName}</p>
        <p>
          {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.province}{" "}
          {order.shippingAddress.postalCode}
        </p>
        <p>{order.shippingAddress.country}</p>
      </div>
    </div>
  );
}
