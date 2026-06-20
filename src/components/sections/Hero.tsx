"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=80"
          alt="Burger et frites Snack Express"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="inline-block rounded-full bg-orange-500/10 border border-orange-500/30 px-4 py-1.5 text-sm font-medium text-orange-400 mb-6">
            Livraison en moins de 30 minutes
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Le goût qui vous{" "}
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-amber-400 bg-clip-text text-transparent">
              régale
            </span>
            , livré chez vous
          </h1>
          <p className="text-lg text-neutral-300 mb-8 max-w-xl">
            Burgers, tacos, pizzas et sandwichs préparés minute. Commandez en
            quelques clics et suivez votre livraison en temps réel, du
            fourneau jusqu&apos;à votre porte.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-7 py-3.5 font-semibold shadow-xl shadow-orange-500/30 hover:scale-105 hover:shadow-orange-500/50 transition-all"
            >
              Commander Maintenant
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-7 py-3.5 font-semibold backdrop-blur hover:bg-white/20 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Voir le Menu
            </a>
          </div>

          <div className="mt-12 flex gap-8 text-sm text-neutral-300">
            <div>
              <div className="text-2xl font-bold text-white">15k+</div>
              Commandes livrées
            </div>
            <div>
              <div className="text-2xl font-bold text-white">4.8/5</div>
              Note moyenne
            </div>
            <div>
              <div className="text-2xl font-bold text-white">25 min</div>
              Temps moyen
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
