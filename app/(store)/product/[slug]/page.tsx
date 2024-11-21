import AddToCart from "@/components/products/add-to-cart";
import ProductInfo from "@/components/products/product-info";
import { imageUrl } from "@/sanity/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import Image from "next/image";
import { notFound } from "next/navigation";


const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-1 md:px-4">
      <div className="relative lg:sticky top-4 aspect-square w-full border mx-auto">
        {product.image ? (
          <Image
            src={imageUrl(product.image).url()}
            alt={`Image of ${product.name}`}
            fill
            style={{
              objectFit: "contain"
            }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200">
            <span>No Image Available</span>
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-black bg-opacity-30">
            <span className="text-white">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="col-span-2">
        <ProductInfo product={product} />
      </div>
      <AddToCart product={product} disabled={isOutOfStock} />
    </div>
  )
}

export default ProductPage