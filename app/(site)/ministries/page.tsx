import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ministries } from "@/lib/mock";

export const metadata = { title: "Ministries" };

export default function MinistriesPage() {
  return (
    <>
      {/* HEADER */}
      <section className="pt-40 pb-12 md:pt-48">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Get connected
          </div>
          <h1 className="h-display text-5xl md:text-7xl lg:text-8xl text-ink max-w-4xl">
            There's a place for you here.
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-ink-500 leading-relaxed">
            Every ministry exists to help you take a next step — toward Jesus, toward each other,
            toward the city. Pick one and show up. We'll meet you there.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="pb-32">
        <div className="mx-auto grid w-full max-w-[80rem] gap-6 px-6 md:grid-cols-2 md:px-10 lg:grid-cols-3">
          {ministries.map((m) => (
            <Link
              key={m.slug}
              href={`/ministries/${m.slug}`}
              className="group relative overflow-hidden rounded-3xl bg-ink"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={m.cover}
                  alt={m.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    {m.meets}
                  </div>
                  <div className="mt-2 h-display text-3xl md:text-4xl text-white">
                    {m.title}
                  </div>
                  <p className="mt-3 text-white/80 leading-relaxed">{m.summary}</p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    Explore <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
