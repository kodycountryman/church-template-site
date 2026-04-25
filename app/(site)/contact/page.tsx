import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { brand } from "@/lib/brand";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      {/* HEADER */}
      <section className="pt-40 pb-12 md:pt-48">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-10">
          <div className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Say hi
          </div>
          <h1 className="h-display text-5xl md:text-7xl lg:text-8xl text-ink max-w-3xl">
            We'd love to hear from you.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink-500 leading-relaxed">
            Questions, prayer requests, or just curious what we're about — a real person reads
            every message and writes back within a day.
          </p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="pb-32 pt-12">
        <div className="mx-auto grid w-full max-w-[80rem] gap-12 px-6 md:px-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <div className="rounded-3xl border border-ink-100 bg-bg p-8 md:p-10 shadow-[var(--shadow-card)]">
            <form className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="First name" placeholder="Sam" />
                <Field label="Last name" placeholder="Eldridge" />
              </div>
              <Field label="Email" type="email" placeholder="sam@example.com" />
              <Field label="Phone (optional)" type="tel" placeholder="(555) 555-1212" />

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                  What's this about?
                </label>
                <select className="mt-2 w-full rounded-xl border border-ink-100 bg-bg-soft px-4 py-3.5 text-ink font-medium focus:border-accent focus:bg-bg focus:outline-none">
                  <option>I'm new — tell me about visiting</option>
                  <option>I have a question</option>
                  <option>I'd like prayer</option>
                  <option>I want to get involved</option>
                  <option>Press / media</option>
                  <option>Something else</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Say as much or as little as you want."
                  className="mt-2 w-full rounded-xl border border-ink-100 bg-bg-soft px-4 py-3.5 text-ink placeholder:text-ink-300 focus:border-accent focus:bg-bg focus:outline-none resize-none"
                />
              </div>

              <button className="w-full inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-6 text-base font-semibold text-white hover:bg-accent transition-colors">
                Send message <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <InfoCard
              icon={<MapPin className="h-5 w-5" />}
              title="Visit us"
              lines={[brand.address.line1, brand.address.line2]}
            />
            <InfoCard
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              lines={[brand.contact.email]}
            />
            <InfoCard
              icon={<Phone className="h-5 w-5" />}
              title="Text or call"
              lines={[brand.contact.phone, "Mon–Fri · 9 AM – 5 PM"]}
            />

            <div className="rounded-2xl bg-ink p-6 text-white">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-3">
                Need prayer right now?
              </div>
              <p className="text-white/80 leading-relaxed">
                Text the word <span className="font-bold text-white">PRAY</span> to{" "}
                {brand.contact.phone}. Our care team will be in touch within an hour during the day,
                or first thing in the morning.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-ink-100 bg-bg-soft px-4 py-3.5 text-ink placeholder:text-ink-300 focus:border-accent focus:bg-bg focus:outline-none"
      />
    </div>
  );
}

function InfoCard({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-bg p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-50 text-accent">
        {icon}
      </div>
      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
        {title}
      </div>
      <div className="mt-1 space-y-0.5">
        {lines.map((l) => (
          <div key={l} className="font-medium text-ink">{l}</div>
        ))}
      </div>
    </div>
  );
}
