"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store/store";
import { IoCartOutline } from "react-icons/io5";
import { FaImage } from "react-icons/fa6";
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
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }

    } catch (error) {
      console.error("Error creating checkout session", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 lg:grid lg:grid-cols-4 gap-8">
      <div className="col-span-3 space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-md font-bold">Cart</h1>
          <span className="text-xs text-gray-500">Price</span>
        </div>

        <hr />

        <div className="flex flex-col divide-y">
          {groupedItems.map((item) => {
            const itemCount = getItemCount(item.product._id);
            
            return (
              <div key={item.product._id} className="flex justify-between gap-4 py-3">
                {/* Product Image */}
                <Link href={item.product.slug ? `/product/${item.product.slug.current}` : "/"}>
                  <div className="flex items-center justify-center aspect-square w-24 h-24 lg:w-32 lg:h-32 rounded-md shadow-md overflow-hidden hover:cursor-pointer">
                    {item.product.image ? (
                      <Image
                        src={imageUrl(item.product.image).url()}
                        alt={`${item.product.name} image`}
                        width={500}
                        height={500}
                        style={{ objectFit: "contain" }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 gap-2 text-center">
                        <FaImage className="w-8 h-8 text-gray-400" />
                        <span className="text-xs text-gray-400">No Image Available</span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Details */}
                <div className="flex-1 flex flex-col">
                  <Link href={item.product.slug ? `/product/${item.product.slug.current}` : "/"} className="text-sm lg:text-md mb-1 hover:underline">{item.product.name}</Link>

                  <div className="w-full text-xs lg:text-sm mb-2">
                    <span className="font-semibold">Total stock:</span>
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
                    <div className="grid grid-cols-3 items-center text-center border rounded-md p-[2px]">
                      <button
                        onClick={() => removeItem(item.product._id)}
                        className="w-4 h-4 lg:w-6 lg:h-6 flex items-center justify-center rounded-md hover:bg-gray-100"
                      >
                        <span className={`text-lg lg:text-xl ${itemCount === 0 ? "text-gray-400" : "text-black"}`}>-</span>
                      </button>
                      <span className="text-sm">{itemCount}</span>
                      <button
                        onClick={() => addItem(item.product)}
                        disabled={itemCount === item.product.stock}
                        className="w-4 h-4 lg:w-6 lg:h-6 flex items-center justify-center rounded-md hover:bg-gray-100"
                      >
                        <span className={`text-lg lg:text-xl ${itemCount === item.product.stock ? "text-gray-400" : "text-black"}`}>+</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Price */}
                <div className="text-end text-sm lg:text-md font-bold">${((item.product.price ?? 0) * item.quantity).toFixed(2)}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full lg:sticky lg:top-4 h-fit bg-white p-4 border rounded-md shadow-md order-first lg:order-last fixed left-0 bottom-0 right-0">
        <h3 className="text-md font-bold mb-2">Order Summary</h3>
        <div className="divide-y mb-2">
          <p className="flex justify-between text-sm py-2">
            <span>Items:</span>
            <span>
              {groupedItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </p>
          <p className="flex justify-between text-lg font-bold py-2">
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
            className="w-full rounded-full"
          >
            {isLoading ? "Processing..." : "Checkout"}
          </Button>
        ): (
          <Button
            className="w-full rounded-full"
            asChild
          >
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
