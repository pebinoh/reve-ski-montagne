import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "R'Eve Ski Montagne — Espace privé",
    short_name: "R'Eve Ski",
    description:
      "Espace privé d'Évelyne : réservations, clients, factures et notifications de nouvelles demandes.",
    start_url: "/admin",
    scope: "/",
    display: "standalone",
    background_color: "#f6f3ec",
    theme_color: "#17191b",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
