"use client";

import { motion } from "framer-motion";
import { Bell, MapPin, Smartphone } from "lucide-react";

export default function AppPreviewSection() {
  return (
    <section id="app" className="py-20 sm:py-28 bg-neutral-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Suivez votre commande,{" "}
            <span className="text-orange-400">où que vous soyez</span>
          </h2>
          <p className="text-neutral-400 mb-8 max-w-md">
            Notre application mobile vous permet de commander en quelques
            secondes et de suivre chaque étape de la préparation jusqu&apos;à
            la livraison.
          </p>
          <div className="space-y-4">
            {[
              { icon: Bell, text: "Notifications en temps réel à chaque étape" },
              { icon: MapPin, text: "Localisation du livreur sur la carte" },
              { icon: Smartphone, text: "Commande en 3 clics depuis votre mobile" },
            ].map((f, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-orange-500/15 text-orange-400 flex items-center justify-center">
                  <f.icon className="w-5 h-5" />
                </span>
                <span className="text-neutral-200">{f.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >
          <div className="relative w-64 h-[520px] rounded-[2.5rem] border-8 border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-6 bg-neutral-800 rounded-b-2xl w-32 mx-auto" />
            <img
              src="https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&q=80"
              alt="Aperçu application mobile"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-3">
              <p className="text-xs text-neutral-500">Commande #CMD-3F9A2</p>
              <p className="font-bold">En cours de livraison</p>
              <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-to-r from-orange-500 to-red-500" />
              </div>
              <p className="text-xs text-neutral-400">Arrivée estimée : 12 min</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
