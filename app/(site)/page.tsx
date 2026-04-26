import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Play, Sparkles } from "lucide-react";
import { brand } from "@/lib/brand";
import { Section } from "@/components/site/section";
import { ServiceCountdown } from "@/components/site/service-countdown";
import { HeroParallax } from "@/components/site/motion/hero-parallax";
import { Reveal } from "@/components/site/motion/reveal";
import { AnimatedText } from "@/components/site/motion/animated-text";
import { StaggerChildren } from "@/components/site/motion/stagger-children";
import { Counter } from "@/components/site/motion/counter";
import { HeroHeadline } from "@/components/site/motion/hero-headline";
import { blurUp, scaleIn } from "@/lib/motion";

export default function Home() {
  return (
    <>
      {/* HERO — full-bleed video */}
      <section className="relative min-h-[100svh] overflow-hidden bg-[#0a0a0a]">
        {/* Parallax wrapper — scales slightly larger to hide parallax gap */}
        <HeroParallax>
          {/* B-roll video — autoplay, muted, loop */}
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            className="absolute inset-0 h-[115%] w-full object-cover"
            poster="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=2400&q=80"
          >
            {/* "Vibrant Worship Experience in Modern Church" by A.J. Groomes / Pexels */}
            <source
              src="https://videos.pexels.com/video-files/33743585/14326164_2044_1080_30fps.mp4"
              type="video/mp4"
            />
            <source
              src="https://videos.pexels.com/video-files/33743585/14326163_1364_720_30fps.mp4"
              type="video/mp4"
            />
          </video>

          {/* gradient overlays — vertical dim + left vignette for headline legibility */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,10,10,0.60) 0%, rgba(10,10,10,0.45) 40%, rgba(10,10,10,0.90) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.2) 45%, transparent 70%)",
            }}
          />
        </HeroParallax>

        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[80rem] flex-col justify-end px-6 pb-16 pt-32 md:px-10 md:pb-24">
          <div className="mb-16" />

          {/* Hero headline — animated after letterbox clears (~1.4s) */}
          <HeroHeadline />

          <Reveal variants={blurUp} delay={1.3}>
            <p className="mt-8 max-w-xl text-lg md:text-xl text-white/80 leading-relaxed">
              {brand.description}
            </p>
          </Reveal>

          <Reveal delay={1.55}>
            <div className="mt-10">
              <ServiceCountdown />
            </div>
          </Reveal>

          <Reveal delay={1.75}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/visit"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-8 text-base font-semibold text-ink transition-all hover:bg-accent hover:text-white hover:-translate-y-1 transition-transform duration-200"
              >
                Plan your visit
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
              <Link
                href="/sermons"
                className="group inline-flex h-14 items-center gap-3 rounded-full border border-white/30 bg-white/5 px-8 text-base font-medium text-white backdrop-blur-md transition-all hover:bg-white/10 hover:-translate-y-1 transition-transform duration-200"
              >
                <Play className="h-4 w-4 fill-current" />
                Watch latest message
              </Link>
            </div>
          </Reveal>

          {/* meta strip */}
          <Reveal delay={2.0}>
            <div className="mt-20 grid grid-cols-2 gap-8 border-t border-white/15 pt-8 md:grid-cols-4">
              <Meta label="Gathering" value="Sundays · 9 & 11 AM" />
              <Meta label="Location" value="Greenville, SC" />
              <Meta label="Online" value="Watch live" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Community</div>
                <div className="mt-2 text-white font-medium">
                  <Counter end={600} suffix="+ weekly" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THIS SUNDAY */}
      <Section eyebrow="This Sunday" title="What to expect when you walk in.">
        <StaggerChildren
          className="mx-auto grid w-full max-w-[80rem] gap-6 px-6 md:grid-cols-3 md:px-10"
          stagger={0.12}
        >
          <Card
            icon={<Calendar className="h-5 w-5" />}
            title="9:00 & 11:00 AM"
            body="Two identical services, about 70 minutes. Doors open thirty minutes early — coffee is on us."
            href="/visit#times"
          />
          <Card
            icon={<MapPin className="h-5 w-5" />}
            title="412 Carver Street"
            body="Free parking on-site with greeters at every entrance. We'll show you exactly where to go."
            href="https://www.google.com/maps/search/?api=1&query=412+Carver+Street+Greenville+SC+29601"
            external
          />
          <Card
            icon={<Play className="h-5 w-5" />}
            title="Kids & Students"
            body="Engaging programs for ages 0–12 during both services. Middle and high school meet Wednesday nights."
            href="/ministries/kindred-kids"
          />
        </StaggerChildren>
      </Section>

      {/* LATEST SERMON FEATURE */}
      <section className="relative overflow-hidden border-y border-ink-100 bg-bg-soft">
        <div className="mx-auto grid w-full max-w-[80rem] gap-12 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal variants={scaleIn} className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink shadow-[var(--shadow-elevated)]">
            <Link
              href="/sermons/on-rest-and-the-arithmetic-of-grace"
              className="group block absolute inset-0"
              aria-label="Watch: The Long Obedience"
            >
              <Image
                src="https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1600&q=80"
                alt="Pastor James Eldridge speaking"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  <span>Message 4</span>
                  <span>Hebrews 4:1–11</span>
                </div>
                <div>
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                    <Play className="h-5 w-5 fill-current" />
                  </div>
                  <div className="mt-6 text-2xl font-bold text-white tracking-tight leading-tight">
                    The Long Obedience
                  </div>
                  <div className="mt-1 text-sm text-white/70">James Eldridge · 38 min</div>
                </div>
              </div>
            </Link>
          </Reveal>

          <div>
            <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Now playing
            </div>
            <AnimatedText
              as="h2"
              text="On rest, and the arithmetic of grace."
              className="h-display text-5xl md:text-7xl text-ink leading-[0.95]"
            />
            <Reveal variants={blurUp} delay={0.2}>
              <p className="mt-6 max-w-lg text-lg text-ink-500 leading-relaxed">
                Pastor James Eldridge opens Hebrews 4 — what it means to enter rest in a world that
                measures worth in output.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  href="/sermons/on-rest-and-the-arithmetic-of-grace"
                  className="inline-flex h-14 items-center gap-3 rounded-full bg-ink px-8 text-base font-semibold text-white transition-all hover:bg-accent hover:-translate-y-1 transition-transform duration-200"
                >
                  <Play className="h-4 w-4 fill-current" /> Watch · 38 min
                </Link>
                <Link
                  href="/sermons"
                  className="text-ink-500 hover:text-ink transition-colors text-sm font-medium"
                >
                  Browse all sermons →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MINISTRIES TEASER GRID */}
      <Section eyebrow="Get connected" title="There's a place for you here." intro="Whether you're brand new or have been around for a while, we'd love to know you by name.">
        <StaggerChildren
          className="mx-auto grid w-full max-w-[80rem] gap-6 px-6 md:grid-cols-2 md:px-10 lg:grid-cols-3"
          stagger={0.12}
        >
          {[
            {
              title: "Small groups",
              body: "Mid-week communities of 8–12 people meeting in homes across the city.",
              img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
            },
            {
              title: "Kids & students",
              body: "Safe, fun, age-appropriate environments for every kid from infants through high school.",
              img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
            },
            {
              title: "Local outreach",
              body: "Tutoring, refugee resettlement, food pantry partnerships — every month, citywide.",
              img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
            },
          ].map((m) => (
            <Link
              key={m.title}
              href="/ministries"
              className="group relative overflow-hidden rounded-2xl bg-bg-soft transition-all hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={m.img}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <div className="text-2xl font-bold text-white tracking-tight">
                    {m.title}
                  </div>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">{m.body}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    Explore <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </StaggerChildren>
      </Section>

      {/* GIVE CTA */}
      <Section className="!pt-0 !pb-32">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-ink p-10 md:p-20">
              {/* accent glow */}
              <div
                aria-hidden
                className="absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full"
                style={{ background: "radial-gradient(closest-side, rgba(37,99,235,0.45), transparent)" }}
              />
              <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-6">
                    Generosity
                  </div>
                  <AnimatedText
                    as="h2"
                    text="Every dollar goes to people, not stages."
                    className="h-display text-5xl md:text-7xl text-white leading-[0.95] max-w-2xl"
                  />
                  <Reveal variants={blurUp} delay={0.2}>
                    <p className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed">
                      We publish our budget every quarter. 78% of giving funds local benevolence,
                      refugee resettlement, and our partner schools.
                    </p>
                  </Reveal>
                </div>
                <Reveal delay={0.3}>
                  <div className="flex flex-col gap-3 lg:items-end">
                    <Link
                      href="/give"
                      className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-white px-8 text-base font-semibold text-ink transition-all hover:bg-accent hover:text-white hover:-translate-y-1 transition-transform duration-200 lg:w-auto"
                    >
                      Give now
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/about"
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      See where it goes →
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">{label}</div>
      <div className="mt-2 text-white font-medium">{value}</div>
    </div>
  );
}

function Card({
  icon,
  title,
  body,
  href,
  external,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-50 text-accent">
        {icon}
      </div>
      <div className="mt-8 text-2xl font-bold text-ink tracking-tight flex items-center gap-2">
        {title}
        {href && <ArrowUpRight className="h-4 w-4 text-ink-300 opacity-0 -translate-y-0.5 transition-all group-hover:opacity-100 group-hover:text-accent" />}
      </div>
      <p className="mt-3 text-ink-500 leading-relaxed">{body}</p>
    </>
  );

  const cls = "group relative rounded-2xl border border-ink-100 bg-bg p-8 transition-all hover:border-accent/30 hover:shadow-[var(--shadow-card)] hover:-translate-y-1 duration-200 block";

  if (href && external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
  }
  if (href) {
    return <Link href={href} className={cls}>{inner}</Link>;
  }
  return <div className={cls.replace(" block", "")}>{inner}</div>;
}
