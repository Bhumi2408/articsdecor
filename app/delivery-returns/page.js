import Breadcrumbs from "@/components/Breadcrumbs";

export default function DeliveryReturnsPage() {
  return (
    <div className="container-lute max-w-3xl pb-20">
      <Breadcrumbs items={[{ label: "Delivery & Returns" }]} />
      <h1 className="font-serif text-3xl mb-8">Delivery &amp; Returns</h1>

      <div className="space-y-6 text-muted leading-relaxed">
        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Delivery</h2>
          <p>
            Handcrafted pieces are made to order and typically ship within 5-10 business days.
            Orders over R50,000 qualify for free shipping; all other orders incur a flat R500
            shipping fee. Tracking details are emailed once your order leaves our workshop.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Returns &amp; Exchanges</h2>
          <p>
            Unworn items in their original packaging and condition can be returned or exchanged
            within 14 days of delivery. Custom or resized pieces are final sale. To start a
            return, contact us with your order number.
          </p>
        </div>
      </div>
    </div>
  );
}
