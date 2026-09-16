import Image from "next/image";
import { Check } from "lucide-react";
import FadeIn from "./FadeIn";

export default function Presentation() {
  return (
    <section id="presentation" className="bg-light py-24">
      <div className="mx-auto max-w-[1100px] px-5">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2">
          <FadeIn>
            <div className="mx-auto max-w-[420px] md:max-w-none">
              <Image
                src="/images/portrait_evelyne.jpg"
                alt="Portrait Évelyne, guide de ski"
                width={600}
                height={700}
                className="h-auto max-h-[350px] w-full rounded-xl object-cover shadow-[10px_10px_0px_var(--color-wood)] md:max-h-[500px] md:shadow-[20px_20px_0px_var(--color-wood)]"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="text-center md:text-left">
            <h2 className="mb-4 text-center font-title text-3xl text-primary md:text-left md:text-4xl">
              Qui suis-je ?
            </h2>
            <h3 className="mb-5 font-title text-xl text-accent">
              Évelyne, votre guide passionnée
            </h3>
            <p className="text-[#555]">
              Amoureuse de la montagne et de ski, j&apos;ai fait de ma passion
              mon métier. Installée au cœur de la Tarentaise, je connais
              chaque recoin de Sainte-Foy et navigue sur la Rosière, Tignes et
              Val d&apos;Isère.
            </p>
            <p className="mt-4 text-[#555]">
              Mon approche ? <strong>Sécurité, Plaisir et Partage.</strong>
            </p>
            <p className="mt-4 text-[#555]">
              Que vous soyez débutant en hors-piste ou expert en quête de
              pentes raides, je m&apos;adapte à votre niveau et vos envies
              pour transformer votre journée de ski en un souvenir
              inoubliable.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#eee] bg-white px-5 py-2 text-sm font-semibold text-primary shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                <Check size={16} className="text-accent" /> Diplômée
                d&apos;État
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#eee] bg-white px-5 py-2 text-sm font-semibold text-primary shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                <Check size={16} className="text-accent" /> Guide Locale
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
