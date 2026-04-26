"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FaqAccordionProps {
  faqs: { q: string; a: string }[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="divide-y divide-ink-100 border-t border-ink-100">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => toggle(i)}
            className="flex w-full items-start justify-between gap-6 py-6 text-left"
            aria-expanded={openIndex === i}
          >
            <span className="font-semibold text-ink text-lg leading-snug">{faq.q}</span>
            <span className="mt-0.5 shrink-0 text-accent">
              {openIndex === i ? (
                <Minus className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
            </span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-6 text-ink-500 leading-relaxed">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
