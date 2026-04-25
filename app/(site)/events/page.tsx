import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { events } from "@/lib/mock";

export const metadata = { title: "Events" };

function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    day: d.getDate().toString(),
    weekday: d.toLocaleString("en-US", { weekday: "long" }),
    time: d.toLocaleString("en-US", { hour: "numeric", minute: "2-digit" }),
  };
}

export default function EventsPage() {
  const [feature, ...rest] = events;
  const f = formatDate(feature.starts);

  return (
    <>
      {/* HEADER */}
      <section className="pt-40 pb-12 md:pt-48">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            What's happening
          </div>
          <h1 className="h-display text-5xl md:text-7xl lg:text-8xl text-ink max-w-3xl">
            Events.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink-500 leading-relaxed">
            Sundays plus everything else — gatherings, classes, outreach, and the things that take
            us out of the building.
          </p>
        </div>
      </section>

      {/* FEATURED EVENT */}
      <section className="pb-20">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <Link
            href={`/events/${feature.slug}`}
            className="group relative grid overflow-hidden rounded-3xl bg-ink lg:grid-cols-[1fr_1fr]"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto">
              <Image
                src={feature.cover}
                alt={feature.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/80 via-ink/30 to-transparent" />
              <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                Featured
              </div>
            </div>
            <div className="p-10 md:p-14 flex flex-col justify-between gap-10">
              <div className="flex items-start gap-6">
                <div className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-center backdrop-blur">
                  <div className="text-xs font-semibold tracking-[0.2em] text-accent">{f.month}</div>
                  <div className="mt-1 text-4xl font-bold text-white tracking-tight">{f.day}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    {feature.category}
                  </div>
                  <h2 className="mt-2 h-display text-3xl md:text-5xl text-white">{feature.title}</h2>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed max-w-md">{feature.description}</p>
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="space-y-1 text-sm text-white/70">
                  <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> {f.weekday} · {f.time}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {feature.location}</div>
                </div>
                <span className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ink group-hover:bg-accent group-hover:text-white transition-colors">
                  Details <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* LIST */}
      <section className="border-t border-ink-100 pb-32 pt-16">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <h2 className="h-display text-3xl md:text-5xl text-ink mb-12">All upcoming.</h2>
          <ul className="divide-y divide-ink-100 border-y border-ink-100">
            {rest.map((e) => {
              const d = formatDate(e.starts);
              return (
                <li key={e.slug}>
                  <Link
                    href={`/events/${e.slug}`}
                    className="group grid items-center gap-6 py-8 md:grid-cols-[auto_1fr_auto]"
                  >
                    <div className="rounded-xl bg-bg-soft border border-ink-100 px-5 py-3 text-center min-w-[5.5rem]">
                      <div className="text-[10px] font-semibold tracking-[0.2em] text-accent">{d.month}</div>
                      <div className="text-2xl font-bold text-ink tracking-tight">{d.day}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                        {e.category} · {d.weekday} · {d.time}
                      </div>
                      <div className="mt-1.5 text-2xl font-bold text-ink tracking-tight group-hover:text-accent transition-colors">
                        {e.title}
                      </div>
                      <div className="mt-1 text-sm text-ink-500 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> {e.location}
                      </div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-ink-300 transition-all group-hover:text-accent group-hover:rotate-45 hidden md:block" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
