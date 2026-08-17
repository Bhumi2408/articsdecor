import Link from "next/link";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import Breadcrumbs from "@/components/Breadcrumbs";
import SortSelect from "@/components/SortSelect";
import { getWishlistIds } from "@/lib/wishlist";
import { toPlain } from "@/lib/serialize";

const SORT_MAP = {
  "price-asc": { price: 1 },
  "price-desc": { price: -1 },
  rating: { ratingAvg: -1 },
  latest: { createdAt: -1 },
  default: { createdAt: -1 },
};

export default async function ShopPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page || "1", 10));
  const limit = 15;
  const sort = sp.sort || "default";

  await connectDB();

  const query = {};
  if (sp.category) query.category = sp.category;
  if (sp.minPrice || sp.maxPrice) {
    query.price = {};
    if (sp.minPrice) query.price.$gte = Number(sp.minPrice);
    if (sp.maxPrice) query.price.$lte = Number(sp.maxPrice);
  }

  const [rawItems, total, categories] = await Promise.all([
    Product.find(query)
      .populate("category", "name slug")
      .sort(SORT_MAP[sort] || SORT_MAP.default)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Product.countDocuments(query),
    Category.find().sort({ name: 1 }).lean(),
  ]);
  const items = toPlain(rawItems);

  const wishlistIds = await getWishlistIds();
  const pages = Math.max(1, Math.ceil(total / limit));

  function buildHref(p) {
    const params = new URLSearchParams(sp);
    params.set("page", String(p));
    return `/shop?${params.toString()}`;
  }

  return (
    <div className="container-lute">
      <Breadcrumbs items={[{ label: "Shop" }]} />
      <h1 className="font-serif text-3xl mb-8">Shop</h1>

      <div className="grid md:grid-cols-[240px_1fr] gap-10 pb-16">
        <aside className="space-y-8">
          <div>
            <h3 className="text-sm uppercase tracking-wide mb-3">Category</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className={!sp.category ? "text-gold" : "hover:text-gold"}>
                  All
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c._id}>
                  <Link
                    href={`/shop?category=${c._id}`}
                    className={sp.category === c._id.toString() ? "text-gold" : "hover:text-gold"}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <form method="GET" action="/shop">
            <h3 className="text-sm uppercase tracking-wide mb-3">Price (R)</h3>
            <div className="flex gap-2">
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                defaultValue={sp.minPrice}
                className="w-1/2 border border-border rounded px-2 py-1 text-sm"
              />
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                defaultValue={sp.maxPrice}
                className="w-1/2 border border-border rounded px-2 py-1 text-sm"
              />
            </div>
            {sp.category && <input type="hidden" name="category" value={sp.category} />}
            <button className="btn-outline-gold text-xs px-4 py-2 rounded mt-3">Apply</button>
          </form>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted">{total} products</p>
            <SortSelect />
          </div>

          {items.length === 0 ? (
            <p className="text-muted">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((p) => (
                <ProductCard key={p._id} product={p} initialWishlisted={wishlistIds.includes(p._id.toString())} />
              ))}
            </div>
          )}

          <Pagination page={page} pages={pages} buildHref={buildHref} />
        </div>
      </div>
    </div>
  );
}
