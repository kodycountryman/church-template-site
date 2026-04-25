import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { posts } from "@/lib/mock";

export const metadata = { title: "Journal" };

export default function BlogPage() {
  const [feature, ...rest] = posts;
  return (
    <>
      {/* HEADER */}
      <section className="pt-40 pb-12 md:pt-48">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            The Kindred Journal
          </div>
          <h1 className="h-display text-5xl md:text-7xl lg:text-8xl text-ink max-w-3xl">Journal.</h1>
          <p className="mt-8 max-w-xl text-lg text-ink-500 leading-relaxed">
            Essays, updates, and the slow work of saying what we mean.
          </p>
        </div>
      </section>

      {/* FEATURED */}
      <section className="pb-20">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <Link href={`/blog/${feature.slug}`} className="group grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-bg-soft">
              <Image src={feature.cover} alt={feature.title} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" priority />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Featured · {feature.tag}
              </div>
              <h2 className="mt-4 h-display text-3xl md:text-5xl text-ink group-hover:text-accent transition-colors">
                {feature.title}
              </h2>
              <p className="mt-5 text-lg text-ink-500 leading-relaxed">{feature.excerpt}</p>
              <div className="mt-8 flex items-center gap-4">
                <Image src={feature.authorAvatar} alt={feature.author} width={40} height={40} className="rounded-full" />
                <div className="text-sm">
                  <div className="font-semibold text-ink">{feature.author}</div>
                  <div className="text-ink-400">{feature.date} · {feature.readTime} read</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* GRID */}
      <section className="border-t border-ink-100 pb-32 pt-16">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <h2 className="h-display text-3xl md:text-5xl text-ink mb-12">More.</h2>
          <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-bg-soft">
                  <Image src={p.cover} alt={p.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{p.tag}</div>
                <div className="mt-2 text-xl font-bold text-ink tracking-tight group-hover:text-accent transition-colors">{p.title}</div>
                <p className="mt-2 text-ink-500 leading-relaxed">{p.excerpt}</p>
                <div className="mt-4 flex items-center gap-3 text-sm text-ink-400">
                  <Image src={p.authorAvatar} alt="" width={28} height={28} className="rounded-full" />
                  <span>{p.author}</span>
                  <span>·</span>
                  <span>{p.readTime} read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
