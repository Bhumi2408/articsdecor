import Breadcrumbs from "@/components/Breadcrumbs";
import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Contact Us - Artics Decorr",

};

export default function ContactPage() {
  return (
    <main className="bg-white">
      <Breadcrumbs image="/products/p16.png" title="Contact Us" items={[{ label: "Contact Us" }]} />
   
      <ContactSection />

    </main>
  );
}