import Image from "next/image";
import FadeIn from "./FadeIn";

export default function Presentation({
  title,
  text,
  image,
  badges,
}: {
  title: string;
  text: string;
  image: string;
  badges: string;
}) {
  const paragraphs = text.split("\n\n").filter(Boolean);
  const badgeList = badges
    .split(",")
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <section id="presentation" className="bg-stone px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-[0.85fr_1fr]">
        <FadeIn>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={image}
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
            {title}
          </h2>

          <div className="max-w-xl space-y-5 text-base leading-relaxed text-ink/70">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {badgeList.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink/10 pt-8">
              {badgeList.map((badge) => (
                <span
                  key={badge}
                  className="text-sm font-medium tracking-wide text-ink"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
