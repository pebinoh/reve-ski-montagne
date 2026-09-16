import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BusinessProfileForm from "@/components/admin/BusinessProfileForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [profile, { saved }] = await Promise.all([
    prisma.businessProfile.findUnique({ where: { id: "singleton" } }),
    searchParams,
  ]);

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-title text-2xl text-primary">
          Réglages — Informations légales
        </h1>
        <Link href="/admin/invoices" className="text-sm text-[#777] hover:underline">
          ← Retour aux factures
        </Link>
      </div>

      <p className="mb-6 text-sm text-[#777]">
        Ces informations apparaissent sur toutes tes factures. À renseigner
        une fois, modifiable à tout moment.
      </p>

      {saved && (
        <p className="mb-6 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">
          Informations enregistrées.
        </p>
      )}

      <BusinessProfileForm profile={profile} />
    </main>
  );
}
