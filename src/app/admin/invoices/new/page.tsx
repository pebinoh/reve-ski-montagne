import Link from "next/link";
import { prisma } from "@/lib/prisma";
import InvoiceForm from "@/components/admin/InvoiceForm";

export default async function NewInvoicePage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string }>;
}) {
  const { bookingId } = await searchParams;

  const [profile, bookings, selectedBooking] = await Promise.all([
    prisma.businessProfile.findUnique({ where: { id: "singleton" } }),
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    bookingId
      ? prisma.booking.findUnique({ where: { id: bookingId } })
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

      {bookings.length > 0 && (
        <form
          method="get"
          className="mb-8 flex flex-col gap-3 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-end"
        >
          <div className="flex-1">
            <label className="mb-1 block text-sm font-semibold text-primary">
              Pré-remplir depuis une fiche client
            </label>
            <select
              name="bookingId"
              defaultValue={bookingId ?? ""}
              className="w-full rounded-lg border border-[#ddd] px-3 py-2 text-sm outline-none focus:border-accent"
            >
              <option value="">— Facture libre —</option>
              {bookings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} — {b.activityType} (
                  {new Intl.DateTimeFormat("fr-FR").format(b.preferredDate)})
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white"
          >
            Charger
          </button>
        </form>
      )}

      <InvoiceForm booking={selectedBooking} />
    </main>
  );
}
