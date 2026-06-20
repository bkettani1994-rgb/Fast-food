"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { CartItem, CustomerInfo, DeliveryMode, Order, OrderStep, PaymentMode, ORDER_STEPS } from "@/types";

const STORAGE_KEY = "fastfood_orders";
const CHANNEL_NAME = "fastfood_orders_channel";

interface OrderContextValue {
  orders: Order[];
  placeOrder: (
    items: CartItem[],
    total: number,
    customer: CustomerInfo,
    deliveryMode: DeliveryMode,
    paymentMode: PaymentMode
  ) => Order;
  updateOrderStep: (orderId: string, step: OrderStep) => void;
  getOrder: (orderId: string) => Order | undefined;
  newOrderFlag: boolean;
  clearNewOrderFlag: () => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

function readOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeOrders(orders: Order[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(readOrders);
  const [newOrderFlag, setNewOrderFlag] = useState(false);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;
    channel.onmessage = (event) => {
      if (event.data?.type === "orders_updated") {
        setOrders(event.data.orders);
      }
      if (event.data?.type === "new_order") {
        setNewOrderFlag(true);
      }
    };
    const currentTimers = timers.current;
    return () => {
      channel.close();
      currentTimers.forEach(clearTimeout);
    };
  }, []);

  const persist = useCallback((next: Order[], broadcastNew = false) => {
    setOrders(next);
    writeOrders(next);
    channelRef.current?.postMessage({ type: "orders_updated", orders: next });
    if (broadcastNew) {
      channelRef.current?.postMessage({ type: "new_order" });
    }
  }, []);

  const scheduleProgression = useCallback(
    (orderId: string) => {
      const stepDurations = [4000, 6000, 6000, 5000, 7000];
      let delay = 0;
      stepDurations.forEach((d, idx) => {
        delay += d;
        const timer = setTimeout(() => {
          setOrders((prev) => {
            const next = prev.map((o) =>
              o.id === orderId
                ? { ...o, step: ORDER_STEPS[idx + 1].key }
                : o
            );
            writeOrders(next);
            channelRef.current?.postMessage({ type: "orders_updated", orders: next });
            return next;
          });
        }, delay);
        timers.current.push(timer);
      });
    },
    []
  );

  const placeOrder = useCallback(
    (
      items: CartItem[],
      total: number,
      customer: CustomerInfo,
      deliveryMode: DeliveryMode,
      paymentMode: PaymentMode
    ): Order => {
      const order: Order = {
        id: `CMD-${Date.now().toString(36).toUpperCase()}`,
        items,
        total,
        customer,
        deliveryMode,
        paymentMode,
        step: "recue",
        createdAt: Date.now(),
        estimatedMinutes: deliveryMode === "livraison" ? 35 : 15,
      };
      const next = [order, ...readOrders()];
      persist(next, true);
      scheduleProgression(order.id);
      return order;
    },
    [persist, scheduleProgression]
  );

  const updateOrderStep = useCallback(
    (orderId: string, step: OrderStep) => {
      const next = readOrders().map((o) =>
        o.id === orderId ? { ...o, step } : o
      );
      persist(next);
    },
    [persist]
  );

  const getOrder = useCallback(
    (orderId: string) => orders.find((o) => o.id === orderId),
    [orders]
  );

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        updateOrderStep,
        getOrder,
        newOrderFlag,
        clearNewOrderFlag: () => setNewOrderFlag(false),
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
