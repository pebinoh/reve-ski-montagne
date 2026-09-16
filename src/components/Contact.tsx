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
            Contactez-moi pour discuter de votre projet ou réserver une
            journée.
          </p>
          <a
            href="mailto:contact@reve-ski.com"
            className="rounded-full border border-accent bg-accent px-10 py-4 text-sm uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Me contacter
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
