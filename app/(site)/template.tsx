"use client";

import { motion } from "framer-motion";

/**
 * Site-level template — re-mounts on every route change (Next.js gives it a
 * unique key automatically).  We animate in/out with a simple opacity fade.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
