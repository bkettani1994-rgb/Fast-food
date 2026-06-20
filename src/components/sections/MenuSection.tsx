"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { CATEGORIES, PRODUCTS } from "@/data/menu";
import { Category } from "@/types";
import ProductCard from "@/components/ProductCard";

export default function MenuSection() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "Tous">("Tous");

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === "Tous" || p.category === activeCategory;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <section id="menu" className="py-20 sm:py-28 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            Notre <span className="text-orange-400">Menu</span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Des produits frais, préparés à la commande, pour satisfaire toutes
            les envies.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un plat..."
              className="w-full rounded-full bg-neutral-900 border border-neutral-800 pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide">
          {(["Tous", ...CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "bg-neutral-900 text-neutral-300 hover:bg-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-neutral-500 mt-12">
            Aucun plat ne correspond à votre recherche.
          </p>
        )}
      </div>
    </section>
  );
}
