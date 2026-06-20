"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import OrderTracker from "@/components/OrderTracker";
import { useOrders } from "@/context/OrderContext";

function SuiviContent() {
  const params = useSearchParams();
  const { getOrder, orders } = useOrders();
  const [search, setSearch] = useState(params.get("id") ?? "");

  const order = getOrder(search) ?? orders.find((o) => o.id === search);

  return (
    <main className="flex-1 pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black mb-2 text-center">
          Suivi de <span className="text-orange-400">commande</span>
        </h1>
        <p className="text-neutral-400 text-center mb-10">
          Entrez votre référence de commande pour suivre sa progression en
          temps réel.
        </p>

        <div className="flex gap-2 mb-10">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value.toUpperCase())}
            placeholder="Ex: CMD-3F9A2"
            className="flex-1 rounded-full bg-neutral-900 border border-neutral-800 px-5 py-3 text-sm font-mono focus:outline-none focus:border-orange-500"
          />
        </div>

        {order ? (
          <OrderTracker order={order} />
        ) : (
          <p className="text-center text-neutral-500">
            Aucune commande trouvée pour cette référence.
          </p>
        )}
      </div>
    </main>
  );
}

export default function SuiviPage() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <SuiviContent />
      </Suspense>
      <Footer />
      <CartDrawer />
    </>
  );
}
