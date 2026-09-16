import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateBookingIcs } from "@/lib/ics";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const booking = await prisma.booking.findUnique({ where: { id } });

  if (!booking) {
    return NextResponse.json({ error: "Introuvable." }, { status: 404 });
  }

  const ics = generateBookingIcs(booking);

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="reservation-${booking.id}.ics"`,
    },
  });
}
