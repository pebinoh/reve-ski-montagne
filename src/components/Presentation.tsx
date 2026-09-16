import Image from "next/image";
import FadeIn from "./FadeIn";

export default function Presentation() {
  return (
    <section id="presentation" className="bg-stone px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-[0.85fr_1fr]">
        <FadeIn>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/portrait_evelyne.jpg"
              alt="Portrait Évelyne, guide de ski"
              fill
              className="object-cover grayscale-[15%]"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Qui suis-je
          </p>
          <h2 className="mb-8 font-title text-4xl leading-tight font-light text-ink italic md:text-5xl">
            Évelyne, votre guide passionnée
          </h2>

          <div className="max-w-xl space-y-5 text-base leading-relaxed text-ink/70">
            <p>
              Amoureuse de la montagne et de ski, j&apos;ai fait de ma
              passion mon métier. Installée au cœur de la Tarentaise, je
              connais chaque recoin de Sainte-Foy et navigue sur la Rosière,
              Tignes et Val d&apos;Isère.
            </p>
            <p className="font-medium text-ink">
              Mon approche : sécurité, plaisir et partage.
            </p>
            <p>
              Que vous soyez débutant en hors-piste ou expert en quête de
              pentes raides, je m&apos;adapte à votre niveau et vos envies
              pour transformer votre journée de ski en un souvenir
              inoubliable.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink/10 pt-8">
            <span className="text-sm font-medium tracking-wide text-ink">
              Diplômée d&apos;État
            </span>
            <span className="text-sm font-medium tracking-wide text-ink">
              Guide locale
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
