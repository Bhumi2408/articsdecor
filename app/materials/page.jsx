import Breadcrumbs from "@/components/Breadcrumbs";
import MaterialsShowcase from "@/components/MaterialsShowcase";

export const metadata = {
  title: "Materials - Artics Decorr",

};

export default function MaterialsPage() {
  return (
    <>
      <Breadcrumbs
        title="Materials"
        image="/products/p16.png"
        items={[
          {
            label: "Materials",
          },
        ]}
      />
      <MaterialsShowcase/>
    </>
  );
}
