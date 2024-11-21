import { Product } from "@/sanity.types";
import { imageUrl } from "@/sanity/lib/imageUrl";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <Link href={`/product/${product.slug?.current}`} className="h-full">
      <div className="relative flex flex-col overflow-hidden rounded-md shadow-md border h-full">
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
        <div className="space-y-1 px-2 pt-2 pb-4 h-full">
          <div className="text-sm line-clamp-2">{product.name}</div>
          <div className="text-md font-bold">${product.price}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
