import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import ProductForm from "@/components/admin/ProductForm";

// No cookies()/searchParams usage here, so Next.js would otherwise
// statically render this page once at build time — freezing the category
// dropdown so a newly added category wouldn't appear until a rebuild.
export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  await connectDB();
  const categories = await Category.find().sort({ name: 1 }).lean();

  return (
    <div>
      <ProductForm categories={JSON.parse(JSON.stringify(categories))} />
    </div>
  );
}
