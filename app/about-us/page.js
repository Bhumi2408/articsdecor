
import AboutBanner from "@/components/AboutBanner";
import GalleryStrip from "@/components/ArticsGallery";
import StorySection from "@/components/StorySection";
import LatestCollection from "@/components/LatestCollection";
import MissionVision from "@/components/MissionVision";
import OurClients from "@/components/OurClients";

export const metadata = {
  title: "Best Garden Furniture Manufacturer in India - Artics Decorr",

  description:
    "Garden Furniture Manufacturer in India – Artics Decorr offers premium outdoor furniture with stylish designs, durable materials & custom solutions. Contact us now!",

  keywords: [
    "Garden Furniture Manufacturer in India",
  ],
};

export default function AboutPage() {
  return (
    <>
      <AboutBanner />
      <StorySection />
      <MissionVision/>
      <LatestCollection/>
      <OurClients/>
      <GalleryStrip />
    </>
  );
}
