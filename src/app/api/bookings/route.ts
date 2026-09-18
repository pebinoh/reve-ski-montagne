import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/booking-schema";
import { upsertClient } from "@/lib/client";
import { sendPushToAll } from "@/lib/push";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json(
      { error: "Requête invalide." },
      { status: 400 },
    );
  }

  const result = bookingSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Formulaire invalide.", issues: result.error.flatten() },
      { status: 422 },
    );
  }

  const data = result.data;

  const client = await upsertClient({
    name: data.name,
    email: data.email,
    phone: data.phone,
  });

  const booking = await prisma.booking.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      activityType: data.activityType,
      preferredDate: new Date(data.preferredDate),
      timeSlot: data.timeSlot,
      groupSize: data.groupSize,
      level: data.level,
      message: data.message || null,
      clientId: client.id,
    },
  });

  await sendPushToAll({
    title: "Nouvelle demande de réservation",
    body: `${data.name} — ${data.activityType}`,
    url: "/admin",
  }).catch((err) => {
    console.error("Échec de l'envoi de la notification push :", err);
  });

  return NextResponse.json({ id: booking.id }, { status: 201 });
}
