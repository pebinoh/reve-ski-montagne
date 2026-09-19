import FadeIn from "./FadeIn";

export default function Separator({
  quote,
  imageDesktop,
  imageMobile,
}: {
  quote: string;
  imageDesktop: string;
  imageMobile: string;
}) {
  return (
    <section className="relative flex h-[70vh] items-center justify-center overflow-hidden text-center text-cream">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center md:bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(23,25,27,0.45), rgba(23,25,27,0.45)), url('${imageMobile}')`,
        }}
      />
      <div
        className="absolute inset-0 -z-10 hidden bg-cover bg-center sm:block md:bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(23,25,27,0.4), rgba(23,25,27,0.4)), url('${imageDesktop}')`,
        }}
      />

      <FadeIn>
        <p className="px-6 font-title text-3xl leading-snug font-light italic md:text-5xl">
          &ldquo;{quote}&rdquo;
        </p>
      </FadeIn>
    </section>
  );
}
