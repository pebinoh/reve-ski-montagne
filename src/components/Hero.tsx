"use client";

import { motion } from "framer-motion";

export default function Hero({
  label,
  title,
  imageDesktop,
  imageMobile,
}: {
  label: string;
  title: string;
  imageDesktop: string;
  imageMobile: string;
}) {
  const titleLines = title.split("\n");

  return (
    <header
      id="accueil"
      className="relative flex h-screen items-end justify-start overflow-hidden text-cream"
    >
      <div
        className="absolute inset-0 -z-20 bg-cover bg-top md:bg-center md:bg-fixed"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(23,25,27,0.75), rgba(23,25,27,0.05) 55%), url('${imageMobile}')`,
        }}
      />
      <div
        className="absolute inset-0 -z-10 hidden bg-cover bg-center md:block md:bg-fixed"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(23,25,27,0.7), rgba(23,25,27,0.05) 60%), url('${imageDesktop}')`,
        }}
      />

      <div className="relative w-full px-6 pb-24 md:px-12 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-cream/70"
        >
          {label}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="max-w-4xl font-title text-5xl leading-[1.05] font-light italic md:text-7xl"
        >
          {titleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < titleLines.length - 1 && <br />}
            </span>
          ))}
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
