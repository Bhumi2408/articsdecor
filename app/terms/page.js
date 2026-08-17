import Breadcrumbs from "@/components/Breadcrumbs";

export default function TermsPage() {
  return (
    <div className="container-lute max-w-3xl pb-20">
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />
      <h1 className="font-serif text-3xl mb-8">Terms &amp; Conditions</h1>
      <div className="space-y-4 text-muted leading-relaxed text-sm">
        <p>
          By using this website and placing an order with Lute Diamonds (Pty) Ltd, you agree to
          the following terms. All prices are listed in South African Rand (ZAR) and include
          applicable taxes unless stated otherwise.
        </p>
        <p>
          Orders are only confirmed once payment has been successfully processed. We reserve
          the right to refuse or cancel any order at our discretion, including in cases of
          suspected fraud or pricing errors.
        </p>
        <p>
          All product images are representative; natural gemstones may vary slightly in
          appearance from the images shown. Certification details, where provided, accompany
          the relevant piece at delivery.
        </p>
        <p>
          These terms are governed by the laws of South Africa. For any queries relating to
          these terms, contact us at luteig@gmail.com.
        </p>
      </div>
    </div>
  );
}
