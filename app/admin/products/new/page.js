import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  await connectDB();
  const categories = await Category.find().sort({ name: 1 }).lean();

  return (
    <div>
      <ProductForm categories={JSON.parse(JSON.stringify(categories))} />
    </div>
  );
}
