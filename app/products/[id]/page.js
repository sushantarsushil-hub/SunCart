import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import ProductDetailsView from "@/components/product/ProductDetailsView";

import PrivateRoute from "@/components/auth/PrivateRoute";

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const productsFilePath = path.join(process.cwd(), "data", "products.json");
  let allProducts = [];
  try {
    allProducts = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));
  } catch (e) {
    allProducts = [];
  }

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <PrivateRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetailsView product={product} allProducts={allProducts} />
      </div>
    </PrivateRoute>
  );
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const productsFilePath = path.join(process.cwd(), "data", "products.json");
  let allProducts = [];
  try {
    allProducts = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));
  } catch (e) {
    allProducts = [];
  }

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found | SunCart",
      description: "The requested summer product could not be found."
    };
  }

  return {
    title: `${product.name} - ${product.brand} | SunCart`,
    description: product.description,
    openGraph: {
      title: `${product.name} | SunCart`,
      description: product.description,
      images: [{ url: product.image }]
    }
  };
}
