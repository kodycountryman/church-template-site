import Link from "next/link";
import { brand } from "@/lib/brand";

const columns = [
  {
    title: "Visit",
    links: [
      { href: "/visit", label: "Plan your visit" },
      { href: "/about", label: "What we believe" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Engage",
    links: [
      { href: "/sermons", label: "Sermons" },
      { href: "/events", label: "Events" },
      { href: "/ministries", label: "Ministries" },
      { href: "/blog", label: "Journal" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/give", label: "Give" },
      { href: "/admin", label: "Staff portal" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-ink-100 bg-bg-soft pt-24 pb-10">
      <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div
              className="text-5xl md:text-6xl font-bold text-ink leading-none"
              style={{ letterSpacing: "-0.04em" }}
            >
              {brand.name}<span className="text-accent">.</span>
            </div>
            <p className="mt-6 max-w-sm text-ink-500 leading-relaxed">
              {brand.tagline}
            </p>
            <div className="mt-10 space-y-1 text-sm text-ink-400">
              <div>{brand.address.line1}</div>
              <div>{brand.address.line2}</div>
              <div className="pt-3">{brand.contact.email}</div>
              <div>{brand.contact.phone}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400 mb-5">
                  {col.title}
                </div>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-ink-700 hover:text-ink transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-ink-100 pt-8 text-xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} {brand.longName}. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href={brand.socials.instagram} className="hover:text-ink">Instagram</a>
            <a href={brand.socials.youtube} className="hover:text-ink">YouTube</a>
            <a href={brand.socials.spotify} className="hover:text-ink">Spotify</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
