"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { upsertClient } from "@/lib/client";

const newClientSchema = z.object({
  name: z.string().trim().min(2, "Nom requis.").max(200),
  email: z.string().trim().email("Email invalide."),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  address: z.string().trim().max(500).optional().or(z.literal("")),
});

export async function createClient(
  _prevState: string | null,
  formData: FormData,
) {
  const raw = Object.fromEntries(formData.entries());
  const result = newClientSchema.safeParse(raw);

  if (!result.success) {
    return result.error.issues[0]?.message ?? "Formulaire invalide.";
  }

  const data = result.data;

  await upsertClient({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    address: data.address || null,
  });

  revalidatePath("/admin/clients");
  redirect("/admin/clients");
}
