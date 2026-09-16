"use client";

import { useState, useTransition } from "react";
import { sendInvoice, markInvoicePaid } from "@/app/admin/invoices/actions";

export default function InvoiceActions({
  invoiceId,
  status,
  sent,
}: {
  invoiceId: string;
  status: string;
  sent: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-start gap-1">
      <a
        href={`/admin/invoices/${invoiceId}/pdf`}
        className="text-xs font-semibold text-primary hover:underline"
      >
        Télécharger le PDF
      </a>
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          setError(null);
          startTransition(async () => {
            try {
              await sendInvoice(invoiceId);
            } catch {
              setError("Échec de l'envoi (vérifier la config email).");
            }
          });
        }}
        className="text-xs font-semibold text-accent hover:underline disabled:opacity-50"
      >
        {isPending ? "..." : sent ? "Renvoyer par email" : "Envoyer par email"}
      </button>
      {status === "EMISE" && (
        <button
          type="button"
          disabled={isPending}
          onClick={() => startTransition(() => markInvoicePaid(invoiceId))}
          className="text-xs font-semibold text-green-700 hover:underline disabled:opacity-50"
        >
          Marquer payée
        </button>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
