import ProductGrid from "@/components/products/product-grid";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";

const CategoryPage = async ({ params }: {params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const products = await getProductsByCategory(slug);
  const categories = await getAllCategories();
  
  return (
    <div className="px-1 md:px-4">
      <h1 className="text-xl text-center font-bold">{slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}{" "}Collection</h1>
      <ProductGrid products={products} categories={categories} />
    </div>
  )
}

export default CategoryPage