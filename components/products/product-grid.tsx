"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Product } from "@/sanity.types";
import ProductCard from "./product-card";

const ProductGrid = ({ products }: { products: Product[]}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {products?.map((product) => {
        return (
          <AnimatePresence key={product._id}>
            <motion.div layout initial={{ opacity: 0.2 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProductCard product={product}/>
            </motion.div>
          </AnimatePresence>
        )
      })}
    </div>
  )
}

export default ProductGrid;