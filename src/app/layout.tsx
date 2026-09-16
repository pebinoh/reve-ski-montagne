import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "R'Eve Ski Montagne | Guide de Ski Sainte-Foy-Tarentaise",
  description:
    "R'Eve Ski Montagne avec Évelyne. Guide de ski, snowboard et hors-piste à Sainte-Foy et Haute-Tarentaise.",
  icons: {
    icon: "/icon.svg",
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
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsActivityLocation",
              name: "R'Eve Ski Montagne",
              image: "/icon.svg",
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
