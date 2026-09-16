"use client";

import { useActionState } from "react";
import type { Booking } from "@prisma/client";
import { createInvoice } from "@/app/admin/invoices/actions";

const inputClasses =
  "w-full rounded-lg border border-[#ddd] bg-white px-4 py-3 text-[#333] outline-none transition-colors focus:border-accent";
const labelClasses = "mb-2 block text-sm font-semibold text-primary";

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

function defaultDueDate() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return toDateInputValue(date);
}

export default function InvoiceForm({ booking }: { booking: Booking | null }) {
  const [error, formAction, isPending] = useActionState(createInvoice, null);

  return (
    <form
      action={formAction}
      className="grid grid-cols-1 gap-6 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8"
    >
      {booking && <input type="hidden" name="bookingId" value={booking.id} />}

      <div className="sm:col-span-2">
        <h2 className="mb-2 font-title text-lg text-primary">Client</h2>
      </div>

      <div>
        <label className={labelClasses} htmlFor="clientName">
          Nom
        </label>
        <input
          id="clientName"
          name="clientName"
          type="text"
          defaultValue={booking?.name ?? ""}
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses} htmlFor="clientEmail">
          Email
        </label>
        <input
          id="clientEmail"
          name="clientEmail"
          type="email"
          defaultValue={booking?.email ?? ""}
          className={inputClasses}
        />
      </div>

      <div className="sm:col-span-2">
        <label className={labelClasses} htmlFor="clientAddress">
          Adresse
        </label>
        <input
          id="clientAddress"
          name="clientAddress"
          type="text"
          placeholder="Numéro, rue, code postal, ville"
          className={inputClasses}
        />
      </div>

      <div className="sm:col-span-2">
        <hr className="border-[#eee]" />
      </div>

      <div className="sm:col-span-2">
        <h2 className="mb-2 font-title text-lg text-primary">Prestation</h2>
      </div>

      <div className="sm:col-span-2">
        <label className={labelClasses} htmlFor="description">
          Description
        </label>
        <input
          id="description"
          name="description"
          type="text"
          defaultValue={booking ? `${booking.activityType} — ${booking.timeSlot}` : ""}
          placeholder="Ex. Cours particulier de ski — 2h"
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses} htmlFor="serviceDate">
          Date de la prestation
        </label>
        <input
          id="serviceDate"
          name="serviceDate"
          type="date"
          defaultValue={
            booking ? toDateInputValue(booking.preferredDate) : undefined
          }
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses} htmlFor="dueDate">
          Date d&apos;échéance
        </label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          defaultValue={defaultDueDate()}
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses} htmlFor="quantity">
          Quantité
        </label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          step="0.5"
          min="0"
          defaultValue={booking?.groupSize ?? 1}
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses} htmlFor="unitPrice">
          Prix unitaire HT (€)
        </label>
        <input
          id="unitPrice"
          name="unitPrice"
          type="number"
          step="0.01"
          min="0"
          className={inputClasses}
        />
      </div>

      {error && (
        <p className="sm:col-span-2 text-sm text-red-600">{error}</p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-accent py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Création..." : "Créer la facture"}
        </button>
      </div>
    </form>
  );
}
