import "server-only";
import { Resend } from "resend";
import type { BusinessProfile, Booking, Invoice } from "@prisma/client";
import { generateBookingIcs } from "@/lib/ics";

const SITE_NAME = "R'Eve Ski Montagne";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY n'est pas configuré.");
  }
  return new Resend(apiKey);
}

function requireFromAddress() {
  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) {
    throw new Error("RESEND_FROM_EMAIL n'est pas configuré.");
  }
  return from;
}

function formatDateFr(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export async function sendBookingConfirmationEmail(booking: Booking) {
  const resend = getResendClient();
  const from = requireFromAddress();
  const ics = generateBookingIcs(booking);

  const { error } = await resend.emails.send({
    from: `"${SITE_NAME}" <${from}>`,
    to: booking.email,
    subject: `Réservation confirmée — ${SITE_NAME}`,
    text: `Bonjour ${booking.name},\n\nVotre réservation est confirmée !\n\n${booking.activityType}\n${formatDateFr(booking.preferredDate)} — ${booking.timeSlot}\n${booking.groupSize} personne(s)\n\nVous trouverez ci-joint un fichier à ajouter directement à votre agenda (Google, Apple, Outlook...).\n\nÀ très vite sur les pistes,\nÉvelyne — ${SITE_NAME}`,
    attachments: [
      {
        filename: "reservation.ics",
        content: ics,
      },
    ],
  });

  if (error) {
    throw new Error(error.message ?? "Échec de l'envoi de l'email.");
  }
}

export async function sendInvoiceEmail(
  invoice: Invoice,
  profile: BusinessProfile,
  pdfBuffer: Buffer,
) {
  const resend = getResendClient();
  const from = requireFromAddress();

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
