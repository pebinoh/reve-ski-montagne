import FadeIn from "./FadeIn";

export default function Separator() {
  return (
    <section className="relative flex h-[70vh] items-center justify-center overflow-hidden text-center text-cream">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(23,25,27,0.45),rgba(23,25,27,0.45)),url('/images/landscape_mobile.jpg')] bg-cover bg-center sm:bg-[linear-gradient(rgba(23,25,27,0.4),rgba(23,25,27,0.4)),url('/images/landscape_ski.jpg')] md:bg-fixed" />

      <FadeIn>
        <p className="px-6 font-title text-3xl leading-snug font-light italic md:text-5xl">
          &ldquo;La montagne ne se consomme pas,
          <br className="hidden md:block" /> elle se vit.&rdquo;
        </p>
      </FadeIn>
    </section>
  );
}
