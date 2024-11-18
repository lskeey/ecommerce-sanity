import ProductGrid from "@/components/products/product-grid";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { searchProductByName } from "@/sanity/lib/products/searchProductsByName";

export default async function SearchPage({
  searchParams
}: {
  searchParams: {
    query: string;
  }
}) {
  const { query } = await searchParams;

  const products = await searchProductByName(query);
  const categories = await getAllCategories();

  if (!products.length) {
    return (
      <div className="text-center py-6 space-y-3 border shadow-md rounded-md">
        <h1 className="text-xl font-bold">No products found for: {query}</h1>
        <p className="text-sm text-gray-500">Try searching with different keywords</p>
      </div>
    )
  }

  return (
    <div className="flex gap-4">
      <div className="w-1/4 border shadow-md rounded-md p-4">Filter</div>
      <div className="flex-1 border shadow-md rounded-md p-4">
        <h1>Search results for {query}</h1>
        <ProductGrid products={products} categories={categories}/>
      </div>
    </div>
  )
}