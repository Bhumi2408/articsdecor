import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { formatZAR } from "@/lib/format";
import OrderStatusForm from "@/components/admin/OrderStatusForm";

export default async function AdminOrderDetailPage({ params }) {
  const { id } = await params;
  await connectDB();
  const order = await Order.findById(id).lean();
  if (!order) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Order {order.orderNumber}</h1>

      <div className="grid md:grid-cols-[1fr_320px] gap-10">
        <div>
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

          <div className="border-t border-border pt-6 text-sm text-muted">
            <p className="font-medium text-foreground mb-1">Shipping Address</p>
            <p>
              {order.shippingAddress.fullName} &middot; {order.shippingAddress.email} &middot;{" "}
              {order.shippingAddress.phone}
            </p>
            <p>
              {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.province}{" "}
              {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>

        <OrderStatusForm order={JSON.parse(JSON.stringify(order))} />
      </div>
    </div>
  );
}
