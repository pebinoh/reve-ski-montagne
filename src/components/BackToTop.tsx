"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#accueil"
          title="Retour en haut"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-8 right-8 z-[999] flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-cream text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
        >
          <ArrowUp size={16} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
