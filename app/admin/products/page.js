import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { formatZAR } from "@/lib/format";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage({ searchParams }) {
  const sp = await searchParams;
  await connectDB();
  const query = sp.search ? { name: { $regex: sp.search, $options: "i" } } : {};
  const products = await Product.find(query).populate("category", "name").sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl">Products</h1>
        <Link href="/admin/products/new" className="btn-gold px-4 py-2 rounded text-sm">
          Add Product
        </Link>
      </div>

      <form method="GET" className="mb-6">
        <input
          type="text"
          name="search"
          placeholder="Search products..."
          defaultValue={sp.search}
          className="border border-border rounded px-3 py-2 text-sm w-64"
        />
      </form>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-muted">
            <th className="py-3">Product</th>
            <th className="py-3">Category</th>
            <th className="py-3">Price</th>
            <th className="py-3">Stock</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-b border-border">
              <td className="py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 relative bg-gold-light rounded overflow-hidden shrink-0">
                    {p.images?.[0] && (
                      <Image src={p.images[0]} alt={p.name} fill sizes="40px" className="object-cover" />
                    )}
                  </div>
                  {p.name}
                </div>
              </td>
              <td className="py-3">{p.category?.name || "—"}</td>
              <td className="py-3">{formatZAR(p.price)}</td>
              <td className="py-3">{p.stock}</td>
              <td className="py-3">
                <div className="flex gap-3">
                  <Link href={`/admin/products/${p._id}/edit`} className="text-gold hover:text-gold-dark">
                    Edit
                  </Link>
                  <DeleteProductButton id={p._id.toString()} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && <p className="text-muted mt-6">No products found.</p>}
    </div>
  );
}
