import "server-only";
import { Resend } from "resend";
import type { BusinessProfile, Invoice } from "@prisma/client";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY n'est pas configuré.");
  }
  return new Resend(apiKey);
}

export async function sendInvoiceEmail(
  invoice: Invoice,
  profile: BusinessProfile,
  pdfBuffer: Buffer,
) {
  const resend = getResendClient();
  const from = process.env.RESEND_FROM_EMAIL;

  if (!from) {
    throw new Error("RESEND_FROM_EMAIL n'est pas configuré.");
  }

  const { error } = await resend.emails.send({
    from: `"${profile.legalName.replace(/"/g, "")}" <${from}>`,
    to: invoice.clientEmail,
    replyTo: profile.email,
    subject: `Facture ${invoice.number} — ${profile.legalName}`,
    text: `Bonjour ${invoice.clientName},\n\nVeuillez trouver ci-joint votre facture ${invoice.number}.\n\nMerci de votre confiance,\n${profile.legalName}`,
    attachments: [
      {
        filename: `${invoice.number}.pdf`,
        content: pdfBuffer,
      },
    ],
  });

  if (error) {
    throw new Error(error.message ?? "Échec de l'envoi de l'email.");
  }
}
