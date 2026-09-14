import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { getWishlistIds } from "@/lib/wishlist";
import { toPlain } from "@/lib/serialize";
import HeroSlider from "@/components/HeroSlider";
import PromoBanner from "@/components/PromoBanner";
import MoreAboutUs from "@/components/MoreAboutUs";
import BestSellersSection from "@/components/BestSellersSection";
import TrendingWeek from "@/components/TendingWeek";
import LatestBlog from "@/components/LatestBlog";
import CategoryFlipSection from "@/components/CategoryFlipSection";
import LatestCollection from "@/components/LatestCollection";
import MaterialCollections from "@/components/MaterialCollections";
import ArticsGallery from "@/components/ArticsGallery";
import Clients from "@/components/Clients";

export const metadata = {
  title: "Outdoor Furniture Manufacturer in Haryana | Artics Decorr",

  description:
    "Artics r – Leading Outdoor Furniture Manufacturer in Haryana. Explore our stylish designs to elevate your outdoor space. Contact us now!",

  keywords: [
    "Outdoor Furniture Manufacturer in Haryana",
    "Artics Decorr",
  ],

};

export const revalidate = 0;


export default async function HomePage() {
  await connectDB();

  const [categories, featured, latest] = await Promise.all([
    Category.find({ parent: null }).limit(4).lean(),
    Product.find({ featured: true }).populate("category", "name slug").limit(8).lean(),
    Product.find().sort({ createdAt: -1 }).populate("category", "name slug").limit(8).lean(),
  ]);

  const wishlistIds = await getWishlistIds();
  const products = toPlain(featured.length ? featured : latest);

  return (
    <div>


      <HeroSlider />

      <CategoryFlipSection />
      <BestSellersSection products={products} />


      <MoreAboutUs />


      <LatestCollection/>

      <MaterialCollections/>


      <TrendingWeek products={products} />
      <ArticsGallery/>
      <Clients/>
      <PromoBanner/>
      <LatestBlog />
    </div>
  );
}

