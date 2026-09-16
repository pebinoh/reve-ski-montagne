"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <header
      id="accueil"
      className="relative flex h-screen items-center justify-center text-center text-white"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)),url('/images/hero_mobile.jpg')] bg-cover bg-top md:bg-[linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)),url('/images/hero_ski.jpg')] md:bg-center md:bg-fixed" />

      <motion.div
        className="px-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
      >
        <h1 className="mb-5 font-title text-4xl [text-shadow:0_10px_30px_rgba(0,0,0,0.3)] md:text-6xl">
          R&apos;Eve Ski Montagne
        </h1>
        <p className="mb-10 text-xl font-light [text-shadow:0_5px_15px_rgba(0,0,0,0.3)] md:text-2xl">
          Du rêve à la réalité...
          <br />
          Ski, Montagne &amp; Aventure en Tarentaise
        </p>
        <a
          href="#presentation"
          className="rounded-full border border-white/60 bg-white/10 px-10 py-4 text-sm uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-primary hover:shadow-xl"
        >
          Rencontrer Évelyne
        </a>
      </motion.div>
    </header>
  );
}
