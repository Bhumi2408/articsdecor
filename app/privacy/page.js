import Breadcrumbs from "@/components/Breadcrumbs";

export default function PrivacyPage() {
  return (
    <div className="container-lute max-w-3xl pb-20">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <h1 className="font-serif text-3xl mb-8">Privacy Policy</h1>
      <div className="space-y-4 text-muted leading-relaxed text-sm">
        <p>
          We collect only the information required to process your order and manage your
          account: your name, email address, and shipping details. We never ask for or store
          a phone number or social login during registration &mdash; accounts are created with
          an email address and password only.
        </p>
        <p>
          Payment details are handled directly by our payment processor, PayFast, and are never
          stored on our servers. Your information is never sold to third parties.
        </p>
        <p>
          You may request a copy of your data or ask us to delete your account at any time by
          contacting luteig@gmail.com.
        </p>
      </div>
    </div>
  );
}
