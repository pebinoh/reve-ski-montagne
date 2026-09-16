import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { bookings: true, invoices: true } },
    },
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-title text-2xl text-primary">Clients</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/invoices"
            className="rounded-full border border-[#ddd] px-5 py-2 text-sm font-semibold text-primary"
          >
            Factures
          </Link>
          <Link
            href="/admin"
            className="rounded-full border border-[#ddd] px-5 py-2 text-sm font-semibold text-primary"
          >
            Réservations
          </Link>
        </div>
      </div>

      {clients.length === 0 ? (
        <p className="text-center text-[#777]">
          Aucun client pour le moment — ils apparaîtront ici automatiquement
          dès qu&apos;une réservation ou une facture est créée.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#eee] text-xs uppercase tracking-wide text-[#999]">
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Adresse</th>
                <th className="px-4 py-3">Vu la dernière fois</th>
                <th className="px-4 py-3">Historique</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b border-[#f3f3f3] align-top last:border-0"
                >
                  <td className="px-4 py-4">
                    <div className="font-semibold text-primary">
                      {client.name}
                    </div>
                    <div className="text-[#777]">{client.phone || "—"}</div>
                    <a
                      href={`mailto:${client.email}`}
                      className="text-accent hover:underline"
                    >
                      {client.email}
                    </a>
                  </td>
                  <td className="max-w-xs px-4 py-4 text-[#555]">
                    {client.address || "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-[#777]">
                    {formatDate(client.updatedAt)}
                  </td>
                  <td className="px-4 py-4 text-[#555]">
                    {client._count.bookings} réservation(s)
                    <br />
                    {client._count.invoices} facture(s)
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      href={`/admin/invoices/new?clientId=${client.id}`}
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
    </main>
  );
}
