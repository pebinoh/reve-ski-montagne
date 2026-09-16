import FadeIn from "./FadeIn";

export default function Separator() {
  return (
    <section
      className="flex h-[350px] items-center justify-center bg-[linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)),url('/images/landscape_mobile.jpg')] bg-cover bg-center text-center text-white sm:bg-[linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)),url('/images/landscape_ski.jpg')] md:h-[450px] md:bg-fixed"
    >
      <FadeIn>
        <h3 className="px-5 font-title text-2xl italic tracking-wide [text-shadow:0_5px_15px_rgba(0,0,0,0.3)] md:text-4xl">
          &ldquo;La montagne ne se consomme pas, elle se vit.&rdquo;
        </h3>
      </FadeIn>
    </section>
  );
}
