import Link from "next/link";
import FadeIn from "./FadeIn";

export default function Contact() {
  return (
    <section id="contact" className="bg-light py-24 text-center">
      <div className="mx-auto max-w-[1100px] px-5">
        <FadeIn>
          <h2 className="mb-4 font-title text-3xl text-primary md:text-4xl">
            Prêt à chausser les skis ?
          </h2>
          <p className="mb-8 text-[#555]">
            Faites votre demande de réservation ou contactez-moi directement
            pour discuter de votre projet.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/reservation"
              className="rounded-full border border-accent bg-accent px-10 py-4 text-sm uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Réserver une sortie
            </Link>
            <a
              href="mailto:contact@reve-ski.com"
              className="rounded-full border border-primary px-10 py-4 text-sm uppercase tracking-wider text-primary transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-white"
            >
              Me contacter
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
