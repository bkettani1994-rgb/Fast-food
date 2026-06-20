import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_NAME = "Snack Express";
const SITE_DESCRIPTION =
  "Commandez vos burgers, tacos, pizzas et sandwichs préférés en ligne et suivez votre livraison en temps réel avec Snack Express.";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Fast-food en ligne avec suivi en temps réel`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "fast food",
    "commande en ligne",
    "livraison rapide",
    "burger",
    "tacos",
    "pizza",
    "snack",
    "suivi commande temps réel",
  ],
  openGraph: {
    title: `${SITE_NAME} | Commandez en ligne`,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Snack Express",
  servesCuisine: ["Fast Food", "Burgers", "Tacos", "Pizza"],
  priceRange: "$$",
  acceptsReservations: "False",
  address: {
    "@type": "PostalAddress",
    streetAddress: "12 Avenue Mohammed V",
    addressLocality: "Casablanca",
    addressCountry: "MA",
  },
  telephone: "+212600000000",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "23:30",
    },
  ],
  menu: "/#menu",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "320",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
        <OrderProvider>
          <CartProvider>{children}</CartProvider>
        </OrderProvider>
      </body>
    </html>
  );
}
