import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  await connectDB();
  const [product, categories] = await Promise.all([
    Product.findById(id).lean(),
    Category.find().sort({ name: 1 }).lean(),
  ]);
  if (!product) notFound();

  return (
    <div>
      <ProductForm
        categories={JSON.parse(JSON.stringify(categories))}
        initialProduct={JSON.parse(JSON.stringify(product))}
      />
    </div>
  );
}
