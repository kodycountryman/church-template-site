"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { TemplateBanner } from "./template-banner";

type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string; description?: string }[];
};

const links: NavLink[] = [
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about", label: "Our Story", description: "How Kindred started" },
      { href: "/about#beliefs", label: "What We Believe", description: "Core beliefs & values" },
      { href: "/about#leadership", label: "Leadership", description: "Meet the pastoral team" },
    ],
  },
  {
    href: "/visit",
    label: "Visit",
    children: [
      { href: "/visit", label: "Plan Your Visit", description: "What to expect Sunday" },
      { href: "/visit#times", label: "Service Times", description: "9 AM & 11 AM Sundays" },
      { href: "/visit#location", label: "Location & Parking", description: "412 Carver Street" },
    ],
  },
  {
    href: "/sermons",
    label: "Sermons",
    children: [
      { href: "/sermons", label: "All Messages", description: "Full sermon archive" },
      { href: "/sermons#series", label: "Series", description: "Browse by teaching series" },
      { href: "/sermons#latest", label: "Latest Message", description: "This week's sermon" },
    ],
  },
  {
    href: "/events",
    label: "Events",
    children: [
      { href: "/events", label: "Upcoming Events", description: "What's happening soon" },
      { href: "/events#calendar", label: "Full Calendar", description: "All events this season" },
    ],
  },
  {
    href: "/ministries",
    label: "Ministries",
    children: [
      { href: "/ministries", label: "All Ministries", description: "Ways to get connected" },
      { href: "/ministries/kindred-kids", label: "Kindred Kids", description: "Ages 0–12" },
      { href: "/ministries/young-adults", label: "Young Adults", description: "College & 20s" },
      { href: "/ministries/care", label: "Care & Support", description: "Pastoral care network" },
    ],
  },
  { href: "/blog", label: "Journal" },
];

// Pages with a dark full-bleed hero — nav starts transparent with white text
const DARK_HERO_ROUTES = ["/"];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasDarkHero = DARK_HERO_ROUTES.includes(pathname);
  const isLight = hasDarkHero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setOpen(false);
  }, [pathname]);

  function openDropdown(href: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(href);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isLight
          ? "bg-transparent"
          : "border-b border-ink-100 bg-bg/85 backdrop-blur-xl",
      )}
    >
      <TemplateBanner />
      <div className="mx-auto flex h-20 w-full max-w-[80rem] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className={cn(
            "text-2xl font-bold tracking-tight transition-colors duration-300",
            isLight ? "text-white" : "text-ink",
          )}
          style={{ letterSpacing: "-0.04em" }}
          aria-label={`${brand.longName} home`}
        >
          {brand.name}<span className={isLight ? "text-white/60" : "text-accent"}>.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) =>
            l.children ? (
              <div
                key={l.href}
                className="relative"
                onMouseEnter={() => openDropdown(l.href)}
                onMouseLeave={scheduleClose}
              >
                {/* Trigger */}
                <button
                  className={cn(
                    "inline-flex items-center gap-1 text-sm font-medium transition-colors duration-300",
                    isLight ? "text-white/90 hover:text-white" : "text-ink-500 hover:text-ink",
                  )}
                >
                  {l.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      activeDropdown === l.href ? "rotate-180" : "",
                    )}
                  />
                </button>

                {/* Dropdown panel */}
                <div
                  className={cn(
                    "absolute left-1/2 top-full -translate-x-1/2 pt-4 transition-all duration-200",
                    activeDropdown === l.href
                      ? "pointer-events-auto opacity-100 translate-y-0"
                      : "pointer-events-none opacity-0 -translate-y-1",
                  )}
                  onMouseEnter={() => openDropdown(l.href)}
                  onMouseLeave={scheduleClose}
                >
                  <div className="min-w-[220px] overflow-hidden rounded-2xl border border-ink-100 bg-bg shadow-[0_8px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                    <div className="p-2">
                      {l.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="group flex flex-col gap-0.5 rounded-xl px-3.5 py-3 transition-colors hover:bg-bg-soft"
                        >
                          <span className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="text-xs text-ink-400">{child.description}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  isLight ? "text-white/90 hover:text-white" : "text-ink-500 hover:text-ink",
                )}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/give"
            className={cn(
              "group inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium transition-all duration-300",
              isLight
                ? "bg-white text-ink hover:bg-white/90"
                : "bg-ink text-white hover:bg-accent",
            )}
          >
            Give
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300",
            isLight ? "border-white/40 text-white" : "border-ink-200 text-ink",
          )}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-ink-100 bg-bg/95 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-1 px-6 py-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-lg font-medium text-ink-700 hover:bg-bg-soft block"
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
