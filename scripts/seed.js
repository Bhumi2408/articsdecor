import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import BlogPost from "../models/BlogPost.js";
import Admin from "../models/Admin.js";

function img(text) {
  return `https://placehold.co/800x800/f3e9d2/a9812f.png?text=${encodeURIComponent(text)}`;
}

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI environment variable");

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  await Promise.all([
    Category.deleteMany({}),
    Product.deleteMany({}),
    BlogPost.deleteMany({}),
    Admin.deleteMany({}),
  ]);
  console.log("Cleared categories, products, blog posts and admins");



 





  const adminEmail = process.env.ADMIN_SEED_EMAIL || "admin@lutediamonds.com";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || "Admin@12345";
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await Admin.create({ name: "Artics Decorr Admin", email: adminEmail, passwordHash });
  console.log(`Seeded admin user: ${adminEmail} / ${adminPassword}`);

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
