import FadeIn from "./FadeIn";

export default function Philosophy({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <section id="philosophie" className="bg-cream px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.3em] text-accent">
            {label}
          </p>
          <p className="font-title text-3xl leading-tight font-light text-ink italic md:text-5xl">
            {title}
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
            {text}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
