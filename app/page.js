import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import ProductCard from "@/components/ProductCard";
import { getWishlistIds } from "@/lib/wishlist";
import { toPlain } from "@/lib/serialize";

export const revalidate = 0;

const TESTIMONIALS = [
  {
    name: "Nomvula K.",
    quote: "The craftsmanship on my engagement ring is beyond anything I imagined. Truly a piece to treasure forever.",
  },
  {
    name: "Johan P.",
    quote: "Excellent service from start to finish, and the certificate gave us total peace of mind.",
  },
  {
    name: "Aisha M.",
    quote: "Beautiful, ethically sourced stones and a team that genuinely cares about getting it right.",
  },
];

export default async function HomePage() {
  await connectDB();

  const [categories, featured, latest] = await Promise.all([
    Category.find({ parent: null }).limit(4).lean(),
    Product.find({ featured: true }).populate("category", "name slug").limit(8).lean(),
    Product.find().sort({ createdAt: -1 }).populate("category", "name slug").limit(8).lean(),
  ]);

  const wishlistIds = await getWishlistIds();
  const products = toPlain(featured.length ? featured : latest);

  return (
    <div>
      <section className="relative bg-gold-light">
        <div className="container-lute py-24 md:py-32 flex flex-col items-start gap-6 max-w-2xl">
          <span className="uppercase tracking-widest text-xs text-gold-dark">Handcrafted since 2006</span>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight">
            Better Things, <br /> in a Better Way
          </h1>
          <p className="text-muted text-base md:text-lg">
            Ethically sourced diamonds and precious stones, handcrafted in South Africa into
            wedding rings, pendants and earrings that last a lifetime.
          </p>
          <Link href="/shop" className="btn-gold px-8 py-3 rounded text-sm">
            Shop the Collection
          </Link>
        </div>
      </section>

      <section className="container-lute py-16">
        <h2 className="font-serif text-2xl text-center mb-10">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {(categories.length ? categories : PLACEHOLDER_CATEGORIES).map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/product-category/${cat.slug}`}
              className="group border border-border rounded-lg overflow-hidden bg-surface"
            >
              <div className="aspect-square bg-gold-light relative overflow-hidden">
                <Image
                  src={cat.image || `https://placehold.co/400x400/f3e9d2/a9812f.png?text=${encodeURIComponent(cat.name)}`}
                  alt={cat.name}
                  fill
                  sizes="25vw"
                  priority={i < 4}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 text-center font-medium text-sm">{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-surface border-y border-border py-16">
        <div className="container-lute">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-serif text-2xl">The Iconic Collection</h2>
            <Link href="/shop" className="text-sm text-gold hover:text-gold-dark">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} initialWishlisted={wishlistIds.includes(p._id.toString())} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-lute py-16">
        <h2 className="font-serif text-2xl text-center mb-10">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="border border-border rounded-lg p-6 text-center">
              <p className="text-gold mb-3">★★★★★</p>
              <p className="text-sm text-muted italic mb-4">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-sm font-medium">{t.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const PLACEHOLDER_CATEGORIES = [
  { slug: "wedding-rings", name: "Wedding Rings" },
  { slug: "pendants", name: "Pendants" },
  { slug: "earrings", name: "Earrings" },
  { slug: "jewellery", name: "Jewellery" },
];
