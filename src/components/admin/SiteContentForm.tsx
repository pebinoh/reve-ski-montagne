"use client";

import { useActionState } from "react";
import type { SiteContent } from "@prisma/client";
import { saveSiteContent } from "@/app/admin/content/actions";
import ImageUploadField from "./ImageUploadField";

const inputClasses =
  "w-full rounded-lg border border-[#ddd] bg-white px-4 py-3 text-[#333] outline-none transition-colors focus:border-accent";
const labelClasses = "mb-2 block text-sm font-semibold text-primary";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 font-title text-xl italic text-primary">{title}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Field({
  name,
  label,
  defaultValue,
  span = 1,
  textarea = false,
  type = "text",
}: {
  name: string;
  label: string;
  defaultValue: string;
  span?: 1 | 2;
  textarea?: boolean;
  type?: string;
}) {
  return (
    <div className={span === 2 ? "sm:col-span-2" : undefined}>
      <label className={labelClasses} htmlFor={name}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          rows={4}
          className={inputClasses}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue}
          className={inputClasses}
        />
      )}
    </div>
  );
}

export default function SiteContentForm({
  content,
}: {
  content: SiteContent;
}) {
  const [error, formAction, isPending] = useActionState(
    saveSiteContent,
    null,
  );

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <Section title="Accueil (hero)">
        <Field name="heroLabel" label="Petit texte au-dessus du titre" defaultValue={content.heroLabel} />
        <Field name="heroTitle" label="Titre principal" defaultValue={content.heroTitle} textarea span={2} />
        <ImageUploadField name="heroImageDesktop" label="Photo de fond (ordinateur)" defaultValue={content.heroImageDesktop} />
        <ImageUploadField name="heroImageMobile" label="Photo de fond (téléphone)" defaultValue={content.heroImageMobile} />
      </Section>

      <Section title="L'esprit de la montagne">
        <Field name="philosophyLabel" label="Petit texte au-dessus" defaultValue={content.philosophyLabel} />
        <Field name="philosophyTitle" label="Phrase d'accroche" defaultValue={content.philosophyTitle} />
        <Field name="philosophyText" label="Paragraphe" defaultValue={content.philosophyText} textarea span={2} />
      </Section>

      <Section title="Qui suis-je">
        <Field name="presentationTitle" label="Titre" defaultValue={content.presentationTitle} span={2} />
        <Field
          name="presentationText"
          label="Texte (laisser une ligne vide entre les paragraphes)"
          defaultValue={content.presentationText}
          textarea
          span={2}
        />
        <Field
          name="presentationBadges"
          label="Badges (séparés par des virgules)"
          defaultValue={content.presentationBadges}
          span={2}
        />
        <ImageUploadField name="presentationImage" label="Portrait" defaultValue={content.presentationImage} />
      </Section>

      <Section title="Activités">
        <Field name="activity1Title" label="Activité 1 — titre" defaultValue={content.activity1Title} />
        <ImageUploadField name="activity1Image" label="Activité 1 — photo" defaultValue={content.activity1Image} />
        <Field name="activity1Text" label="Activité 1 — description" defaultValue={content.activity1Text} textarea span={2} />

        <Field name="activity2Title" label="Activité 2 — titre" defaultValue={content.activity2Title} />
        <ImageUploadField name="activity2Image" label="Activité 2 — photo" defaultValue={content.activity2Image} />
        <Field name="activity2Text" label="Activité 2 — description" defaultValue={content.activity2Text} textarea span={2} />

        <Field name="activity3Title" label="Activité 3 — titre" defaultValue={content.activity3Title} />
        <ImageUploadField name="activity3Image" label="Activité 3 — photo" defaultValue={content.activity3Image} />
        <Field name="activity3Text" label="Activité 3 — description" defaultValue={content.activity3Text} textarea span={2} />
      </Section>

      <Section title="Citation (bandeau paysage)">
        <Field name="separatorQuote" label="Citation" defaultValue={content.separatorQuote} span={2} />
        <ImageUploadField name="separatorImageDesktop" label="Photo de fond (ordinateur)" defaultValue={content.separatorImageDesktop} />
        <ImageUploadField name="separatorImageMobile" label="Photo de fond (téléphone)" defaultValue={content.separatorImageMobile} />
      </Section>

      <Section title="Instagram">
        <Field name="instagramReel1" label="Lien du post 1" defaultValue={content.instagramReel1} span={2} />
        <Field name="instagramReel2" label="Lien du post 2" defaultValue={content.instagramReel2} span={2} />
        <Field name="instagramReel3" label="Lien du post 3" defaultValue={content.instagramReel3} span={2} />
        <Field name="instagramProfileUrl" label="Lien vers ton profil" defaultValue={content.instagramProfileUrl} />
        <Field name="instagramHandle" label="Pseudo affiché (ex. @reve_ski_montagne)" defaultValue={content.instagramHandle} />
      </Section>

      <Section title="Contact & pied de page">
        <Field name="contactText" label="Texte de la section contact" defaultValue={content.contactText} textarea span={2} />
        <Field name="contactEmail" label="Email" defaultValue={content.contactEmail} type="email" />
        <Field name="contactPhone" label="Téléphone" defaultValue={content.contactPhone} />
        <Field name="contactAddress" label="Adresse" defaultValue={content.contactAddress} span={2} />
        <Field name="footerText" label="Texte de présentation (pied de page)" defaultValue={content.footerText} textarea span={2} />
      </Section>

      {error && (
        <p className="rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="sticky bottom-4 rounded-full bg-accent py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Enregistrement..." : "Enregistrer les modifications"}
      </button>
    </form>
  );
}
