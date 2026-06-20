"use client";

import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import { useState } from "react";
import { PROMOTIONS } from "@/data/menu";

export default function PromotionsSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section id="promotions" className="py-20 sm:py-28 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            Offres du <span className="text-orange-400">moment</span>
          </h2>
          <p className="text-neutral-400">Profitez de nos réductions exclusives</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROMOTIONS.map((promo, idx) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <span className="absolute top-4 right-4 bg-orange-500 text-sm font-bold px-3 py-1 rounded-full">
                {promo.discount}
              </span>
              <div className="absolute bottom-0 p-5">
                <h3 className="text-xl font-bold mb-1">{promo.title}</h3>
                <p className="text-sm text-neutral-300 mb-3">{promo.description}</p>
                <button
                  onClick={() => handleCopy(promo.code)}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/30 backdrop-blur px-4 py-1.5 text-sm font-mono hover:bg-white/20 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied === promo.code ? "Copié !" : promo.code}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
