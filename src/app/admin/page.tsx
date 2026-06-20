"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  ClipboardList,
  LogOut,
  Pizza,
  Users,
} from "lucide-react";
import { useOrders } from "@/context/OrderContext";
import { ORDER_STEPS, OrderStep } from "@/types";
import { PRODUCTS } from "@/data/menu";
import AdminLogin, { isAdminAuthenticated } from "@/components/admin/AdminLogin";
import { playNotificationSound } from "@/lib/notificationSound";

type Tab = "commandes" | "stats" | "menu" | "clients";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(isAdminAuthenticated);
  const [tab, setTab] = useState<Tab>("commandes");
  const { orders, updateOrderStep, newOrderFlag, clearNewOrderFlag } = useOrders();

  useEffect(() => {
    if (newOrderFlag) {
      playNotificationSound();
      clearNewOrderFlag();
    }
  }, [newOrderFlag, clearNewOrderFlag]);

  const stats = useMemo(() => {
    const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
    const today = orders.filter(
      (o) => new Date(o.createdAt).toDateString() === new Date().toDateString()
    );
    return {
      totalOrders: orders.length,
      totalSales,
      todayOrders: today.length,
      todaySales: today.reduce((sum, o) => sum + o.total, 0),
      avgBasket: orders.length ? Math.round(totalSales / orders.length) : 0,
    };
  }, [orders]);

  const customers = useMemo(() => {
    const map = new Map<string, { name: string; phone: string; orders: number; spent: number }>();
    orders.forEach((o) => {
      const key = o.customer.phone || o.customer.name;
      const entry = map.get(key) ?? {
        name: o.customer.name,
        phone: o.customer.phone,
        orders: 0,
        spent: 0,
      };
      entry.orders += 1;
      entry.spent += o.total;
      map.set(key, entry);
    });
    return Array.from(map.values());
  }, [orders]);

  if (!authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <aside className="w-64 hidden lg:flex flex-col border-r border-neutral-800 p-5">
        <span className="text-xl font-black bg-gradient-to-r from-orange-400 via-red-500 to-amber-400 bg-clip-text text-transparent mb-8">
          Snack Express Admin
        </span>
        <nav className="space-y-1">
          {[
            { id: "commandes", label: "Commandes", icon: ClipboardList },
            { id: "stats", label: "Statistiques", icon: BarChart3 },
            { id: "menu", label: "Menu", icon: Pizza },
            { id: "clients", label: "Clients", icon: Users },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                tab === item.id
                  ? "bg-orange-500/15 text-orange-400"
                  : "text-neutral-400 hover:bg-neutral-900"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => {
            localStorage.removeItem("fastfood_admin_session");
            setAuthenticated(false);
          }}
          className="mt-auto flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-neutral-500 hover:bg-neutral-900"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </aside>

      <main className="flex-1 p-5 sm:p-8 overflow-y-auto">
        <div className="flex lg:hidden gap-2 mb-6 overflow-x-auto">
          {(["commandes", "stats", "menu", "clients"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                tab === t ? "bg-orange-500" : "bg-neutral-900 text-neutral-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "commandes" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Commandes en direct</h1>
            {orders.length === 0 ? (
              <p className="text-neutral-500">Aucune commande pour le moment.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-xl bg-neutral-900 border border-neutral-800 p-5"
                  >
                    <div className="flex flex-wrap justify-between gap-3 mb-3">
                      <div>
                        <p className="font-mono font-bold text-orange-400">{order.id}</p>
                        <p className="text-sm text-neutral-400">
                          {order.customer.name} • {order.customer.phone}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{order.total} DH</p>
                        <p className="text-xs text-neutral-500">
                          {order.deliveryMode === "livraison" ? "Livraison" : "Retrait"} •{" "}
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-300 mb-3">
                      {order.items.map((i) => `${i.quantity}x ${i.product.name}`).join(", ")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ORDER_STEPS.map((s) => (
                        <button
                          key={s.key}
                          onClick={() => updateOrderStep(order.id, s.key as OrderStep)}
                          className={`text-xs rounded-full px-3 py-1.5 font-medium transition-colors ${
                            order.step === s.key
                              ? "bg-orange-500 text-white"
                              : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "stats" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Statistiques de ventes</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Commandes totales", value: stats.totalOrders },
                { label: "Chiffre d'affaires", value: `${stats.totalSales} DH` },
                { label: "Commandes aujourd'hui", value: stats.todayOrders },
                { label: "Panier moyen", value: `${stats.avgBasket} DH` },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-neutral-900 border border-neutral-800 p-5">
                  <p className="text-sm text-neutral-500 mb-1">{s.label}</p>
                  <p className="text-2xl font-bold text-orange-400">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "menu" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Gestion du menu</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRODUCTS.map((p) => (
                <div key={p.id} className="rounded-xl bg-neutral-900 border border-neutral-800 p-4 flex gap-3">
                  <img src={p.image} alt={p.name} className="w-14 h-14 rounded-lg object-cover" />
                  <div>
                    <p className="font-semibold text-sm">{p.name}</p>
                    <p className="text-xs text-neutral-500">{p.category}</p>
                    <p className="text-orange-400 font-bold text-sm">{p.price} DH</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-neutral-600 mt-4">
              Connectez une base de données (Supabase/Firebase) pour activer la
              création et la modification de produits en direct.
            </p>
          </div>
        )}

        {tab === "clients" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Clients</h1>
            {customers.length === 0 ? (
              <p className="text-neutral-500">Aucun client pour le moment.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-neutral-500 border-b border-neutral-800">
                      <th className="py-2 pr-4">Nom</th>
                      <th className="py-2 pr-4">Téléphone</th>
                      <th className="py-2 pr-4">Commandes</th>
                      <th className="py-2 pr-4">Total dépensé</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c) => (
                      <tr key={c.phone} className="border-b border-neutral-900">
                        <td className="py-2 pr-4">{c.name}</td>
                        <td className="py-2 pr-4">{c.phone}</td>
                        <td className="py-2 pr-4">{c.orders}</td>
                        <td className="py-2 pr-4 text-orange-400 font-semibold">{c.spent} DH</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
