import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  console.log(products)
  return (
    <div>Hello World</div>
  );
}
  