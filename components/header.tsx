"use client"

import Link from "next/link";
import Form from "next/form";

import { IoCartOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const { user } = useUser();
  return (
    <header className="flex justify-between items-center px-1 md:px-4 py-4 gap-4">
      <Link href="/" className="text-xl md:text-2xl font-extrabold uppercase">shop</Link>
      
      <Form action="/search" className="flex-1 max-w-xl">
        <Input
        type="text"
        name="query"
        placeholder="Seach products" />
      </Form>

      <div className="flex gap-2 items-center">
        <Button size="sm" className="rounded-sm">
          <Link href="/cart" className="flex gap-1">
            <IoCartOutline className="w-6 h-6" />
            <span className="hidden md:block">My Cart</span>
          </Link>
        </Button>

        <ClerkLoaded>
          {user && (
            <Button size="sm" className="rounded-sm">
              <Link href="/orders" className="flex gap-1">
                <BsBoxSeam className="w-6 h-6" />
                <span className="hidden md:block">My Orders</span>
              </Link>
            </Button>
          )}

          {user ? (
            <UserButton />
          ) : (
            <Button size="sm" className="rounded-sm" asChild>
              <SignInButton mode="modal" />
            </Button>
          )}
        </ClerkLoaded>
      </div>
    </header>
  )
}
