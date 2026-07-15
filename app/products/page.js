import fs from "fs";
import path from "path";
import ProductsCatalog from "@/components/product/ProductsCatalog";

export const metadata = {
  title: "Shop Summer Products | SunCart Essentials",
  description: "Browse the ultimate collection of summer outfits, sunglasses, sunscreens, beach accessories and more. Fast shipping and high quality essentials.",
};

export default function ProductsPage() {
  // Read static product list server side
  const productsFilePath = path.join(process.cwd(), "data", "products.json");
  let initialProducts = [];
  try {
    initialProducts = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));
  } catch (e) {
    initialProducts = [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductsCatalog initialProducts={initialProducts} />
    </div>
  );
}
