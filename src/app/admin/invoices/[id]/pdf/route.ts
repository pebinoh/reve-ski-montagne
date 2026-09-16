import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateInvoicePdf } from "@/lib/invoice-pdf";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const [invoice, profile] = await Promise.all([
    prisma.invoice.findUnique({ where: { id } }),
    prisma.businessProfile.findUnique({ where: { id: "singleton" } }),
  ]);

  if (!invoice || !profile) {
    return NextResponse.json({ error: "Introuvable." }, { status: 404 });
  }

  const pdf = await generateInvoicePdf(invoice, profile);

  return new NextResponse(pdf as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${invoice.number}.pdf"`,
    },
  });
}
