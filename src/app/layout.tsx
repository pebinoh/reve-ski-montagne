import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site-url";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "R'Eve Ski Montagne | Guide de Ski Indépendante à Sainte-Foy-Tarentaise",
    template: "%s | R'Eve Ski Montagne",
  },
  description:
    "Évelyne, guide de ski indépendante à Sainte-Foy-Tarentaise (Savoie). Cours particuliers, freeride, hors-piste, ski de randonnée et séjours en itinérance en Haute-Tarentaise.",
  keywords: [
    "moniteur de ski Sainte-Foy-Tarentaise",
    "guide de ski indépendant Savoie",
    "hors-piste Haute-Tarentaise",
    "ski de randonnée Sainte-Foy",
    "freeride Tarentaise",
    "cours de ski particulier Savoie",
  ],
  icons: {
    icon: "/images/logo_reve.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "R'Eve Ski Montagne",
    description:
      "Guide de ski indépendante à Sainte-Foy-Tarentaise. Freeride, hors-piste, ski de randonnée et séjours en itinérance.",
    images: ["/images/hero_ski.jpg"],
    type: "website",
    locale: "fr_FR",
    siteName: "R'Eve Ski Montagne",
  },
  twitter: {
    card: "summary_large_image",
    title: "R'Eve Ski Montagne",
    description:
      "Guide de ski indépendante à Sainte-Foy-Tarentaise, Savoie.",
    images: ["/images/hero_ski.jpg"],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#17191b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
