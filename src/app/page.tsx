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
import { SITE_URL } from "@/lib/site-url";

export default async function Home() {
  const content = await getSiteContent();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "R'Eve Ski Montagne",
    description:
      "Guide de ski indépendante à Sainte-Foy-Tarentaise : cours particuliers, freeride, hors-piste, ski de randonnée et séjours en itinérance.",
    image: `${SITE_URL}/images/hero_ski.jpg`,
    url: SITE_URL,
    telephone: content.contactPhone,
    email: content.contactEmail,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sainte-Foy-Tarentaise",
      postalCode: "73640",
      addressRegion: "Savoie",
      addressCountry: "FR",
    },
    sameAs: [content.instagramProfileUrl],
    priceRange: "€€",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Précharge l'image du hero (LCP) selon la largeur d'écran */}
      <link
        rel="preload"
        as="image"
        href={content.heroImageMobile}
        media="(max-width: 767px)"
      />
      <link
        rel="preload"
        as="image"
        href={content.heroImageDesktop}
        media="(min-width: 768px)"
      />
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
