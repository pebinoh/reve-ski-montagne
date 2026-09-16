import FadeIn from "./FadeIn";

export default function Philosophy() {
  return (
    <section id="philosophie" className="bg-cream px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.3em] text-accent">
            L&apos;esprit de la montagne
          </p>
          <p className="font-title text-3xl leading-tight font-light text-ink italic md:text-5xl">
            Vivre la montagne autrement, loin des foules.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
            Basée à Sainte-Foy-Tarentaise, je vous guide à travers les
            itinéraires secrets de la vallée. Que vous cherchiez la poudreuse
            vierge ou une belle randonnée contemplative, mon objectif est de
            construire avec vous une aventure sur mesure, en toute sécurité.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
