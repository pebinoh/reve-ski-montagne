import "server-only";
import { prisma } from "@/lib/prisma";

// Crée ou met à jour la fiche client (identifiée par email) à partir de
// n'importe quelle interaction — réservation ou facture. Les champs fournis
// écrasent les précédents ; les champs omis (undefined) sont conservés tels quels.
export async function upsertClient(data: {
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
}) {
  return prisma.client.upsert({
    where: { email: data.email },
    create: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      address: data.address || null,
    },
    update: {
      name: data.name,
      ...(data.phone !== undefined ? { phone: data.phone || null } : {}),
      ...(data.address !== undefined ? { address: data.address || null } : {}),
    },
  });
}
