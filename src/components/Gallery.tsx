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
    <section id="galerie" className="bg-stone px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Instagram
          </p>
          <h2 className="font-title text-4xl leading-tight font-light text-ink italic md:text-5xl">
            Moments partagés
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {reels.map((url, i) => (
            <FadeIn key={url} delay={i * 0.1}>
              <div className="flex min-h-[500px] items-start justify-center overflow-hidden bg-cream">
                <blockquote
                  className="instagram-media !m-0 !w-full !min-w-0 !border-0 !shadow-none"
                  data-instgrm-permalink={url}
                  data-instgrm-version="14"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window.instgrm?.Embeds.process()}
      />
    </section>
  );
}
