"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {
  ACTIVITY_TYPES,
  LEVELS,
  TIME_SLOTS,
  bookingSchema,
  type BookingInput,
} from "@/lib/booking-schema";

const inputClasses =
  "w-full rounded-lg border border-[#ddd] bg-white px-4 py-3 text-[#333] outline-none transition-colors focus:border-accent";
const labelClasses = "mb-2 block text-sm font-semibold text-primary";
const errorClasses = "mt-1 text-sm text-red-600";

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      groupSize: 1,
    },
  });

  const onSubmit = async (data: BookingInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("La demande n'a pas pu être envoyée.");
      }

      setSubmitted(true);
      reset();
    } catch {
      setServerError(
        "Une erreur est survenue. Merci de réessayer ou de me contacter directement par email.",
      );
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex max-w-lg flex-col items-center rounded-2xl bg-white p-10 text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]"
      >
        <CheckCircle2 size={48} className="mb-4 text-accent" />
        <h3 className="mb-3 font-title text-2xl text-primary">
          Demande envoyée !
        </h3>
        <p className="text-[#555]">
          Merci pour votre demande. Évelyne vous recontactera rapidement par
          téléphone ou par email pour confirmer votre créneau.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
        >
          Faire une nouvelle demande
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] sm:p-10"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClasses} htmlFor="activityType">
            Type de sortie
          </label>
          <select
            id="activityType"
            className={inputClasses}
            {...register("activityType")}
            defaultValue=""
          >
            <option value="" disabled>
              Choisissez une activité
            </option>
            {ACTIVITY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.activityType && (
            <p className={errorClasses}>{errors.activityType.message}</p>
          )}
        </div>

        <div>
          <label className={labelClasses} htmlFor="preferredDate">
            Date souhaitée
          </label>
          <input
            id="preferredDate"
            type="date"
            className={inputClasses}
            {...register("preferredDate")}
          />
          {errors.preferredDate && (
            <p className={errorClasses}>{errors.preferredDate.message}</p>
          )}
        </div>

        <div>
          <label className={labelClasses} htmlFor="timeSlot">
            Créneau
          </label>
          <select
            id="timeSlot"
            className={inputClasses}
            {...register("timeSlot")}
            defaultValue=""
          >
            <option value="" disabled>
              Choisissez un créneau
            </option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.timeSlot && (
            <p className={errorClasses}>{errors.timeSlot.message}</p>
          )}
        </div>

        <div>
          <label className={labelClasses} htmlFor="level">
            Niveau
          </label>
          <select
            id="level"
            className={inputClasses}
            {...register("level")}
            defaultValue=""
          >
            <option value="" disabled>
              Choisissez un niveau
            </option>
            {LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.level && (
            <p className={errorClasses}>{errors.level.message}</p>
          )}
        </div>

        <div>
          <label className={labelClasses} htmlFor="groupSize">
            Nombre de personnes
          </label>
          <input
            id="groupSize"
            type="number"
            min={1}
            max={20}
            className={inputClasses}
            {...register("groupSize", { valueAsNumber: true })}
          />
          {errors.groupSize && (
            <p className={errorClasses}>{errors.groupSize.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <hr className="my-2 border-[#eee]" />
        </div>

        <div>
          <label className={labelClasses} htmlFor="name">
            Nom
          </label>
          <input
            id="name"
            type="text"
            className={inputClasses}
            {...register("name")}
          />
          {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
        </div>

        <div>
          <label className={labelClasses} htmlFor="phone">
            Téléphone
          </label>
          <input
            id="phone"
            type="tel"
            className={inputClasses}
            {...register("phone")}
          />
          {errors.phone && (
            <p className={errorClasses}>{errors.phone.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClasses} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={inputClasses}
            {...register("email")}
          />
          {errors.email && (
            <p className={errorClasses}>{errors.email.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClasses} htmlFor="message">
            Informations utiles (optionnel)
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Âge des participants, expérience, contraintes particulières..."
            className={inputClasses}
            {...register("message")}
          />
          {errors.message && (
            <p className={errorClasses}>{errors.message.message}</p>
          )}
        </div>
      </div>

      {serverError && (
        <p className="mt-6 text-center text-sm text-red-600">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 w-full rounded-full bg-accent py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>
    </form>
  );
}
