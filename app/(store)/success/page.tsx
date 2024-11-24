"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-12 rounded-md shadow-md max-w-2xl w-full mx-4">
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="w-16 h-16" />
        </div>
        <h1 className="text-xl font-bold mb-6 text-center">Thank You for Your Order!</h1>
        <div>
          <p className="text-sm text-gray-700 mb-4">Your order has been confirmed and will be shipped shortly.</p>
          <div className="text-sm text-gray-700 mb-4">
            {orderNumber && (
              <p className="flex justify-between">
                <span>Order Number:</span>
                <span className="font-bold text-black">{orderNumber}</span>
              </p>
            )}
          </div>
        </div>

        <hr className="mb-4 border-gray-300" /> 

        <div>
          <p className="text-sm text-gray-700 mb-4">A confirmation email has been sent your registered email address.</p>
          <div className="text-center space-y-2 lg:space-y-0 lg:space-x-4">
            <Button variant="outline" className="w-full lg:w-max text-xs lg:text-md" asChild>
              <Link href="/orders">View Order Details</Link>
            </Button>
            <Button className="w-full lg:w-max text-xs lg:text-md" asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SuccessPage