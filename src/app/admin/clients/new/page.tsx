"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createClient } from "../actions";

const inputClasses =
  "w-full rounded-lg border border-[#ddd] bg-white px-4 py-3 text-[#333] outline-none transition-colors focus:border-accent";
const labelClasses = "mb-2 block text-sm font-semibold text-primary";

export default function NewClientPage() {
  const [error, formAction, isPending] = useActionState(createClient, null);

  return (
    <main className="mx-auto max-w-xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-title text-2xl text-primary">Nouveau client</h1>
        <Link href="/admin/clients" className="text-sm text-[#777] hover:underline">
          ← Retour aux clients
        </Link>
      </div>

      <form
        action={formAction}
        className="grid grid-cols-1 gap-6 rounded-xl bg-white p-6 shadow-sm sm:p-8"
      >
        <div>
          <label className={labelClasses} htmlFor="name">
            Nom
          </label>
          <input id="name" name="name" type="text" className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses} htmlFor="email">
            Email
          </label>
          <input id="email" name="email" type="email" className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses} htmlFor="phone">
            Téléphone (optionnel)
          </label>
          <input id="phone" name="phone" type="tel" className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses} htmlFor="address">
            Adresse (optionnel)
          </label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Numéro, rue, code postal, ville"
            className={inputClasses}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-accent py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Création..." : "Créer le client"}
        </button>
      </form>
    </main>
  );
}
