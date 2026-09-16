import { Snowflake, Mountain, Route } from "lucide-react";
import FadeIn from "./FadeIn";

const activities = [
  {
    icon: Snowflake,
    image: "/images/ski_rando_1.jpg",
    title: "Freeride & Hors-Piste",
    text: "Découvrez les faces cachées de Sainte-Foy. La trace parfaite vous attend dans la poudreuse.",
  },
  {
    icon: Mountain,
    image: "/images/ski_action_1.jpg",
    title: "Ski de Randonnée",
    text: "Échappez aux remontées mécaniques. Le calme, l'effort et des paysages à couper le souffle.",
  },
  {
    icon: Route,
    image: "/images/itinerance.jpg",
    title: "Séjour en Itinérance",
    text: "L'aventure sur plusieurs jours, de refuge en refuge. Une immersion totale pour déconnecter.",
  },
];

export default function Activities() {
  return (
    <section id="activites" className="mx-auto max-w-[1100px] px-5 py-24">
      <h2 className="mb-10 text-center font-title text-3xl text-primary md:text-4xl">
        Mes Activités
      </h2>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity, i) => (
          <FadeIn key={activity.title} delay={i * 0.1}>
            <div
              className="group relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-xl bg-cover bg-center p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
              style={{ backgroundImage: `url('${activity.image}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/80 transition-all duration-500 group-hover:from-accent/20 group-hover:to-primary/90" />
              <div className="relative z-10 flex flex-col items-center">
                <activity.icon
                  size={48}
                  className="mb-6 text-wood transition-transform duration-300 group-hover:scale-110"
                />
                <h3 className="mb-4 font-title text-2xl text-white">
                  {activity.title}
                </h3>
                <p className="mb-6 text-white/90">{activity.text}</p>
                <span className="mt-auto border-b border-white/50 pb-1 text-xs font-semibold uppercase tracking-[2px] text-white">
                  En savoir plus →
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
