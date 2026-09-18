"use server";

import { timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createSessionToken, SESSION_COOKIE } from "@/lib/session";
import {
  createCalendarEventForBooking,
  disconnectGoogleAccount,
} from "@/lib/google-calendar";
import { sendBookingConfirmationEmail } from "@/lib/email";

function passwordsMatch(input: string, expected: string) {
  const inputBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);

  if (inputBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(inputBuffer, expectedBuffer);
}

export async function login(_prevState: string | null, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || !passwordsMatch(password, adminPassword)) {
    return "Mot de passe incorrect.";
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function updateBookingStatus(
  bookingId: string,
  status: "NOUVELLE" | "CONFIRMEE" | "ARCHIVEE",
) {
  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });

  let warning: string | null = null;

  if (status === "CONFIRMEE" && !booking.googleEventId) {
    await createCalendarEventForBooking(booking).catch(() => null);
  }

  if (status === "CONFIRMEE" && !booking.confirmationSentAt) {
    try {
      await sendBookingConfirmationEmail(booking);
      await prisma.booking.update({
        where: { id: bookingId },
        data: { confirmationSentAt: new Date() },
      });
    } catch (err) {
      warning = `Statut mis à jour, mais l'email de confirmation n'a pas pu être envoyé : ${
        err instanceof Error ? err.message : "erreur inconnue"
      }`;
    }
  }

  revalidatePath("/admin");
  return warning;
}

export async function resendBookingConfirmation(bookingId: string) {
  const booking = await prisma.booking.findUniqueOrThrow({
    where: { id: bookingId },
  });

  await sendBookingConfirmationEmail(booking);

  await prisma.booking.update({
    where: { id: bookingId },
    data: { confirmationSentAt: new Date() },
  });

  revalidatePath("/admin");
}

export async function createCalendarEventAction(bookingId: string) {
  const booking = await prisma.booking.findUniqueOrThrow({
    where: { id: bookingId },
  });
  await createCalendarEventForBooking(booking);
  revalidatePath("/admin");
}

export async function disconnectGoogleCalendar() {
  await disconnectGoogleAccount();
  revalidatePath("/admin");
}
