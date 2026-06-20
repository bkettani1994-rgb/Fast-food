"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { CustomerInfo, DeliveryMode, PaymentMode } from "@/types";

type Step = "cart" | "info" | "payment" | "confirm";

export default function CartDrawer() {
  const { items, isOpen, close, updateQuantity, removeItem, setNote, total, clear } = useCart();
  const { placeOrder } = useOrders();
  const router = useRouter();

  const [step, setStep] = useState<Step>("cart");
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("livraison");
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("en_ligne");
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: "",
    phone: "",
    address: "",
  });
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  const deliveryFee = deliveryMode === "livraison" ? 10 : 0;
  const grandTotal = total + deliveryFee;

  const handleClose = () => {
    close();
    setStep("cart");
  };

  const handleConfirm = () => {
    const order = placeOrder(items, grandTotal, customer, deliveryMode, paymentMode);
    setLastOrderId(order.id);
    clear();
    setStep("confirm");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 z-[60]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-neutral-900 z-[70] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-5 border-b border-neutral-800">
              <h3 className="text-lg font-bold">
                {step === "cart" && "Votre panier"}
                {step === "info" && "Vos informations"}
                {step === "payment" && "Paiement"}
                {step === "confirm" && "Commande confirmée"}
              </h3>
              <button onClick={handleClose} className="p-1.5 rounded-full hover:bg-neutral-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {step === "cart" && (
                <>
                  {items.length === 0 ? (
                    <p className="text-neutral-500 text-center mt-16">Votre panier est vide.</p>
                  ) : (
                    items.map((item) => (
                      <div key={item.product.id} className="flex gap-3 bg-neutral-800/50 rounded-xl p-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm">{item.product.name}</span>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-neutral-500 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-orange-400 text-sm font-bold">
                            {item.product.price} DH
                          </span>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-neutral-700 flex items-center justify-center"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-neutral-700 flex items-center justify-center"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <input
                            value={item.note ?? ""}
                            onChange={(e) => setNote(item.product.id, e.target.value)}
                            placeholder="Note spéciale (ex: sans oignons)"
                            className="mt-2 w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                    ))
                  )}

                  {items.length > 0 && (
                    <div className="pt-2">
                      <p className="text-sm font-semibold mb-2">Mode de réception</p>
                      <div className="flex gap-2">
                        {(["livraison", "retrait"] as DeliveryMode[]).map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setDeliveryMode(mode)}
                            className={`flex-1 rounded-lg py-2 text-sm font-medium border transition-colors ${
                              deliveryMode === mode
                                ? "bg-orange-500 border-orange-500 text-white"
                                : "border-neutral-700 text-neutral-300"
                            }`}
                          >
                            {mode === "livraison" ? "Livraison" : "Retrait sur place"}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {step === "info" && (
                <div className="space-y-3">
                  <input
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="Nom complet"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500"
                  />
                  <input
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="Téléphone"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500"
                  />
                  {deliveryMode === "livraison" && (
                    <input
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      placeholder="Adresse de livraison"
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500"
                    />
                  )}
                  <textarea
                    value={customer.notes}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    placeholder="Instructions complémentaires (optionnel)"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500"
                    rows={2}
                  />
                </div>
              )}

              {step === "payment" && (
                <div className="space-y-2">
                  {(
                    [
                      { id: "en_ligne", label: "Paiement en ligne (carte bancaire sécurisée)" },
                      { id: "carte", label: "Carte à la livraison" },
                      { id: "especes", label: "Espèces à la livraison" },
                    ] as { id: PaymentMode; label: string }[]
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setPaymentMode(opt.id)}
                      className={`w-full text-left rounded-lg border px-4 py-3 text-sm transition-colors ${
                        paymentMode === opt.id
                          ? "bg-orange-500/10 border-orange-500 text-white"
                          : "border-neutral-700 text-neutral-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {step === "confirm" && lastOrderId && (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4 text-3xl">
                    ✓
                  </div>
                  <p className="font-semibold mb-1">Merci pour votre commande !</p>
                  <p className="text-sm text-neutral-400 mb-6">
                    Référence : <span className="text-orange-400 font-mono">{lastOrderId}</span>
                  </p>
                  <button
                    onClick={() => {
                      handleClose();
                      router.push(`/suivi?id=${lastOrderId}`);
                    }}
                    className="w-full rounded-full bg-orange-500 hover:bg-orange-600 py-3 font-semibold transition-colors"
                  >
                    Suivre ma commande
                  </button>
                </div>
              )}
            </div>

            {step !== "confirm" && (
              <div className="border-t border-neutral-800 p-5 space-y-3">
                <div className="flex justify-between text-sm text-neutral-400">
                  <span>Sous-total</span>
                  <span>{total} DH</span>
                </div>
                {step !== "cart" && (
                  <div className="flex justify-between text-sm text-neutral-400">
                    <span>Frais de livraison</span>
                    <span>{deliveryFee} DH</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-orange-400">
                    {step === "cart" ? total : grandTotal} DH
                  </span>
                </div>

                {step === "cart" && (
                  <button
                    disabled={items.length === 0}
                    onClick={() => setStep("info")}
                    className="w-full rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed py-3 font-semibold transition-colors"
                  >
                    Continuer
                  </button>
                )}
                {step === "info" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep("cart")}
                      className="flex-1 rounded-full bg-neutral-800 py-3 font-semibold"
                    >
                      Retour
                    </button>
                    <button
                      disabled={!customer.name || !customer.phone}
                      onClick={() => setStep("payment")}
                      className="flex-1 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 py-3 font-semibold"
                    >
                      Continuer
                    </button>
                  </div>
                )}
                {step === "payment" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep("info")}
                      className="flex-1 rounded-full bg-neutral-800 py-3 font-semibold"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="flex-1 rounded-full bg-orange-500 hover:bg-orange-600 py-3 font-semibold"
                    >
                      Valider la commande
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
