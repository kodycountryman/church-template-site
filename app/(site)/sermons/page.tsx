import Image from "next/image";
import Link from "next/link";
import { Play, ArrowUpRight } from "lucide-react";
import { sermons, series } from "@/lib/mock";

export const metadata = { title: "Sermons" };

export default function SermonsPage() {
  const [latest, ...rest] = sermons;

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

          {/* filter bar */}
          <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-ink-100 pt-6">
            <FilterChip label="All" active />
            {series.map((s) => (
              <FilterChip key={s.slug} label={s.title} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LATEST */}
      <section>
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <Link
            href={`/sermons/${latest.slug}`}
            className="group relative grid overflow-hidden rounded-3xl bg-ink lg:grid-cols-[1.2fr_1fr]"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto">
              <Image
                src={latest.cover}
                alt={latest.title}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                Latest
              </div>
            </div>
            <div className="p-10 md:p-14 flex flex-col justify-between gap-10">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Series · {latest.series}
                </div>
                <h2 className="mt-4 h-display text-3xl md:text-5xl text-white">{latest.title}</h2>
                <p className="mt-5 text-white/70 leading-relaxed">{latest.excerpt}</p>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <span className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ink group-hover:bg-accent group-hover:text-white transition-colors">
                  <Play className="h-4 w-4 fill-current" /> Watch · {latest.duration}
                </span>
                <div className="text-sm text-white/60">
                  {latest.speaker} · {latest.date} · {latest.scripture}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* SERIES STRIP */}
      <section className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="h-display text-3xl md:text-5xl text-ink">Series.</h2>
            <Link href="/sermons" className="text-sm font-medium text-ink-500 hover:text-ink">
              View all →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {series.map((s) => (
              <Link
                key={s.slug}
                href={`/sermons`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink"
              >
                <Image
                  src={s.cover}
                  alt={s.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                    {s.count} messages
                  </div>
                  <div className="mt-2 h-display text-3xl text-white">{s.title}</div>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">{s.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHIVE GRID */}
      <section className="border-t border-ink-100 pb-32 pt-20">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <h2 className="h-display text-3xl md:text-5xl text-ink mb-12">Archive.</h2>
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
    </>
  );
}

function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className={
        active
          ? "inline-flex h-9 items-center rounded-full bg-ink px-4 text-xs font-semibold text-white"
          : "inline-flex h-9 items-center rounded-full border border-ink-100 px-4 text-xs font-medium text-ink-500 hover:border-ink-300 hover:text-ink cursor-pointer"
      }
    >
      {label}
    </span>
  );
}
