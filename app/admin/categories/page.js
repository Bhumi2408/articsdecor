import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import CategoryForm from "@/components/admin/CategoryForm";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";

export default async function AdminCategoriesPage() {
  await connectDB();
  const categories = await Category.find().sort({ name: 1 }).lean();

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Categories</h1>

      <div className="grid md:grid-cols-[1fr_320px] gap-10">
        <table className="w-full text-sm h-fit">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th className="py-3">Image</th>
              <th className="py-3">Name</th>
              <th className="py-3">Slug</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c._id} className="border-b border-border">
                <td className="py-3">
                  <div className="w-10 h-10 relative bg-gold-light rounded overflow-hidden shrink-0">
                    {c.image && <Image src={c.image} alt={c.name} fill sizes="40px" className="object-cover" />}
                  </div>
                </td>
                <td className="py-3">{c.name}</td>
                <td className="py-3">{c.slug}</td>
                <td className="py-3">
                  <div className="flex gap-3">
                    <Link href={`/admin/categories/${c._id}/edit`} className="text-gold hover:text-gold-dark">
                      Edit
                    </Link>
                    <DeleteCategoryButton id={c._id.toString()} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <CategoryForm />
      </div>
      {categories.length === 0 && <p className="text-muted mt-6">No categories found.</p>}
    </div>
  );
}
