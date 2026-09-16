import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Presentation from "@/components/Presentation";
import Activities from "@/components/Activities";
import Separator from "@/components/Separator";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <Hero />
      <Philosophy />
      <Presentation />
      <Activities />
      <Separator />
      <Gallery />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}
