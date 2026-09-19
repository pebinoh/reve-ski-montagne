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
import { getSiteContent } from "@/lib/site-content";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <>
      <Loader />
      <Navbar />
      <Hero
        label={content.heroLabel}
        title={content.heroTitle}
        imageDesktop={content.heroImageDesktop}
        imageMobile={content.heroImageMobile}
      />
      <Philosophy
        label={content.philosophyLabel}
        title={content.philosophyTitle}
        text={content.philosophyText}
      />
      <Presentation
        title={content.presentationTitle}
        text={content.presentationText}
        image={content.presentationImage}
        badges={content.presentationBadges}
      />
      <Activities
        activities={[
          {
            title: content.activity1Title,
            text: content.activity1Text,
            image: content.activity1Image,
          },
          {
            title: content.activity2Title,
            text: content.activity2Text,
            image: content.activity2Image,
          },
          {
            title: content.activity3Title,
            text: content.activity3Text,
            image: content.activity3Image,
          },
        ]}
      />
      <Separator
        quote={content.separatorQuote}
        imageDesktop={content.separatorImageDesktop}
        imageMobile={content.separatorImageMobile}
      />
      <Gallery
        reels={[
          content.instagramReel1,
          content.instagramReel2,
          content.instagramReel3,
        ]}
      />
      <Contact text={content.contactText} email={content.contactEmail} />
      <Footer
        text={content.footerText}
        instagramProfileUrl={content.instagramProfileUrl}
        instagramHandle={content.instagramHandle}
        address={content.contactAddress}
        phone={content.contactPhone}
        email={content.contactEmail}
      />
      <BackToTop />
    </>
  );
}
