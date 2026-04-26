import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Coffee, Users, Baby, Music } from "lucide-react";
import { brand } from "@/lib/brand";
import { Section } from "@/components/site/section";

export const metadata = { title: "Plan your visit" };

const faqs = [
  {
    q: "What should I wear?",
    a: "Whatever's clean. You'll see jeans, you'll see suits, you'll see flip-flops. Come comfortable.",
  },
  {
    q: "How long is the service?",
    a: "About 70 minutes. We start on time and end on time.",
  },
  {
    q: "Will I be asked to give money?",
    a: "No. We take an offering, but as a guest you should feel zero pressure. We mean it.",
  },
  {
    q: "What about my kids?",
    a: "Kindred Kids runs during both services for ages 0–6th grade. Background-checked staff and secure check-in. Students (7–12th) meet Wednesdays.",
  },
  {
    q: "Is there parking?",
    a: "Free on-site parking with greeters at every entrance. First-time guest parking is reserved near the south entrance.",
  },
  {
    q: "What if I have questions or want to talk to someone?",
    a: "Stop by the welcome table after the service or text us at " + brand.contact.phone + ". A real person texts back.",
  },
];

export default function VisitPage() {
  return (
    <>
      {/* HERO with photo */}
      <section className="relative overflow-hidden min-h-[80svh]">
        <Image
          src="https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=2400&q=80"
          alt="Sunday morning"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.9) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.15) 50%, transparent 75%)" }} />

        <div className="relative mx-auto flex min-h-[80svh] w-full max-w-[80rem] flex-col justify-end px-6 pb-20 pt-32 md:px-10 md:pb-28">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            Plan your visit
          </div>
          <h1 className="h-display text-white text-5xl md:text-7xl lg:text-8xl max-w-4xl">
            We saved you a seat.
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-white/80 leading-relaxed">
            Here's everything you need to know before walking in for the first time.
          </p>
        </div>
      </section>

      {/* DETAILS GRID */}
      <Section id="times">
        <div className="mx-auto grid w-full max-w-[80rem] gap-6 px-6 md:grid-cols-2 md:px-10 lg:grid-cols-4">
          <DetailCard icon={<Clock />} label="Service times" value="Sundays · 9 & 11 AM" sub="Two identical services" />
          <DetailCard icon={<MapPin />} label="Address" value={brand.address.line1} sub={brand.address.line2} />
          <DetailCard icon={<Coffee />} label="Coffee" value="Open at 8:30" sub="On us — every week" />
          <DetailCard icon={<Users />} label="Greeters" value="At every entrance" sub="Just say hi" />
        </div>
      </Section>

      {/* WHAT TO EXPECT */}
      <section className="border-y border-ink-100 bg-bg-soft py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-[80rem] gap-16 px-6 md:px-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink">
            <Image
              src="https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=1600&q=80"
              alt="Worship service"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              What to expect
            </div>
            <h2 className="h-display text-4xl md:text-6xl text-ink">
              70 minutes. No surprises.
            </h2>
            <ol className="mt-10 space-y-8">
              <Step n="01" title="Music (about 20 min)" body="A few songs together. Stand or sit, sing or don't. Whatever feels right." />
              <Step n="02" title="A talk from the Bible (about 35 min)" body="One of our pastors opens a passage of Scripture and unpacks it for normal life. We try to be honest." />
              <Step n="03" title="Communion + sending (about 15 min)" body="We share bread and a cup, take an offering (no pressure), and send each other into the week." />
            </ol>
          </div>
        </div>
      </section>

      {/* FOR FAMILIES */}
      <Section eyebrow="For families" title="Bring the kids. Bring the teenagers.">
        <div className="mx-auto grid w-full max-w-[80rem] gap-6 px-6 md:grid-cols-2 md:px-10">
          <FamilyCard
            icon={<Baby className="h-5 w-5" />}
            title="Kindred Kids · 0–6th grade"
            body="Secure check-in, background-checked volunteers, age-appropriate environments. Available during both services."
          />
          <FamilyCard
            icon={<Music className="h-5 w-5" />}
            title="Students · 7–12th grade"
            body="Middle and high school meet Wednesdays from 6:30–8:30 PM during the school year. Real conversations, real friendships."
          />
        </div>
      </Section>

      {/* MAP */}
      <section className="pb-24">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-bg-soft border border-ink-100">
              <Image
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2000&q=80"
                alt="Map placeholder"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/30 to-transparent" />
              <div className="absolute bottom-6 left-6 rounded-2xl bg-white p-5 shadow-[var(--shadow-card)] max-w-xs">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Kindred Church
                </div>
                <div className="mt-2 font-bold text-ink">{brand.address.line1}</div>
                <div className="text-ink-500">{brand.address.line2}</div>
              </div>
            </div>
            <div>
              <h3 className="h-display text-3xl md:text-5xl text-ink">
                Easy to find. Easy to park.
              </h3>
              <p className="mt-6 text-lg text-ink-500 leading-relaxed">
                We're on the corner of Carver and Main. First-time guests get reserved spots near
                the south entrance — look for the blue signs.
              </p>
              <Link
                href={`https://maps.google.com/?q=${encodeURIComponent(brand.address.line1 + " " + brand.address.line2)}`}
                target="_blank"
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white hover:bg-accent transition-colors"
              >
                Open in Maps <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink-100 bg-bg-soft py-24 md:py-32">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                FAQ
              </div>
              <h2 className="h-display text-4xl md:text-6xl text-ink">
                Common questions, honest answers.
              </h2>
            </div>
            <div className="divide-y divide-ink-100 border-y border-ink-100">
              {faqs.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
                    <span className="text-lg font-semibold text-ink">{f.q}</span>
                    <span className="mt-1 text-2xl font-light text-ink-400 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-ink-500 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function DetailCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-bg p-7">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-50 text-accent">
        {icon}
      </div>
      <div className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">{label}</div>
      <div className="mt-2 text-xl font-bold text-ink tracking-tight">{value}</div>
      <div className="text-ink-500 text-sm mt-1">{sub}</div>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-5">
      <div className="font-mono text-sm font-semibold text-accent pt-1">{n}</div>
      <div>
        <div className="text-xl font-bold text-ink tracking-tight">{title}</div>
        <p className="mt-2 text-ink-500 leading-relaxed">{body}</p>
      </div>
    </li>
  );
}

function FamilyCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-bg p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-50 text-accent">
        {icon}
      </div>
      <div className="mt-6 text-2xl font-bold text-ink tracking-tight">{title}</div>
      <p className="mt-3 text-ink-500 leading-relaxed">{body}</p>
    </div>
  );
}
