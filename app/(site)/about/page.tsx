import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brand } from "@/lib/brand";
import { beliefs, leaders } from "@/lib/mock";
import { Section } from "@/components/site/section";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-bg pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            About Kindred
          </div>
          <h1 className="h-display text-5xl md:text-7xl lg:text-8xl text-ink max-w-4xl">
            We're a church for people who don't usually go to church.
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-ink-500 leading-relaxed">
            {brand.description} We started in 2019 with twelve people in a living room. We're not
            twelve people anymore — but we still want you to feel like you're being introduced
            personally.
          </p>
        </div>
      </section>

      {/* STORY IMAGE */}
      <section className="relative">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-bg-soft">
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2400&q=80"
              alt="Kindred congregation"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* STORY COPY */}
      <Section eyebrow="Our story" title="Twelve people, one living room, a lot of folding chairs.">
        <div className="mx-auto grid w-full max-w-[80rem] gap-12 px-6 md:px-10 lg:grid-cols-2">
          <div className="space-y-5 text-lg text-ink-500 leading-relaxed">
            <p>
              In the spring of 2019, a handful of friends started meeting on Sunday nights in a
              living room on the west side of Greenville. There was no band, no logo, and no
              children's program — just a question: what would a church look like if it was honest,
              hospitable, and actually rooted in the neighborhood?
            </p>
            <p>
              Six months later we'd outgrown the house. We rented the back room of a coffee shop,
              then a school cafeteria, then a warehouse on Carver Street that's been our home
              since 2022.
            </p>
          </div>
          <div className="space-y-5 text-lg text-ink-500 leading-relaxed">
            <p>
              We've grown to about 600 people across two Sunday services. We have small groups in
              fourteen neighborhoods. We support nine local nonprofits and a refugee resettlement
              program with 78% of our budget.
            </p>
            <p>
              We're not a perfect church. But we're trying — week by week, one welcome table at a
              time — to be the kind of family the people around us are quietly hoping exists.
            </p>
          </div>
        </div>
      </Section>

      {/* BELIEFS */}
      <section className="bg-bg-soft border-y border-ink-100 py-24 md:py-32">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="mb-16 md:mb-20 max-w-3xl">
            <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              What we believe
            </div>
            <h2 className="h-display text-4xl md:text-6xl lg:text-7xl text-ink">
              Old convictions, said plainly.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((b, i) => (
              <div key={b.title} className="rounded-2xl border border-ink-100 bg-bg p-8">
                <div className="font-mono text-xs text-ink-400 mb-3">0{i + 1}</div>
                <div className="text-2xl font-bold text-ink tracking-tight">{b.title}</div>
                <p className="mt-3 text-ink-500 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <Section eyebrow="Leadership" title="The people you'd ask for if you walked in on a Sunday." intro="Our staff and elders are easy to find. Here's who's who.">
        <div className="mx-auto grid w-full max-w-[80rem] gap-x-6 gap-y-12 px-6 md:grid-cols-2 md:px-10 lg:grid-cols-3">
          {leaders.map((l) => (
            <div key={l.name}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bg-soft">
                <Image
                  src={l.avatar}
                  alt={l.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="mt-5">
                <div className="text-xl font-bold text-ink tracking-tight">{l.name}</div>
                <div className="mt-1 text-sm font-medium text-accent">{l.role}</div>
                <p className="mt-3 text-ink-500 leading-relaxed">{l.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="pb-32">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="rounded-3xl bg-ink p-10 md:p-16 text-center">
            <h3 className="h-display text-4xl md:text-6xl text-white max-w-3xl mx-auto">
              The next step is just walking in.
            </h3>
            <Link
              href="/visit"
              className="mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-white px-8 text-base font-semibold text-ink transition-all hover:bg-accent hover:text-white"
            >
              Plan your visit <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
