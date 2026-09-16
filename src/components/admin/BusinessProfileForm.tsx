"use client";

import { useActionState } from "react";
import type { BusinessProfile } from "@prisma/client";
import { saveBusinessProfile } from "@/app/admin/settings/actions";

const inputClasses =
  "w-full rounded-lg border border-[#ddd] bg-white px-4 py-3 text-[#333] outline-none transition-colors focus:border-accent";
const labelClasses = "mb-2 block text-sm font-semibold text-primary";

export default function BusinessProfileForm({
  profile,
}: {
  profile: BusinessProfile | null;
}) {
  const [error, formAction, isPending] = useActionState(
    saveBusinessProfile,
    null,
  );

  return (
    <form
      action={formAction}
      className="grid grid-cols-1 gap-6 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8"
    >
      <div className="sm:col-span-2">
        <label className={labelClasses} htmlFor="legalName">
          Nom / Raison sociale
        </label>
        <input
          id="legalName"
          name="legalName"
          type="text"
          defaultValue={profile?.legalName}
          placeholder="Évelyne [Nom] — R'Eve Ski Montagne"
          className={inputClasses}
        />
      </div>

      <div className="sm:col-span-2">
        <label className={labelClasses} htmlFor="address">
          Adresse
        </label>
        <input
          id="address"
          name="address"
          type="text"
          defaultValue={profile?.address}
          placeholder="Numéro, rue, code postal, ville"
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses} htmlFor="siret">
          SIRET (14 chiffres)
        </label>
        <input
          id="siret"
          name="siret"
          type="text"
          inputMode="numeric"
          defaultValue={profile?.siret}
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses} htmlFor="legalForm">
          Forme juridique
        </label>
        <input
          id="legalForm"
          name="legalForm"
          type="text"
          defaultValue={profile?.legalForm ?? "Entreprise Individuelle (micro-entreprise)"}
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={profile?.email}
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses} htmlFor="phone">
          Téléphone (optionnel)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={profile?.phone ?? ""}
          className={inputClasses}
        />
      </div>

      <div className="sm:col-span-2">
        <hr className="border-[#eee]" />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="vatExempt"
          name="vatExempt"
          type="checkbox"
          defaultChecked={profile?.vatExempt ?? true}
          className="h-5 w-5 accent-accent"
        />
        <label htmlFor="vatExempt" className="text-sm font-semibold text-primary">
          Franchise en base de TVA (micro-entreprise — cas le plus courant)
        </label>
      </div>

      <div>
        <label className={labelClasses} htmlFor="vatRate">
          Taux de TVA si assujettie (%)
        </label>
        <input
          id="vatRate"
          name="vatRate"
          type="number"
          step="0.1"
          min="0"
          max="100"
          defaultValue={profile?.vatRate ?? 0}
          className={inputClasses}
        />
      </div>

      <div className="sm:col-span-2">
        <label className={labelClasses} htmlFor="iban">
          IBAN (optionnel, affiché sur les factures)
        </label>
        <input
          id="iban"
          name="iban"
          type="text"
          defaultValue={profile?.iban ?? ""}
          className={inputClasses}
        />
      </div>

      <div className="sm:col-span-2">
        <label className={labelClasses} htmlFor="paymentTerms">
          Conditions de paiement (affichées sur les factures)
        </label>
        <textarea
          id="paymentTerms"
          name="paymentTerms"
          rows={3}
          defaultValue={
            profile?.paymentTerms ??
            "Paiement à réception de facture. Moyens acceptés : virement, espèces, chèque."
          }
          className={inputClasses}
        />
      </div>

      {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-accent py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}
