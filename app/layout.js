import { Baloo_2 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { Toaster } from "sonner";

const baloo2 = Baloo_2({
  variable: "--font-baloo2",
  subsets: ["latin"],
});

export const metadata = {
  title: "Artics Decorr - Premium Outdoor Furniture Manufacturer in India",

  description:
    "Artics Decorr is a Premium Outdoor Furniture Manufacturer in India offering durable, stylish and weatherproof designs for outdoor spaces. Contact us now!",

  keywords: [
    "Premium Outdoor Furniture Manufacturer in India",
    "Artics Decorr",
  ],

  icons: {
    icon: "/logos.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${baloo2.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
  <Toaster
    position="top-right"
    duration={2500}
    closeButton
    toastOptions={{
      classNames: {
        toast:
          "!rounded-none !border !border-[#d8c4a0] !bg-[#102f4f] !text-white !shadow-[0_15px_40px_rgba(0,0,0,0.18)]",
        title: "!font-medium !text-[14px]",
        description: "!text-white/60 !text-[12px]",
        closeButton:
          "!border-white/20 !bg-transparent !text-white hover:!bg-white/10",
      },
    }}
  />

  <Header />

  <main className="flex-1 pb-16 xl:pb-0">
    {children}
  </main>

  <Footer />

  <BottomNav />
</body>
    </html>
  );
}