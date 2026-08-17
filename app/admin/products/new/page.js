import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  await connectDB();
  const categories = await Category.find().sort({ name: 1 }).lean();

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Add Product</h1>
      <ProductForm categories={JSON.parse(JSON.stringify(categories))} />
    </div>
  );
}
