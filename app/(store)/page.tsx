import ProductGrid from "@/components/products/product-grid";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  console.log(products)
  return (
    <ProductGrid products={products} />
  );
}
  