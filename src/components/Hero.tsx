"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <header
      id="accueil"
      className="relative flex h-screen items-end justify-start overflow-hidden text-cream"
    >
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_top,rgba(23,25,27,0.75),rgba(23,25,27,0.05)_55%),url('/images/hero_mobile.jpg')] bg-cover bg-top md:bg-[linear-gradient(to_top,rgba(23,25,27,0.7),rgba(23,25,27,0.05)_60%),url('/images/hero_ski.jpg')] md:bg-center md:bg-fixed" />

      <div className="relative w-full px-6 pb-24 md:px-12 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-cream/70"
        >
          Sainte-Foy-Tarentaise · Savoie
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="max-w-4xl font-title text-5xl leading-[1.05] font-light italic md:text-7xl"
        >
          Du rêve à la réalité,
          <br />
          la montagne autrement.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <a
            href="/reservation"
            className="rounded-full bg-cream px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Réserver une sortie
          </a>
          <a
            href="#presentation"
            className="text-xs font-medium uppercase tracking-[0.2em] text-cream/85 underline decoration-cream/40 decoration-1 underline-offset-8 transition-colors hover:text-cream hover:decoration-cream"
          >
            Rencontrer Évelyne
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute right-6 bottom-10 hidden md:right-12 md:block"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[0.65rem] font-medium tracking-[0.3em] text-cream/60 [writing-mode:vertical-rl]">
            SCROLL
          </span>
          <span className="h-10 w-px bg-cream/40" />
        </div>
      </motion.div>
    </header>
  );
}
