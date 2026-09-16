import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import BookingForm from "@/components/BookingForm";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Réserver | R'Eve Ski Montagne",
  description:
    "Faites votre demande de réservation pour une sortie ski, freeride ou randonnée avec Évelyne à Sainte-Foy-Tarentaise.",
};

export default function ReservationPage() {
  return (
    <>
      <Navbar />
      <main className="bg-light pb-24 pt-40">
        <div className="mx-auto max-w-[1100px] px-5">
          <FadeIn className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="mb-4 font-title text-3xl text-primary md:text-4xl">
              Faire une demande de réservation
            </h1>
            <p className="text-[#555]">
              Remplissez ce formulaire avec vos souhaits, Évelyne vous
              recontactera pour confirmer la date et les détails de votre
              sortie.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <BookingForm />
          </FadeIn>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
