"use client";

import Script from "next/script";
import { useEffect } from "react";
import FadeIn from "./FadeIn";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const reels = [
  "https://www.instagram.com/reel/DGQzWRoIfAc/",
  "https://www.instagram.com/reel/DFqXGWyofLS/",
  "https://www.instagram.com/reel/C5h_QNOooq3/",
];

export default function Gallery() {
  useEffect(() => {
    window.instgrm?.Embeds.process();
  }, []);

  return (
    <section id="galerie" className="mx-auto max-w-[1100px] px-5 py-24">
      <FadeIn className="mb-12 text-center">
        <h2 className="mb-4 font-title text-3xl text-primary md:text-4xl">
          Moments Partagés
        </h2>
        <p className="text-[#555]">
          Retrouvez mes dernières aventures en vidéo.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {reels.map((url, i) => (
          <FadeIn key={url} delay={i * 0.1}>
            <div className="flex min-h-[500px] items-start justify-center overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)]">
              <blockquote
                className="instagram-media !m-0 !w-full !min-w-0 !border-0 !shadow-none"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
              />
            </div>
          </FadeIn>
        ))}
      </div>

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window.instgrm?.Embeds.process()}
      />
    </section>
  );
}
