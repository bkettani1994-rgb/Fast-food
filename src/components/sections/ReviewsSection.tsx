"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { REVIEWS } from "@/data/menu";

export default function ReviewsSection() {
  return (
    <section id="avis" className="py-20 sm:py-28 bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            Ce que disent <span className="text-orange-400">nos clients</span>
          </h2>
          <p className="text-neutral-400">Plus de 300 avis vérifiés, note moyenne de 4.8/5</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl bg-neutral-950 border border-neutral-800 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? "fill-orange-400 text-orange-400" : "text-neutral-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-neutral-300">&ldquo;{review.comment}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
