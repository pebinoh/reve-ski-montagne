"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/#accueil", label: "Accueil" },
  { href: "/#presentation", label: "Qui suis-je ?" },
  { href: "/#activites", label: "Activités" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(false);

  return (
    <nav className="fixed top-0 z-[1000] flex h-20 w-full items-center justify-between bg-white/95 px-5 shadow-[0_2px_15px_rgba(0,0,0,0.03)] backdrop-blur-md md:px-12">
      <Link href="/#accueil" className="block">
        <Image
          src="/images/logo_reve.png"
          alt="Logo R'Eve Ski Montagne"
          width={60}
          height={60}
          className="h-[60px] w-[60px] rounded-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>

      <button
        className="text-2xl text-[#333] md:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-label="Ouvrir le menu"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      <ul className="hidden items-center gap-8 md:flex">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group relative text-[0.85rem] font-semibold uppercase tracking-wider text-[#333] transition-colors duration-300 hover:text-accent"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/reservation"
            className="rounded-full bg-accent px-6 py-2.5 text-[0.85rem] font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
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
            className="absolute top-20 left-0 w-full overflow-hidden border-t border-[#f5f5f5] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.05)] md:hidden"
          >
            {links.map((link) => (
              <li
                key={link.href}
                className="border-b border-[#f9f9f9] text-center"
              >
                <Link
                  href={link.href}
                  onClick={handleClick}
                  className="block py-5 text-[0.85rem] font-semibold uppercase tracking-wider text-[#333]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="text-center py-5">
              <Link
                href="/reservation"
                onClick={handleClick}
                className="inline-block rounded-full bg-accent px-8 py-3 text-[0.85rem] font-semibold uppercase tracking-wider text-white"
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
