"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const contentSchema = z.object({
  heroLabel: z.string().trim().min(1).max(200),
  heroTitle: z.string().trim().min(1).max(300),
  heroImageDesktop: z.string().trim().min(1),
  heroImageMobile: z.string().trim().min(1),

  philosophyLabel: z.string().trim().min(1).max(200),
  philosophyTitle: z.string().trim().min(1).max(300),
  philosophyText: z.string().trim().min(1).max(2000),

  presentationTitle: z.string().trim().min(1).max(300),
  presentationText: z.string().trim().min(1).max(4000),
  presentationImage: z.string().trim().min(1),
  presentationBadges: z.string().trim().max(300).optional().or(z.literal("")),

  activity1Title: z.string().trim().min(1).max(200),
  activity1Text: z.string().trim().min(1).max(1000),
  activity1Image: z.string().trim().min(1),
  activity2Title: z.string().trim().min(1).max(200),
  activity2Text: z.string().trim().min(1).max(1000),
  activity2Image: z.string().trim().min(1),
  activity3Title: z.string().trim().min(1).max(200),
  activity3Text: z.string().trim().min(1).max(1000),
  activity3Image: z.string().trim().min(1),

  separatorQuote: z.string().trim().min(1).max(300),
  separatorImageDesktop: z.string().trim().min(1),
  separatorImageMobile: z.string().trim().min(1),

  instagramReel1: z.string().trim().url(),
  instagramReel2: z.string().trim().url(),
  instagramReel3: z.string().trim().url(),
  instagramProfileUrl: z.string().trim().url(),
  instagramHandle: z.string().trim().min(1).max(100),

  contactText: z.string().trim().min(1).max(2000),
  contactEmail: z.string().trim().email(),
  contactPhone: z.string().trim().min(1).max(50),
  contactAddress: z.string().trim().min(1).max(200),

  footerText: z.string().trim().min(1).max(2000),
});

export async function saveSiteContent(
  _prevState: string | null,
  formData: FormData,
) {
  const raw = Object.fromEntries(formData.entries());
  const result = contentSchema.safeParse(raw);

  if (!result.success) {
    return result.error.issues[0]?.message ?? "Formulaire invalide.";
  }

  const data = result.data;

  await prisma.siteContent.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...data },
    update: data,
  });

  revalidatePath("/");
  revalidatePath("/reservation");
  revalidatePath("/admin/content");
  redirect("/admin/content?saved=1");
}
