"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";

const links = [
  { href: "/#accueil", label: "Accueil" },
  { href: "/#presentation", label: "Qui suis-je" },
  { href: "/#activites", label: "Activités" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <nav
      className={`fixed top-0 z-[1000] flex h-20 w-full items-center justify-between px-6 transition-colors duration-500 md:px-12 ${
        solid
          ? "bg-cream/95 shadow-[0_1px_0_rgba(23,25,27,0.08)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <Link href="/#accueil">
        <Logo />
      </Link>

      <button
        className={`z-10 md:hidden ${solid ? "text-ink" : "text-cream"}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Ouvrir le menu"
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      <ul className="hidden items-center gap-10 md:flex">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`group relative text-[0.8rem] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
                solid ? "text-ink/80 hover:text-ink" : "text-cream/90 hover:text-cream"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                  solid ? "bg-accent" : "bg-cream"
                }`}
              />
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/reservation"
            className={`rounded-full border px-6 py-2.5 text-[0.8rem] font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5 ${
              solid
                ? "border-ink bg-ink text-cream hover:bg-ink-soft"
                : "border-cream/70 text-cream hover:bg-cream hover:text-ink"
            }`}
          >
            Réserver
          </Link>
        </li>
      </ul>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-20 left-0 w-full overflow-hidden border-t border-ink/10 bg-cream md:hidden"
          >
            {links.map((link) => (
              <li key={link.href} className="border-b border-ink/5 text-center">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-5 text-sm font-medium uppercase tracking-[0.15em] text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="py-6 text-center">
              <Link
                href="/reservation"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full bg-ink px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-cream"
              >
                Réserver
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
