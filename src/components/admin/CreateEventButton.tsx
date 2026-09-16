"use client";

import { useTransition } from "react";
import { createCalendarEventAction } from "@/app/admin/actions";

export default function CreateEventButton({
  bookingId,
}: {
  bookingId: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => createCalendarEventAction(bookingId))}
      className="text-xs font-semibold text-accent hover:underline disabled:opacity-50"
    >
      {isPending ? "Création..." : "Ajouter au calendrier"}
    </button>
  );
}
