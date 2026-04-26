"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/motion";

const STORAGE_KEY = "kindred-intro";

export function Letterbox() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only run the intro once per session
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (!seen) {
      setShow(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }
  }, []);

  if (!show) return null;

  const barVariants = {
    initial: { scaleY: 1 },
    animate: {
      scaleY: 0,
      transition: { duration: 1.1, ease: EASE_CINEMATIC, delay: 0.3 },
    },
  };

  return (
    <>
      {/* Top bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[200] h-[52vh] bg-[#0B0B0E] origin-top pointer-events-none"
        variants={barVariants}
        initial="initial"
        animate="animate"
      />
      {/* Bottom bar */}
      <motion.div
        className="fixed inset-x-0 bottom-0 z-[200] h-[52vh] bg-[#0B0B0E] origin-bottom pointer-events-none"
        variants={barVariants}
        initial="initial"
        animate="animate"
      />
    </>
  );
}
