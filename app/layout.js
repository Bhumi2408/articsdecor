import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lute Diamonds | Premium Handcrafted Jewellery",
  description:
    "Handcrafted, ethically sourced diamond jewellery from Lute Diamonds — wedding rings, pendants and earrings, made in South Africa since 2006.",
    icons:{
      icon:"/favicon.png"
    }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${interTight.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
