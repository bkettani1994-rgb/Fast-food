import Link from "next/link";
import { Facebook, Instagram, MapPin, Phone, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <span className="text-xl font-black bg-gradient-to-r from-orange-400 via-red-500 to-amber-400 bg-clip-text text-transparent">
            Snack Express
          </span>
          <p className="text-sm text-neutral-400 mt-3">
            Fast-food premium, préparé minute et livré rapidement partout en
            ville.
          </p>
          <div className="flex gap-3 mt-4">
            {[Facebook, Instagram, Twitter].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Coordonnées</h4>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-400" />
              12 Avenue Mohammed V, Casablanca
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-400" />
              +212 6 00 00 00 00
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Horaires</h4>
          <ul className="space-y-1 text-sm text-neutral-400">
            <li>Lundi - Dimanche</li>
            <li>10h00 - 23h30</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Liens utiles</h4>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>
              <Link href="/suivi" className="hover:text-orange-400">
                Suivre ma commande
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-orange-400">
                Espace restaurant
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400">
                Politique de confidentialité
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-center text-xs text-neutral-600 mt-12">
        © {new Date().getFullYear()} Snack Express. Tous droits réservés.
      </p>
    </footer>
  );
}
