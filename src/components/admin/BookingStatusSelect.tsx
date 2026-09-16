"use client";

import { useTransition } from "react";
import { updateBookingStatus } from "@/app/admin/actions";

const STATUS_LABELS: Record<string, string> = {
  NOUVELLE: "Nouvelle",
  CONFIRMEE: "Confirmée",
  ARCHIVEE: "Archivée",
};

export default function BookingStatusSelect({
  bookingId,
  status,
}: {
  bookingId: string;
  status: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as "NOUVELLE" | "CONFIRMEE" | "ARCHIVEE";
        startTransition(() => {
          updateBookingStatus(bookingId, next);
        });
      }}
      className="rounded-md border border-[#ddd] bg-white px-3 py-1.5 text-sm text-primary outline-none focus:border-accent disabled:opacity-50"
    >
      {Object.entries(STATUS_LABELS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
