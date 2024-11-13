import ProductGrid from "@/components/products/product-grid";
import BlackFridayBanner from "@/components/sales/black-friday-banner";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  return (
    <>
      <BlackFridayBanner />
      <ProductGrid products={products} />
    </>
  );
}
  