"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu as MenuIcon, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#avis", label: "Avis" },
  { href: "#promotions", label: "Promotions" },
  { href: "#app", label: "Application" },
  { href: "/suivi", label: "Suivi commande" },
];

export default function Header() {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-neutral-950/90 backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black bg-gradient-to-r from-orange-400 via-red-500 to-amber-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
            Snack Express
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-300 hover:text-orange-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={open}
            aria-label="Ouvrir le panier"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 hover:bg-orange-500 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                {count}
              </span>
            )}
          </button>
          <a
            href="#menu"
            className="hidden sm:inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all"
          >
            Commander Maintenant
          </a>
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 px-4 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-base font-medium text-neutral-200 hover:text-orange-400"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
