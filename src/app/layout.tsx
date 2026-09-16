import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "R'Eve Ski Montagne | Guide de Ski Sainte-Foy-Tarentaise",
  description:
    "R'Eve Ski Montagne avec Évelyne. Guide de ski, snowboard et hors-piste à Sainte-Foy et Haute-Tarentaise.",
  icons: {
    icon: "/images/logo_reve.png",
  },
  openGraph: {
    title: "R'Eve Ski Montagne",
    description: "Aventures ski & montagne avec Évelyne.",
    images: ["/images/hero_ski.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsActivityLocation",
              name: "R'Eve Ski Montagne",
              image: "/images/logo_reve.png",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Sainte-Foy-Tarentaise",
                postalCode: "73640",
                addressCountry: "FR",
              },
              priceRange: "€€",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
