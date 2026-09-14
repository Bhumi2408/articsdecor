import mongoose from "mongoose";

/* One row of the specification table.
   Previously these were seven hard-coded jewellery fields. Furniture products
   each need different rows, so the admin now defines label/value pairs. */
const SpecRowSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, required: true },
    value: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number, default: null },
    images: [{ type: String }],
    imageAlt: { type: String, default: "", trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    description: { type: String, default: "" },
    specs: { type: [SpecRowSchema], default: [] },
    stock: { type: Number, default: 10 },
    collectionTag: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    hiddenFromStore: {
      type: Boolean,
      default: false,
    },
    ratingAvg: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    keywords: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
