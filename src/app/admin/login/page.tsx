"use client";

import { useActionState } from "react";
import Logo from "@/components/Logo";
import { login } from "../actions";

export default function AdminLoginPage() {
  const [error, formAction, isPending] = useActionState(login, null);

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-5">
      <div className="w-full max-w-sm rounded-2xl bg-cream p-10 shadow-2xl">
        <div className="mb-8 flex flex-col items-center gap-6">
          <Logo />
          <h1 className="font-title text-xl italic text-ink">Espace privé</h1>
        </div>

        <form action={formAction}>
          <label className="mb-2 block text-sm font-semibold text-primary" htmlFor="password">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="w-full rounded-lg border border-[#ddd] px-4 py-3 outline-none transition-colors focus:border-accent"
          />

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="mt-6 w-full rounded-full bg-accent py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </main>
  );
}
