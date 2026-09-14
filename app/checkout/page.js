import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import Breadcrumbs from "@/components/Breadcrumbs";
import CheckoutPage from "@/components/CheckoutPage";


export const metadata = {
  title: "Checkout - Artics Decorr",

};

export default async function Page() {
  const session = await getCurrentUser();

  if (!session) {
    return (
      <main className="min-h-[75vh] bg-[#f5f3ee] text-[#132c47]">
        <Breadcrumbs
          image="/products/p16.png"
          title="Checkout"
          items={[{ label: "Checkout" }]}
        />

        <section className="flex min-h-[65vh] items-center justify-center px-5 py-20">
          <div className="w-full max-w-xl text-center">

            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#132c47]/10 bg-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-8 w-8 text-[#770800]"
              >
                <path
                  d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d="M4.5 20.5c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#770800]">
              Sign In Required
            </p>

            <h1 className="font-serif text-4xl leading-tight text-[#132c47] sm:text-5xl">
              Please sign in to
              <br />
              <span className="italic text-[#770800]">
                place your order.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#132c47]/60">
              You need to be signed in to checkout, so we can keep your
              order details and delivery updates linked to your account.
            </p>

            <Link
              href="/account/login?next=/checkout"
              className="mt-9 inline-flex items-center gap-4 rounded-full bg-[#132c47] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f5f3ee] transition-all duration-300 hover:bg-[#770800] hover:shadow-lg"
            >
              Sign In
              <span className="text-base">→</span>
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return <CheckoutPage />;
}
