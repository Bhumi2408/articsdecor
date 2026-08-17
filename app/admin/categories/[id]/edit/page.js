import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import CategoryForm from "@/components/admin/CategoryForm";

export default async function EditCategoryPage({ params }) {
  const { id } = await params;
  await connectDB();
  const category = await Category.findById(id).lean();
  if (!category) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Edit Category</h1>
      <div className="max-w-md">
        <CategoryForm initialCategory={JSON.parse(JSON.stringify(category))} />
      </div>
    </div>
  );
}
