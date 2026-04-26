"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Search, X } from "lucide-react";
import { sermons, series } from "@/lib/mock";
import { cn } from "@/lib/utils";

export default function SermonsPage() {
  const [activeSeries, setActiveSeries] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return sermons.filter((s) => {
      const matchesSeries = activeSeries === "All" || s.series === activeSeries;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.speaker.toLowerCase().includes(q) ||
        s.scripture.toLowerCase().includes(q) ||
        s.series.toLowerCase().includes(q);
      return matchesSeries && matchesQuery;
    });
  }, [activeSeries, query]);

  const [featured, ...rest] = filtered;

  return (
    <>
      {/* HEADER */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Messages
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h1 className="h-display text-5xl md:text-7xl lg:text-8xl text-ink max-w-3xl">
              Sermons.
            </h1>
            <p className="max-w-md text-lg text-ink-500 leading-relaxed">
              {sermons.length} messages across {series.length} series. Search, filter, and stream the
              full archive.
            </p>
          </div>

          {/* Search + filter bar */}
          <div className="mt-10 border-t border-ink-100 pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Series chips */}
            <div className="flex flex-wrap items-center gap-2">
              {["All", ...series.map((s) => s.title)].map((label) => (
                <button
                  key={label}
                  onClick={() => { setActiveSeries(label); setQuery(""); }}
                  className={cn(
                    "inline-flex h-9 items-center rounded-full px-4 text-xs font-semibold transition-all",
                    activeSeries === label
                      ? "bg-ink text-white"
                      : "border border-ink-100 text-ink-500 hover:border-ink-300 hover:text-ink",
                  )}
                >
                  {label}
                </button>
              ))}
              <a
                href="#series"
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-4 text-xs font-semibold text-accent hover:bg-accent/10 transition-colors"
              >
                Browse all series →
              </a>
            </div>

            {/* Search */}
            <div className="relative shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search messages…"
                className="h-9 w-full md:w-56 rounded-full border border-ink-100 bg-bg pl-9 pr-8 text-xs text-ink placeholder:text-ink-300 focus:border-accent focus:outline-none transition-colors"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Result count */}
          {(activeSeries !== "All" || query) && (
            <p className="mt-4 text-sm text-ink-400">
              {filtered.length} message{filtered.length !== 1 ? "s" : ""}
              {activeSeries !== "All" && <> in <span className="font-semibold text-ink">{activeSeries}</span></>}
              {query && <> matching &ldquo;<span className="font-semibold text-ink">{query}</span>&rdquo;</>}
            </p>
          )}
        </div>
      </section>

      {/* FEATURED */}
      {featured ? (
        <section>
          <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
            <Link
              href={`/sermons/${featured.slug}`}
              className="group relative grid overflow-hidden rounded-3xl bg-ink lg:grid-cols-[1.2fr_1fr]"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto">
                <Image
                  src={featured.cover}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  {activeSeries === "All" && !query ? "Latest" : "Top result"}
                </div>
              </div>
              <div className="p-10 md:p-14 flex flex-col justify-between gap-10">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    Series · {featured.series}
                  </div>
                  <h2 className="mt-4 h-display text-3xl md:text-5xl text-white">{featured.title}</h2>
                  <p className="mt-5 text-white/70 leading-relaxed">{featured.excerpt}</p>
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <span className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ink group-hover:bg-accent group-hover:text-white transition-colors">
                    <Play className="h-4 w-4 fill-current" /> Watch · {featured.duration}
                  </span>
                  <div className="text-sm text-white/60">
                    {featured.speaker} · {featured.date} · {featured.scripture}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      ) : (
        <section>
          <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
            <div className="flex flex-col items-center justify-center rounded-3xl border border-ink-100 bg-bg-soft py-24 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <p className="font-semibold text-ink">No messages found</p>
              <p className="mt-2 text-sm text-ink-400">Try a different series or search term</p>
              <button
                onClick={() => { setActiveSeries("All"); setQuery(""); }}
                className="mt-6 inline-flex h-10 items-center rounded-full bg-ink px-6 text-sm font-semibold text-white hover:bg-accent transition-colors"
              >
                Clear filters
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SERIES STRIP — only show when viewing all */}
      {activeSeries === "All" && !query && (
        <section id="series" className="py-24 md:py-32 scroll-mt-28">
          <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
            <div className="mb-10 flex items-end justify-between gap-6">
              <h2 className="h-display text-3xl md:text-5xl text-ink">Series.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              {series.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => setActiveSeries(s.title)}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink text-left"
                >
                  <Image
                    src={s.cover}
                    alt={s.title}
                    fill
                    sizes="(min-width: 768px) 25vw, 100vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-7">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                      {s.count} messages
                    </div>
                    <div className="mt-2 h-display text-2xl text-white">{s.title}</div>
                    <p className="mt-3 text-sm text-white/70 leading-relaxed">{s.description}</p>
                    <div className="mt-4 inline-flex h-8 items-center rounded-full bg-white/10 px-3 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 w-fit">
                      Browse series →
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ARCHIVE GRID */}
      {rest.length > 0 && (
        <section className="border-t border-ink-100 pb-32 pt-20">
          <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
            <h2 className="h-display text-3xl md:text-5xl text-ink mb-12">
              {activeSeries !== "All" || query ? "Results." : "Archive."}
            </h2>
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((s) => (
                <Link key={s.slug} href={`/sermons/${s.slug}`} className="group">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-bg-soft">
                    <Image
                      src={s.cover}
                      alt={s.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-100">
                      <Play className="h-4 w-4 fill-ink text-ink" />
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      {s.series}
                    </div>
                    <div className="mt-2 text-xl font-bold text-ink tracking-tight group-hover:text-accent transition-colors">
                      {s.title}
                    </div>
                    <div className="mt-2 text-sm text-ink-400">
                      {s.speaker} · {s.date} · {s.duration}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
