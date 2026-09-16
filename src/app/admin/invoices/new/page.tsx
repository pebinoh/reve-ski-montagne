import Link from "next/link";
import { prisma } from "@/lib/prisma";
import InvoiceForm from "@/components/admin/InvoiceForm";

export default async function NewInvoicePage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string; clientId?: string }>;
}) {
  const { bookingId, clientId } = await searchParams;

  const [profile, bookings, clients, selectedBooking, selectedClient] =
    await Promise.all([
      prisma.businessProfile.findUnique({ where: { id: "singleton" } }),
      prisma.booking.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
      prisma.client.findMany({
        orderBy: { updatedAt: "desc" },
        take: 100,
      }),
      bookingId
        ? prisma.booking.findUnique({ where: { id: bookingId } })
        : Promise.resolve(null),
      clientId
        ? prisma.client.findUnique({ where: { id: clientId } })
        : Promise.resolve(null),
    ]);

  if (!profile) {
    return (
      <main className="mx-auto max-w-xl px-6 py-16 text-center">
        <p className="mb-4 text-primary">
          Avant de créer une facture, renseigne tes informations légales
          (nom, adresse, SIRET...).
        </p>
        <Link
          href="/admin/settings"
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white"
        >
          Aller aux réglages
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-title text-2xl text-primary">Nouvelle facture</h1>
        <Link href="/admin/invoices" className="text-sm text-[#777] hover:underline">
          ← Retour aux factures
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {clients.length > 0 && (
          <form
            method="get"
            className="flex flex-col gap-3 rounded-xl bg-white p-5 shadow-sm"
          >
            <label className="text-sm font-semibold text-primary">
              Client déjà enregistré
            </label>
            <select
              name="clientId"
              defaultValue={clientId ?? ""}
              className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-accent"
            >
              <option value="">— Choisir —</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.email})
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white"
            >
              Charger ce client
            </button>
          </form>
        )}

        {bookings.length > 0 && (
          <form
            method="get"
            className="flex flex-col gap-3 rounded-xl bg-white p-5 shadow-sm"
          >
            <label className="text-sm font-semibold text-primary">
              Depuis une réservation récente
            </label>
            <select
              name="bookingId"
              defaultValue={bookingId ?? ""}
              className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-accent"
            >
              <option value="">— Choisir —</option>
              {bookings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} — {b.activityType} (
                  {new Intl.DateTimeFormat("fr-FR").format(b.preferredDate)})
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white"
            >
              Charger cette réservation
            </button>
          </form>
        )}
      </div>

      <InvoiceForm booking={selectedBooking} client={selectedClient} />
    </main>
  );
}
