import "server-only";
import { google } from "googleapis";
import type { Booking } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];

function getOAuthClient(redirectUri: string) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET ne sont pas configurés.",
    );
  }

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

export function getGoogleAuthUrl(redirectUri: string) {
  const client = getOAuthClient(redirectUri);
  return client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  });
}

export async function connectGoogleAccount(code: string, redirectUri: string) {
  const client = getOAuthClient(redirectUri);
  const { tokens } = await client.getToken(code);

  if (!tokens.refresh_token) {
    throw new Error(
      "Aucun refresh token reçu. Révoquez l'accès existant dans votre compte Google puis réessayez.",
    );
  }

  client.setCredentials(tokens);
  const oauth2 = google.oauth2({ auth: client, version: "v2" });
  const { data } = await oauth2.userinfo.get();

  await prisma.calendarConnection.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      email: data.email ?? null,
      refreshToken: tokens.refresh_token,
    },
    update: {
      email: data.email ?? null,
      refreshToken: tokens.refresh_token,
    },
  });
}

export async function disconnectGoogleAccount() {
  await prisma.calendarConnection.deleteMany({ where: { id: "singleton" } });
}

export async function getCalendarConnection() {
  return prisma.calendarConnection.findUnique({ where: { id: "singleton" } });
}

async function getAuthorizedClient() {
  const connection = await getCalendarConnection();
  if (!connection) return null;

  // Le redirect URI n'est utilisé que lors de l'échange initial du code
  // d'autorisation ; il n'est pas nécessaire pour rafraîchir un access token.
  const client = getOAuthClient("");
  client.setCredentials({ refresh_token: connection.refreshToken });
  return client;
}

function eventTimeRange(booking: Booking) {
  const start = new Date(booking.preferredDate);
  const durationHours = booking.timeSlot === "Journée complète" ? 7 : 3.5;

  // Créneaux indicatifs : matin 9h, après-midi 13h30, journée 9h.
  if (booking.timeSlot === "Après-midi") {
    start.setHours(13, 30, 0, 0);
  } else {
    start.setHours(9, 0, 0, 0);
  }

  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);
  return { start, end };
}

export function buildEventContent(booking: Booking) {
  const { start, end } = eventTimeRange(booking);
  const summary = `${booking.activityType} — ${booking.name}`;
  const description = [
    `Client : ${booking.name} (${booking.phone}, ${booking.email})`,
    `Niveau : ${booking.level}`,
    `Groupe : ${booking.groupSize} personne(s)`,
    booking.message ? `Message : ${booking.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return { start, end, summary, description };
}

export async function createCalendarEventForBooking(booking: Booking) {
  const client = await getAuthorizedClient();
  if (!client) {
    throw new Error("Google Calendar n'est pas connecté.");
  }

  const calendar = google.calendar({ version: "v3", auth: client });
  const { start, end, summary, description } = buildEventContent(booking);

  const { data } = await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary,
      description,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
      attendees: [{ email: booking.email, displayName: booking.name }],
    },
  });

  await prisma.booking.update({
    where: { id: booking.id },
    data: { googleEventId: data.id ?? null },
  });

  return data.id ?? null;
}

export async function deleteCalendarEventForBooking(booking: Booking) {
  if (!booking.googleEventId) return;

  const client = await getAuthorizedClient();
  if (!client) return;

  const calendar = google.calendar({ version: "v3", auth: client });
  await calendar.events
    .delete({ calendarId: "primary", eventId: booking.googleEventId })
    .catch(() => null);

  await prisma.booking.update({
    where: { id: booking.id },
    data: { googleEventId: null },
  });
}
