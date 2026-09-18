import Link from "next/link";
import { CalendarCheck2, CalendarPlus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCalendarConnection } from "@/lib/google-calendar";
import { logout, disconnectGoogleCalendar } from "./actions";
import BookingStatusSelect from "@/components/admin/BookingStatusSelect";
import CreateEventButton from "@/components/admin/CreateEventButton";
import ResendConfirmationButton from "@/components/admin/ResendConfirmationButton";
import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  NOUVELLE: "bg-accent/10 text-accent",
  CONFIRMEE: "bg-green-100 text-green-700",
  ARCHIVEE: "bg-gray-100 text-gray-500",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ calendarConnected?: string; calendarError?: string }>;
}) {
  const [bookings, calendarConnection, params] = await Promise.all([
    prisma.booking.findMany({ orderBy: { createdAt: "desc" } }),
    getCalendarConnection(),
    searchParams,
  ]);

  return (
    <main className="min-h-screen bg-light">
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Logo />
          <h1 className="hidden font-title text-lg italic text-primary sm:block">
            Réservations
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/admin/clients"
            className="text-sm font-semibold text-[#666] hover:text-primary"
          >
            Clients
          </Link>
          <Link
            href="/admin/invoices"
            className="text-sm font-semibold text-[#666] hover:text-primary"
          >
            Factures
          </Link>
          <Link
            href="/admin/settings"
            className="text-sm font-semibold text-[#666] hover:text-primary"
          >
            Réglages
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm font-semibold text-[#666] hover:text-primary"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {params.calendarConnected && (
          <p className="mb-6 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">
            Google Calendar connecté avec succès.
          </p>
        )}
        {params.calendarError && (
          <p className="mb-6 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
            {params.calendarError}
          </p>
        )}

        <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            {calendarConnection ? (
              <CalendarCheck2 className="text-green-600" size={22} />
            ) : (
              <CalendarPlus className="text-[#999]" size={22} />
            )}
            <div>
              <p className="font-semibold text-primary">
                {calendarConnection
                  ? "Google Calendar connecté"
                  : "Google Calendar non connecté"}
              </p>
              {calendarConnection?.email && (
                <p className="text-sm text-[#777]">{calendarConnection.email}</p>
              )}
            </div>
          </div>

          {calendarConnection ? (
            <form action={disconnectGoogleCalendar}>
              <button
                type="submit"
                className="text-sm font-semibold text-red-600 hover:underline"
              >
                Déconnecter
              </button>
            </form>
          ) : (
            <Link
              href="/admin/google/connect"
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Connecter Google Calendar
            </Link>
          )}
        </div>

        {bookings.length === 0 ? (
          <p className="text-center text-[#777]">
            Aucune demande de réservation pour le moment.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#eee] text-xs uppercase tracking-wide text-[#999]">
                  <th className="px-4 py-3">Reçue le</th>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Activité</th>
                  <th className="px-4 py-3">Date souhaitée</th>
                  <th className="px-4 py-3">Groupe</th>
                  <th className="px-4 py-3">Niveau</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Calendrier</th>
                  <th className="px-4 py-3">Facture</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-[#f3f3f3] align-top last:border-0"
                  >
                    <td className="whitespace-nowrap px-4 py-4 text-[#777]">
                      {formatDate(booking.createdAt)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-primary">
                        {booking.name}
                      </div>
                      <div className="text-[#777]">{booking.phone}</div>
                      <a
                        href={`mailto:${booking.email}`}
                        className="text-accent hover:underline"
                      >
                        {booking.email}
                      </a>
                    </td>
                    <td className="px-4 py-4">{booking.activityType}</td>
                    <td className="whitespace-nowrap px-4 py-4">
                      {formatDate(booking.preferredDate)}
                      <div className="text-[#777]">{booking.timeSlot}</div>
                    </td>
                    <td className="px-4 py-4">{booking.groupSize} pers.</td>
                    <td className="px-4 py-4">{booking.level}</td>
                    <td className="max-w-xs px-4 py-4 text-[#555]">
                      {booking.message || "—"}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[booking.status]}`}
                      >
                        {booking.status}
                      </span>
                      <BookingStatusSelect
                        bookingId={booking.id}
                        status={booking.status}
                      />
                      {booking.status === "CONFIRMEE" && (
                        <div className="mt-2">
                          {booking.confirmationSentAt ? (
                            <p className="text-xs text-[#999]">
                              Email envoyé le {formatDate(booking.confirmationSentAt)}
                            </p>
                          ) : null}
                          <ResendConfirmationButton bookingId={booking.id} />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col items-start gap-2">
                        {booking.googleEventId ? (
                          <span className="text-xs font-semibold text-green-700">
                            Ajouté ✓
                          </span>
                        ) : calendarConnection ? (
                          <CreateEventButton bookingId={booking.id} />
                        ) : (
                          <span className="text-xs text-[#999]">—</span>
                        )}
                        <a
                          href={`/admin/bookings/${booking.id}/ics`}
                          className="text-xs font-semibold text-primary hover:underline"
                        >
                          Télécharger .ics
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        href={`/admin/invoices/new?bookingId=${booking.id}`}
                        className="text-xs font-semibold text-accent hover:underline"
                      >
                        Créer une facture
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
