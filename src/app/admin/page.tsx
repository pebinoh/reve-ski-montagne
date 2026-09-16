import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { logout } from "./actions";
import BookingStatusSelect from "@/components/admin/BookingStatusSelect";

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

export default async function AdminDashboardPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-light">
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo_reve.png"
            alt="Logo R'Eve Ski Montagne"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
          <h1 className="font-title text-lg text-primary">
            Fiches clients — R&apos;Eve Ski Montagne
          </h1>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm font-semibold text-[#666] hover:text-primary"
          >
            Déconnexion
          </button>
        </form>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {bookings.length === 0 ? (
          <p className="text-center text-[#777]">
            Aucune demande de réservation pour le moment.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full min-w-[900px] text-left text-sm">
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
