import "server-only";
import { createEvent } from "ics";
import type { Booking } from "@prisma/client";
import { buildEventContent } from "./google-calendar";

function toDateArray(
  date: Date,
): [number, number, number, number, number] {
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ];
}

export function generateBookingIcs(booking: Booking) {
  const { start, end, summary, description } = buildEventContent(booking);
  const durationMs = end.getTime() - start.getTime();

  const { error, value } = createEvent({
    start: toDateArray(start),
    duration: {
      hours: Math.floor(durationMs / 3_600_000),
      minutes: Math.round((durationMs % 3_600_000) / 60_000),
    },
    title: summary,
    description,
    location: "Sainte-Foy-Tarentaise",
    organizer: { name: "R'Eve Ski Montagne", email: "contact@reve-ski.com" },
    attendees: [{ name: booking.name, email: booking.email }],
  });

  if (error || !value) {
    throw error ?? new Error("Impossible de générer le fichier .ics");
  }

  return value;
}
