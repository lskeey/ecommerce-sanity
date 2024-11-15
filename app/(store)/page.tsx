import ProductGrid from "@/components/products/product-grid";
import BlackFridayBanner from "@/components/sales/black-friday-banner";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div className="px-1 md:px-4">
      <BlackFridayBanner />
      <ProductGrid products={products} categories={categories} />
    </div>
  );
}
  