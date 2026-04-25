"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { TemplateBanner } from "./template-banner";

const links = [
  { href: "/about", label: "About" },
  { href: "/visit", label: "Visit" },
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
  { href: "/ministries", label: "Ministries" },
  { href: "/blog", label: "Journal" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ink-100 bg-bg/85 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <TemplateBanner />
      <div className="mx-auto flex h-20 w-full max-w-[80rem] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-ink"
          style={{ letterSpacing: "-0.04em" }}
          aria-label={`${brand.longName} home`}
        >
          {brand.name}<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-500 transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/give"
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-white transition-all hover:bg-accent"
          >
            Give
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink-100 bg-bg/95 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-1 px-6 py-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-lg font-medium text-ink-700 hover:bg-bg-soft"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/give"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex h-12 items-center justify-center rounded-full bg-ink px-5 font-medium text-white"
            >
              Give
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
