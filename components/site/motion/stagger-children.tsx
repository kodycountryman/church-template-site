"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";

interface StaggerChildrenProps {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function StaggerChildren({
  children,
  stagger = 0.1,
  delay = 0,
  className,
  once = true,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.12 });

  const containerVariants = staggerContainer(stagger, delay);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={fadeUp}>{child}</motion.div>
      ))}
    </motion.div>
  );
}
