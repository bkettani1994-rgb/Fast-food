"use client";

import { useState } from "react";

const ADMIN_PASSWORD = "snack2024";
const SESSION_KEY = "fastfood_admin_session";

export function isAdminAuthenticated() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SESSION_KEY) === "true";
}

export default function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(SESSION_KEY, "true");
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-neutral-900 border border-neutral-800 p-8"
      >
        <h1 className="text-xl font-bold mb-1">Espace Restaurant</h1>
        <p className="text-sm text-neutral-500 mb-6">
          Connectez-vous pour accéder au tableau de bord.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="Mot de passe"
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 mb-2"
        />
        {error && <p className="text-red-400 text-xs mb-3">Mot de passe incorrect.</p>}
        <button
          type="submit"
          className="w-full rounded-full bg-orange-500 hover:bg-orange-600 py-2.5 font-semibold mt-3 transition-colors"
        >
          Se connecter
        </button>
        <p className="text-xs text-neutral-600 mt-4 text-center">
          Démo : mot de passe &ldquo;snack2024&rdquo;
        </p>
      </form>
    </div>
  );
}
