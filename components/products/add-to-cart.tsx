"use client";

import { Product } from "@/sanity.types"
import useCartStore from "@/store/store";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface AddToCartProps {
  product: Product;
  disabled?: boolean;
}

const AddToCart = ({ product, disabled}: AddToCartProps) => {
  const { addItem, removeItem, getItemCount, getTotalPrice } = useCartStore();
  const itemCount = getItemCount(product._id);
  const totalPrice = getTotalPrice();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div>
      <div className="lg:sticky top-4 p-4 border shadow-md rounded-md space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-1/2 flex items-center justify-between border rounded-md p-1">
            <button
              onClick={() => removeItem(product._id)}
              className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-100">
              <span className={`text-xl ${itemCount === 0 ? "text-gray-400" : "text-black"}`}>-</span>
            </button>
            <span>{itemCount}</span>
            <button
              onClick={() => addItem(product)}
              disabled={disabled || itemCount === product.stock}
              className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-100">
              <span className={`text-xl ${itemCount === product.stock ? "text-gray-400" : "text-black"}`}>+</span>
            </button>

          </div>
          <div className="w-full">
            Total Stock:
            <span
              className={`${
                product.stock !== undefined && product.stock < 30 ? "text-orange-600" : "text-black"
              } ml-2`}
            >
              {product.stock ?? "N/A"}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">SubTotal</span>
          <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="space-y-2">
          <Button className="w-full">Add to Cart</Button>
          <Button className="w-full" variant={"outline"}>Buy Now</Button>
        </div>
      </div>
    </div>
  )
}

export default AddToCart