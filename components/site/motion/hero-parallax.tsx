"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroParallaxProps {
  children: React.ReactNode;
}

export function HeroParallax({ children }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  // Move background 0→120px as page scrolls from 0→600px
  const y = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0"
      style={{ y }}
      // Slightly oversized so parallax offset doesn't reveal gaps
    >
      {children}
    </motion.div>
  );
}
