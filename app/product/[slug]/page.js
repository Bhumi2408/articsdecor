import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Review from "@/models/Review";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import AddToCartBox from "@/components/AddToCartBox";
import SpecsTable from "@/components/SpecsTable";
import StarRating from "@/components/StarRating";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReviewSection from "@/components/ReviewSection";
import { formatZAR } from "@/lib/format";
import { getWishlistIds } from "@/lib/wishlist";
import { toPlain } from "@/lib/serialize";

function stripHtml(html) {
  return (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectDB();
  const product = await Product.findOne({ slug }).lean();
  if (!product) return {};

  const title = product.metaTitle || `${product.name} | Lute Diamonds`;
  const description = product.metaDescription || stripHtml(product.description).slice(0, 160);

  return {
    title,
    description,
    keywords: product.keywords?.length ? product.keywords : undefined,
    openGraph: {
      title,
      description,
      images: product.images?.length ? [product.images[0]] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.images?.length ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  await connectDB();

  const rawProduct = await Product.findOne({ slug }).populate("category", "name slug").lean();
  if (!rawProduct) notFound();

  const [rawRelated, rawReviews, wishlistIds] = await Promise.all([
    Product.find({ category: rawProduct.category?._id, _id: { $ne: rawProduct._id } })
      .limit(4)
      .lean(),
    Review.find({ product: rawProduct._id }).sort({ createdAt: -1 }).lean(),
    getWishlistIds(),
  ]);

  const product = toPlain(rawProduct);
  const related = toPlain(rawRelated);
  const reviews = toPlain(rawReviews);

  return (
    <div className="container-lute pb-20">
      <Breadcrumbs
        items={[
          ...(product.category ? [{ label: product.category.name, href: `/product-category/${product.category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <div className="grid md:grid-cols-2 gap-12">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <h1 className="font-serif text-3xl mb-2">{product.name}</h1>
          <StarRating value={product.ratingAvg} count={product.ratingCount} />
          <p className="font-serif text-2xl mt-4 mb-1">{formatZAR(product.price)}</p>
          {product.compareAtPrice > product.price && (
            <p className="text-muted line-through text-sm mb-4">{formatZAR(product.compareAtPrice)}</p>
          )}
          <p className={`text-sm mb-6 ${product.stock > 0 ? "text-green-700" : "text-red-600"}`}>
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </p>

          {product.description && (
            <div className="rich-content text-muted mb-6" dangerouslySetInnerHTML={{ __html: product.description }} />
          )}

          <AddToCartBox product={product} initialWishlisted={wishlistIds.includes(product._id.toString())} />

          <div className="mt-8">
            <h3 className="text-sm uppercase tracking-wide mb-2">Specifications</h3>
            <SpecsTable specs={product.specs} />
          </div>

          <div className="mt-8 border border-border rounded-lg p-4 text-sm text-muted space-y-1">
            <p>Free shipping &amp; exchanges</p>
            <p>Flexible payment options via PayFast</p>
            <p>Secure checkout, trusted by thousands of happy customers</p>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-serif text-2xl mb-8">Reviews</h2>
        <ReviewSection productId={product._id.toString()} reviews={reviews} />
      </section>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-2xl mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} initialWishlisted={wishlistIds.includes(p._id.toString())} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
