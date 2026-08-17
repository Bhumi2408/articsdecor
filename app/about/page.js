import Breadcrumbs from "@/components/Breadcrumbs";

export default function AboutPage() {
  return (
    <div className="container-lute max-w-3xl pb-20">
      <Breadcrumbs items={[{ label: "About Us" }]} />
      <h1 className="font-serif text-3xl mb-6">About Lute Diamonds</h1>
      <div className="space-y-4 text-muted leading-relaxed">
        <p>
          Founded in 2006 in Kimberley, South Africa &mdash; the historic heart of the country&rsquo;s
          diamond industry &mdash; Lute Diamonds has spent almost two decades handcrafting premium
          quality jewellery that customers can trust.
        </p>
        <p>
          Every piece we create combines ethically sourced diamonds and precious stones with
          meticulous craftsmanship, from wedding rings and pendants to earrings designed to be
          treasured for a lifetime.
        </p>
        <p>
          We believe in better things, made in a better way: transparent certification, honest
          pricing, and a smooth shopping experience from browsing to doorstep delivery.
        </p>
      </div>
    </div>
  );
}
