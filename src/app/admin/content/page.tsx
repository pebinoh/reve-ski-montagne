import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";
import SiteContentForm from "@/components/admin/SiteContentForm";

export const dynamic = "force-dynamic";

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [content, { saved }] = await Promise.all([
    getSiteContent(),
    searchParams,
  ]);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-title text-2xl text-primary">
          Contenu du site
        </h1>
        <Link href="/admin" className="text-sm text-[#777] hover:underline">
          ← Retour au tableau de bord
        </Link>
      </div>

      <p className="mb-6 text-sm text-[#777]">
        Modifie les textes et les photos du site public. Les changements
        sont visibles en ligne dès l&apos;enregistrement.
      </p>

      {saved && (
        <p className="mb-6 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">
          Contenu mis à jour.
        </p>
      )}

      <SiteContentForm content={content} />
    </main>
  );
}
