import { Product } from "@/sanity.types"
import { PortableText } from "next-sanity"

const ProductInfo = ({ product }: { product: Product }) => {
  return (
    <div>
      <div className="text-md font-medium mb-2">{product.name}</div>
      <div className="text-2xl font-semibold mb-3">${product.price}</div>
      <hr className="border-gray-300 mb-3" />
      <div className="prose max-w-none text-sm mb-6">
        {Array.isArray(product.description) && (<PortableText value={product.description} />)}
      </div>
    </div>
  )
}

export default ProductInfo