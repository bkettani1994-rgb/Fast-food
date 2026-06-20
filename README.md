# Snack Express — Landing Page Fast-Food

Landing page premium pour un restaurant snack / fast-food, avec commande en
ligne, panier intelligent, suivi de commande en temps réel et tableau de bord
restaurant.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion (animations)
- Lucide React (icônes)

## Démarrer

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Pages

- `/` — landing page : hero, menu filtrable, panier, avis, promotions, aperçu mobile, footer.
- `/suivi` — suivi de commande en temps réel (timeline d'étapes, ETA).
- `/admin` — tableau de bord restaurant (mot de passe démo : `snack2024`) : commandes en direct avec son de notification, statistiques, menu, clients.

## Notes d'implémentation

Le panier et les commandes sont persistés en `localStorage` et synchronisés
entre onglets via `BroadcastChannel`, ce qui simule un flux temps réel
(commande client → tableau de bord restaurant) sans backend. Pour une mise en
production réelle, brancher :

- Une base de données (Supabase / Firebase) pour produits, commandes, clients.
- Des notifications push/WebSocket serveur pour le suivi temps réel.
- Une authentification sécurisée pour le dashboard restaurant.
- Un fournisseur de paiement (carte bancaire / paiement en ligne).
