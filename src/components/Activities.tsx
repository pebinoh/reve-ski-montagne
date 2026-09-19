import Image from "next/image";
import FadeIn from "./FadeIn";

type Activity = { title: string; text: string; image: string };

export default function Activities({ activities }: { activities: Activity[] }) {
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
            <FadeIn key={i} delay={i * 0.08}>
              <div className="group grid grid-cols-1 items-center gap-8 border-b border-ink/10 py-10 md:grid-cols-[80px_1.2fr_1.6fr] md:gap-12">
                <span className="font-title text-2xl italic text-ink/30">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[4/3]">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    sizes="(min-width: 768px) 35vw, 90vw"
                    loading="lazy"
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
