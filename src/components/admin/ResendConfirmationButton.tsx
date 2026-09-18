"use client";

import { useState, useTransition } from "react";
import { resendBookingConfirmation } from "@/app/admin/actions";

export default function ResendConfirmationButton({
  bookingId,
}: {
  bookingId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          setError(null);
          startTransition(async () => {
            try {
              await resendBookingConfirmation(bookingId);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Échec de l'envoi.");
            }
          });
        }}
        className="text-xs font-semibold text-accent hover:underline disabled:opacity-50"
      >
        {isPending ? "..." : "Renvoyer l'email"}
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
