import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryGrid from "@/components/CategoryGrid";

export const metadata = {
  title: "Products - r",

};

export default function ProductPage() {
  return (
    <>
      <Breadcrumbs
        title="All Categories"
        image="/products/p16.png"
        items={[
          {
            label: "Products",
          },
        ]}
      />
      <CategoryGrid/>
    </>
  );
}
