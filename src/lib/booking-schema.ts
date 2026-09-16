import { z } from "zod";

export const ACTIVITY_TYPES = [
  "Freeride & Hors-piste",
  "Ski de randonnée",
  "Séjour en itinérance",
  "Cours particulier",
  "Autre",
] as const;

export const TIME_SLOTS = ["Matin", "Après-midi", "Journée complète"] as const;

export const LEVELS = [
  "Débutant",
  "Intermédiaire",
  "Avancé",
  "Expert",
] as const;

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Merci d'indiquer votre nom.").max(100),
  email: z.string().trim().email("Adresse email invalide."),
  phone: z
    .string()
    .trim()
    .min(6, "Merci d'indiquer un numéro de téléphone.")
    .max(20),
  activityType: z.enum(ACTIVITY_TYPES, {
    message: "Merci de choisir un type de sortie.",
  }),
  preferredDate: z
    .string()
    .min(1, "Merci d'indiquer une date souhaitée.")
    .refine((val) => !Number.isNaN(Date.parse(val)), "Date invalide."),
  timeSlot: z.enum(TIME_SLOTS, {
    message: "Merci de choisir un créneau.",
  }),
  groupSize: z
    .number()
    .int()
    .min(1, "Au moins 1 personne.")
    .max(20, "Pour les groupes de plus de 20 personnes, contactez-moi directement."),
  level: z.enum(LEVELS, {
    message: "Merci d'indiquer le niveau.",
  }),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;
