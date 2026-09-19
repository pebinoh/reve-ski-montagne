import "server-only";
import { prisma } from "@/lib/prisma";

export async function getSiteContent() {
  const existing = await prisma.siteContent.findUnique({
    where: { id: "singleton" },
  });

  if (existing) return existing;

  return prisma.siteContent.create({ data: { id: "singleton" } });
}
