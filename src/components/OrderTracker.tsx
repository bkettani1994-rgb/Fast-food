"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Order, ORDER_STEPS } from "@/types";

export default function OrderTracker({ order }: { order: Order }) {
  const activeIndex = ORDER_STEPS.findIndex((s) => s.key === order.step);
  const [now, setNow] = useState(order.createdAt);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 15000);
    return () => clearInterval(interval);
  }, []);

  const minutesLeft = Math.max(
    0,
    order.estimatedMinutes - Math.floor((now - order.createdAt) / 60000)
  );

  return (
    <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div>
          <p className="text-sm text-neutral-500">Commande</p>
          <p className="font-mono font-bold text-orange-400">{order.id}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-neutral-500">Heure estimée</p>
          <p className="font-bold">{minutesLeft > 0 ? `${minutesLeft} min` : "Imminent"}</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-4 h-1 bg-neutral-800 rounded-full" />
        <motion.div
          className="absolute left-0 top-4 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
          initial={{ width: 0 }}
          animate={{
            width: `${(activeIndex / (ORDER_STEPS.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.6 }}
        />
        <div className="relative grid grid-cols-3 sm:grid-cols-6 gap-y-6">
          {ORDER_STEPS.map((s, idx) => {
            const done = idx <= activeIndex;
            return (
              <div key={s.key} className="flex flex-col items-center text-center gap-2">
                <motion.div
                  animate={{
                    scale: idx === activeIndex ? [1, 1.15, 1] : 1,
                  }}
                  transition={{
                    repeat: idx === activeIndex ? Infinity : 0,
                    duration: 1.4,
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                    done
                      ? "bg-orange-500 border-orange-500 text-white"
                      : "bg-neutral-900 border-neutral-700 text-neutral-500"
                  }`}
                >
                  {done ? <Check className="w-4 h-4" /> : idx + 1}
                </motion.div>
                <span
                  className={`text-xs ${done ? "text-white font-medium" : "text-neutral-500"}`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 border-t border-neutral-800 pt-5 space-y-2">
        {order.items.map((item) => (
          <div key={item.product.id} className="flex justify-between text-sm text-neutral-300">
            <span>
              {item.quantity}x {item.product.name}
            </span>
            <span>{item.product.price * item.quantity} DH</span>
          </div>
        ))}
        <div className="flex justify-between font-bold pt-2 border-t border-neutral-800">
          <span>Total</span>
          <span className="text-orange-400">{order.total} DH</span>
        </div>
      </div>
    </div>
  );
}
