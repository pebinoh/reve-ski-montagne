import Link from "next/link";
import FadeIn from "./FadeIn";

export default function Contact({
  text,
  email,
}: {
  text: string;
  email: string;
}) {
  return (
    <section id="contact" className="bg-ink px-6 py-28 text-center text-cream md:px-12 md:py-36">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-accent-soft">
            Envie de partir ?
          </p>
          <h2 className="mb-8 font-title text-4xl leading-tight font-light italic md:text-5xl">
            Prêt à chausser les skis ?
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-base leading-relaxed text-cream/65">
            {text}
          </p>
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/reservation"
              className="rounded-full bg-cream px-9 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Réserver une sortie
            </Link>
            <a
              href={`mailto:${email}`}
              className="rounded-full border border-cream/30 px-9 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-cream"
            >
              Me contacter
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
