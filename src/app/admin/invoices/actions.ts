"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { invoiceSchema } from "@/lib/invoice-schema";
import { nextInvoiceNumber } from "@/lib/invoice-numbering";
import { generateInvoicePdf } from "@/lib/invoice-pdf";
import { sendInvoiceEmail } from "@/lib/email";

export async function createInvoice(_prevState: string | null, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const result = invoiceSchema.safeParse(raw);

  if (!result.success) {
    return result.error.issues[0]?.message ?? "Formulaire invalide.";
  }

  const profile = await prisma.businessProfile.findUnique({
    where: { id: "singleton" },
  });

  if (!profile) {
    return "Merci de renseigner d'abord tes informations légales dans Réglages.";
  }

  const round2 = (value: number) => Math.round(value * 100) / 100;

  const data = result.data;
  const quantity = data.quantity;
  const unitPrice = data.unitPrice;
  const totalHT = round2(quantity * unitPrice);
  const vatRate = profile.vatExempt ? 0 : profile.vatRate;
  const totalTVA = profile.vatExempt ? 0 : round2(totalHT * (vatRate / 100));
  const totalTTC = round2(totalHT + totalTVA);

  const year = new Date().getFullYear();
  const number = await nextInvoiceNumber(year);

  const invoice = await prisma.invoice.create({
    data: {
      number,
      serviceDate: new Date(data.serviceDate),
      dueDate: new Date(data.dueDate),
      clientName: data.clientName,
      clientAddress: data.clientAddress,
      clientEmail: data.clientEmail,
      description: data.description,
      quantity,
      unitPrice,
      vatRate,
      totalHT,
      totalTVA,
      totalTTC,
      paymentTerms: profile.paymentTerms,
      bookingId: data.bookingId || null,
    },
  });

  revalidatePath("/admin/invoices");
  redirect(`/admin/invoices?created=${invoice.number}`);
}

export async function sendInvoice(invoiceId: string) {
  const [invoice, profile] = await Promise.all([
    prisma.invoice.findUniqueOrThrow({ where: { id: invoiceId } }),
    prisma.businessProfile.findUniqueOrThrow({ where: { id: "singleton" } }),
  ]);

  const pdfBuffer = await generateInvoicePdf(invoice, profile);
  await sendInvoiceEmail(invoice, profile, Buffer.from(pdfBuffer));

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { sentAt: new Date() },
  });

  revalidatePath("/admin/invoices");
}

export async function markInvoicePaid(invoiceId: string) {
  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { status: "PAYEE" },
  });
  revalidatePath("/admin/invoices");
}
