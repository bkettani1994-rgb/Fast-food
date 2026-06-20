export type Category =
  | "Burgers"
  | "Sandwichs"
  | "Tacos"
  | "Pizza"
  | "Boissons"
  | "Desserts";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  note?: string;
}

export type OrderStep =
  | "recue"
  | "preparation"
  | "cuisson"
  | "prete"
  | "livraison"
  | "livree";

export const ORDER_STEPS: { key: OrderStep; label: string }[] = [
  { key: "recue", label: "Commande reçue" },
  { key: "preparation", label: "En préparation" },
  { key: "cuisson", label: "En cuisson" },
  { key: "prete", label: "Prête" },
  { key: "livraison", label: "En livraison" },
  { key: "livree", label: "Livrée" },
];

export type DeliveryMode = "livraison" | "retrait";
export type PaymentMode = "carte" | "especes" | "en_ligne";

export interface CustomerInfo {
  name: string;
  phone: string;
  address?: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: CustomerInfo;
  deliveryMode: DeliveryMode;
  paymentMode: PaymentMode;
  step: OrderStep;
  createdAt: number;
  estimatedMinutes: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  image: string;
}
