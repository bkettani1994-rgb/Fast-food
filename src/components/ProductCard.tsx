"use client";

import { motion } from "framer-motion";
import { Plus, Flame, Leaf } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {product.popular && (
          <span className="absolute top-3 left-3 bg-orange-500 text-xs font-bold px-2.5 py-1 rounded-full">
            Populaire
          </span>
        )}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {product.spicy && (
            <span className="bg-red-600/90 rounded-full p-1.5">
              <Flame className="w-3.5 h-3.5" />
            </span>
          )}
          {product.vegetarian && (
            <span className="bg-green-600/90 rounded-full p-1.5">
              <Leaf className="w-3.5 h-3.5" />
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-neutral-400 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-extrabold text-orange-400">
            {product.price} DH
          </span>
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-1.5 rounded-full bg-orange-500 hover:bg-orange-600 px-4 py-2 text-sm font-semibold transition-colors active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </button>
        </div>
      </div>
    </motion.div>
  );
}
