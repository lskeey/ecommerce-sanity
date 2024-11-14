import { imageUrl } from "@/sanity/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import Image from "next/image";
import { notFound } from "next/navigation";


const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  console.log(product);

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1 md:px-4">
      <div className="relative aspect-square w-full h-full">
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
        </div>
        {isOutOfStock && (
          <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-black bg-opacity-30">
            <span className="text-white">Out of Stock</span>
          </div>
        )}
        <div className="space-y-2">
          <div className="text-md font-bold">{product.name}</div>
          <div className="text-2xl font-bold">${product.price}</div>
        </div>
    </div>
  )
}

export default ProductPage