"use client";

import { motion } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";

/**
 * Hero h1 with cinematic entrance.
 * Plays after the letterbox clears (~1.4s total delay).
 * Uses a simple motion.div wrapper so the accent <span> inside
 * renders correctly without breaking the coloured word.
 */
export function HeroHeadline() {
  return (
    <motion.h1
      className="h-display text-white text-[clamp(3rem,9vw,9rem)] max-w-[14ch]"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: EASE_EXPO, delay: 1.0 }}
    >
      You were made for <span className="text-accent">more</span>.
    </motion.h1>
  );
}
