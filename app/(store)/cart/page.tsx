"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store/store";
import { IoCartOutline } from "react-icons/io5";
import { SignInButton, SignUpButton, useAuth, useUser } from "@clerk/clerk-react";
import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/sanity/lib/imageUrl";
import { useEffect, useState } from "react";
import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";

const CartPage = () => {
  const { addItem, removeItem, getItemCount, getTotalPrice, getGroupedItems } = useCartStore();
  const totalPrice = getTotalPrice();
  const groupedItems = getGroupedItems();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[70vh]">
        <IoCartOutline className="w-20 h-20 text-gray-400" />
        <p className="text-lg text-gray-400 mb-6">Your cart is empty!</p>
        {!isSignedIn ? (
          <div className="space-x-2">
            <Button variant={"outline"} asChild>
              <SignInButton mode="modal">Sign in to your account</SignInButton>
            </Button>
            <Button asChild>
              <SignUpButton mode="modal">Sign up now</SignUpButton>
            </Button>
          </div>
        ) : (
          <Button asChild>
            <Link href={"/"}>Go to shop</Link>
          </Button>
        )}
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      }

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata)
    } catch (error) {
      console.error("Error creating checkout session", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 lg:grid lg:grid-cols-4 gap-8">
      <div className="col-span-3 space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Your Cart</h1>
          <span className="text-sm text-gray-500">Price</span>
        </div>
        <hr />
        <div className="flex flex-col divide-y">
          {groupedItems.map((item) => {
            const itemCount = getItemCount(item.product._id);

            return (
              <div key={item.product._id} className="flex justify-between gap-6 py-3">
                {/* Product Image */}
                <div className="flex items-center justify-center aspect-square w-16 h-16 lg:w-32 lg:h-32">
                  {item.product.image ? (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={`Image of ${item.product.name}`}
                      width={500}
                      height={500}
                      style={{ objectFit: "contain" }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200">
                      <span>No Image Available</span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col">
                  <span className="text-sm lg:text-md mb-1">{item.product.name}</span>
                  {/* Stock Information */}
                  <div className="w-full text-xs mb-2">
                    Total Stock:
                    <span
                      className={`${
                        item.product.stock !== undefined && item.product.stock < 30
                          ? "text-orange-600"
                          : "text-black"
                      } ml-1`}
                    >
                      {item.product.stock ?? "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* Quantity Control */}
                    <div className="flex items-center justify-between border rounded-md p-1 gap-2">
                      <button
                        onClick={() => removeItem(item.product._id)}
                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-100"
                      >
                        <span className={`text-xl ${itemCount === 0 ? "text-gray-400" : "text-black"}`}>-</span>
                      </button>
                      <span>{itemCount}</span>
                      <button
                        onClick={() => addItem(item.product)}
                        disabled={itemCount === item.product.stock}
                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-100"
                      >
                        <span className={`text-xl ${itemCount === item.product.stock ? "text-gray-400" : "text-black"}`}>+</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Price */}
                <div className="text-end font-bold">${((item.product.price ?? 0) * item.quantity).toFixed(2)}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full lg:sticky lg:top-4 h-fit bg-white p-4 border rounded order-first lg:order-last fixed left-0 bottom-0">
        <h3 className="text-xl font-semibold">Order Summary</h3>
        <div className="my-4 space-y-2">
          <p className="flex justify-between">
            <span>Items:</span>
            <span>
              {groupedItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </p>
          <p className="flex justify-between text-2xl font-bold border-t pt-2">
            <span>Total:</span>
            <span>
              ${totalPrice.toFixed(2)}
            </span>
          </p>
        </div>

        {isSignedIn ? (
          <Button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Processing..." : "Checkout"}
          </Button>
        ): (
          <Button className="w-full" asChild>
            <SignInButton mode="modal">
              Sign in to checkout
            </SignInButton>
          </Button>
        )
        
        }
      </div>
    </div>
  );
};

export default CartPage;
