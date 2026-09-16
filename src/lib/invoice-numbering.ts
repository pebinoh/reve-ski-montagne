import "server-only";
import { prisma } from "@/lib/prisma";

// Numérotation séquentielle, continue et sans trou, remise à zéro chaque
// année civile (pratique courante et conforme). L'incrément atomique évite
// toute collision même en cas d'appels concurrents.
export async function nextInvoiceNumber(year: number): Promise<string> {
  const counter = await prisma.invoiceCounter.upsert({
    where: { year },
    create: { year, lastNumber: 1 },
    update: { lastNumber: { increment: 1 } },
  });

  return `FACT-${year}-${String(counter.lastNumber).padStart(4, "0")}`;
}
