"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const profileSchema = z.object({
  legalName: z.string().trim().min(2).max(200),
  address: z.string().trim().min(3).max(500),
  siret: z
    .string()
    .trim()
    .regex(/^\d{14}$/, "Le SIRET doit contenir 14 chiffres."),
  legalForm: z.string().trim().min(2).max(200),
  email: z.string().trim().email(),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  vatExempt: z.enum(["on"]).optional(),
  vatRate: z.coerce.number().min(0).max(100).optional().default(0),
  iban: z.string().trim().max(50).optional().or(z.literal("")),
  paymentTerms: z.string().trim().min(3).max(1000),
});

export async function saveBusinessProfile(
  _prevState: string | null,
  formData: FormData,
) {
  const raw = Object.fromEntries(formData.entries());
  const result = profileSchema.safeParse(raw);

  if (!result.success) {
    return result.error.issues[0]?.message ?? "Formulaire invalide.";
  }

  const data = result.data;

  await prisma.businessProfile.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      legalName: data.legalName,
      address: data.address,
      siret: data.siret,
      legalForm: data.legalForm,
      email: data.email,
      phone: data.phone || null,
      vatExempt: data.vatExempt === "on",
      vatRate: data.vatRate ?? 0,
      iban: data.iban || null,
      paymentTerms: data.paymentTerms,
    },
    update: {
      legalName: data.legalName,
      address: data.address,
      siret: data.siret,
      legalForm: data.legalForm,
      email: data.email,
      phone: data.phone || null,
      vatExempt: data.vatExempt === "on",
      vatRate: data.vatRate ?? 0,
      iban: data.iban || null,
      paymentTerms: data.paymentTerms,
    },
  });

  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=1");
}
