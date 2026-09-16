import Image from "next/image";
import FadeIn from "./FadeIn";

const activities = [
  {
    index: "01",
    image: "/images/ski_rando_1.jpg",
    title: "Freeride & Hors-Piste",
    text: "Découvrez les faces cachées de Sainte-Foy. La trace parfaite vous attend dans la poudreuse.",
  },
  {
    index: "02",
    image: "/images/ski_action_1.jpg",
    title: "Ski de Randonnée",
    text: "Échappez aux remontées mécaniques. Le calme, l'effort et des paysages à couper le souffle.",
  },
  {
    index: "03",
    image: "/images/itinerance.jpg",
    title: "Séjour en Itinérance",
    text: "L'aventure sur plusieurs jours, de refuge en refuge. Une immersion totale pour déconnecter.",
  },
];

export default function Activities() {
  return (
    <section id="activites" className="bg-cream px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Activités
          </p>
          <h2 className="mb-16 font-title text-4xl leading-tight font-light text-ink italic md:text-5xl">
            Mes terrains de jeu
          </h2>
        </FadeIn>

        <div className="border-t border-ink/10">
          {activities.map((activity, i) => (
            <FadeIn key={activity.title} delay={i * 0.08}>
              <div className="group grid grid-cols-1 items-center gap-8 border-b border-ink/10 py-10 md:grid-cols-[80px_1.2fr_1.6fr] md:gap-12">
                <span className="font-title text-2xl italic text-ink/30">
                  {activity.index}
                </span>

                <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[4/3]">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div>
                  <h3 className="mb-3 font-title text-2xl font-light text-ink italic md:text-3xl">
                    {activity.title}
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-ink/65">
                    {activity.text}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
