import Breadcrumbs from "@/components/Breadcrumbs";

const FAQS = [
  {
    q: "Are your diamonds ethically sourced?",
    a: "Yes. Every stone we sell is ethically sourced and, where applicable, independently certified.",
  },
  {
    q: "Do you offer ring resizing?",
    a: "Most rings can be resized after purchase. Contact us with your order number to arrange resizing.",
  },
  {
    q: "How long does delivery take?",
    a: "Handcrafted pieces typically ship within 5-10 business days. See our Delivery & Returns page for details.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We process payments securely through PayFast, supporting card and EFT payments.",
  },
  {
    q: "Can I return or exchange a piece?",
    a: "Yes, unworn items in original condition can be returned within 14 days of delivery.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-lute max-w-3xl pb-20">
      <Breadcrumbs items={[{ label: "FAQ" }]} />
      <h1 className="font-serif text-3xl mb-8">Frequently Asked Questions</h1>
      <div className="divide-y divide-border">
        {FAQS.map((item) => (
          <div key={item.q} className="py-5">
            <h2 className="font-medium mb-2">{item.q}</h2>
            <p className="text-muted text-sm leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
