import FadeIn from "./FadeIn";

export default function Philosophy() {
  return (
    <section id="philosophie" className="mx-auto max-w-[1100px] px-5 py-24">
      <FadeIn className="mx-auto max-w-[800px] text-center text-[#555]">
        <h2 className="mb-10 font-title text-3xl text-primary md:text-4xl">
          L&apos;Esprit de la Montagne
        </h2>
        <p className="drop-cap">
          Vivre la montagne autrement, loin des foules.
        </p>
        <p className="mt-4">
          Basée à Sainte-Foy-Tarentaise, je vous guide à travers les
          itinéraires secrets de la vallée. Que vous cherchiez la poudreuse
          vierge ou une belle randonnée contemplative, mon objectif est de
          construire avec vous une aventure sur mesure, en toute sécurité.
        </p>
      </FadeIn>
    </section>
  );
}
