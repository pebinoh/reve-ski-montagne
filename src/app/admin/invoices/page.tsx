import Link from "next/link";
import { prisma } from "@/lib/prisma";
import InvoiceActions from "@/components/admin/InvoiceActions";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  EMISE: "bg-accent/10 text-accent",
  PAYEE: "bg-green-100 text-green-700",
  ANNULEE: "bg-gray-100 text-gray-500",
};

function formatEUR(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string }>;
}) {
  const [invoices, { created }] = await Promise.all([
    prisma.invoice.findMany({ orderBy: { number: "desc" } }),
    searchParams,
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-title text-2xl text-primary">Factures</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/clients"
            className="rounded-full border border-[#ddd] px-5 py-2 text-sm font-semibold text-primary"
          >
            Clients
          </Link>
          <Link
            href="/admin/settings"
            className="rounded-full border border-[#ddd] px-5 py-2 text-sm font-semibold text-primary"
          >
            Réglages
          </Link>
          <Link
            href="/admin/invoices/new"
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white"
          >
            Nouvelle facture
          </Link>
        </div>
      </div>

      {created && (
        <p className="mb-6 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">
          Facture {created} créée.
        </p>
      )}

      {invoices.length === 0 ? (
        <p className="text-center text-[#777]">Aucune facture pour le moment.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#eee] text-xs uppercase tracking-wide text-[#999]">
                <th className="px-4 py-3">N°</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Émise le</th>
                <th className="px-4 py-3">Total TTC</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-[#f3f3f3] align-top last:border-0"
                >
                  <td className="whitespace-nowrap px-4 py-4 font-semibold text-primary">
                    {invoice.number}
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-primary">
                      {invoice.clientName}
                    </div>
                    <div className="text-[#777]">{invoice.clientEmail}</div>
                  </td>
                  <td className="max-w-xs px-4 py-4 text-[#555]">
                    {invoice.description}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-[#777]">
                    {formatDate(invoice.issueDate)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-semibold">
                    {formatEUR(Number(invoice.totalTTC))}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[invoice.status]}`}
                    >
                      {invoice.status}
                    </span>
                    {invoice.sentAt && (
                      <div className="mt-1 text-xs text-[#999]">
                        Envoyée le {formatDate(invoice.sentAt)}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <InvoiceActions
                      invoiceId={invoice.id}
                      status={invoice.status}
                      sent={Boolean(invoice.sentAt)}
                    />
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
