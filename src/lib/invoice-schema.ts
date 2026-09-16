import { z } from "zod";

export const invoiceSchema = z.object({
  bookingId: z.string().optional().or(z.literal("")),
  clientName: z.string().trim().min(2, "Nom requis.").max(200),
  clientAddress: z.string().trim().min(3, "Adresse requise.").max(500),
  clientEmail: z.string().trim().email("Email invalide."),

  description: z
    .string()
    .trim()
    .min(3, "Description de la prestation requise.")
    .max(500),
  serviceDate: z
    .string()
    .min(1, "Date de la prestation requise.")
    .refine((val) => !Number.isNaN(Date.parse(val)), "Date invalide."),
  quantity: z.coerce.number().positive("Doit être positif.").max(1000),
  unitPrice: z.coerce
    .number()
    .positive("Doit être positif.")
    .max(100_000, "Montant trop élevé."),

  dueDate: z
    .string()
    .min(1, "Date d'échéance requise.")
    .refine((val) => !Number.isNaN(Date.parse(val)), "Date invalide."),
});

export type InvoiceInput = z.infer<typeof invoiceSchema>;
