import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { CASES, MODULES, STATS, STEPS, TIERS } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Eyebrow, MagneticButton, Mark, Reveal } from "./ui";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lines = el.querySelectorAll<HTMLElement>(".line-mask");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lines.forEach((n) => n.classList.add("is-revealed"));
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        lines.forEach((n, i) => {
          n.style.transitionDelay = `${i * 0.12}s`;
          n.classList.add("is-revealed");
        });
        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lines = ["The next evolution", "isn't digital.", "It's biological."];

  return (
    <section ref={ref} className="bg-bg px-5 py-24 md:px-12 md:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-[2.4rem] leading-[1.05] tracking-[-0.03em] text-fg md:text-6xl lg:text-[5.2rem]">
          {lines.map((line) => (
            <span key={line} className="line-mask">
              <span>{line}</span>
            </span>
          ))}
        </h2>
        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-20">
          <Reveal>
            <Eyebrow>The Adaptive Line</Eyebrow>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
              Four private commissions, grown to a single nervous system. Not a
              catalogue. A conversation with the body you already have.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Reserved Access</Eyebrow>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
              A limited cohort each season. We say no more often than yes — not
              as theatre, but because a module that does not fit is a failure.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function StatsStrip() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nums = el.querySelectorAll<HTMLElement>("[data-count]");
    const play = () => {
      nums.forEach((node) => {
        const target = Number(node.dataset.count);
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            node.textContent = String(Math.round(obj.n));
          },
        });
      });
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        play();
        io.disconnect();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-y border-line bg-bg px-5 py-10 md:px-12 lg:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="font-display text-4xl font-semibold tracking-tight tabular-nums md:text-5xl">
              <span data-count={s.value}>0</span>
              {s.suffix}
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Marquee() {
  const items = [
    "Neural Lace",
    "Ocular Array",
    "Kinetic Sleeve",
    "Dermal Shield",
    "Cartography",
    "Integration",
  ];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-line bg-bg py-5">
      <div className="marquee-track gap-10 px-6">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-display text-sm uppercase tracking-[0.28em] text-faint"
          >
            {item}
            <span className="size-1 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function AdaptiveLine() {
  return (
    <section id="modules" className="scroll-mt-24 bg-bg px-5 py-24 md:px-12 md:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>The Adaptive Line</Eyebrow>
          <h2 className="mt-4 max-w-xl font-serif text-4xl leading-[1.08] tracking-[-0.03em] md:text-5xl">
            Four modules. One body. Chosen, not given.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.06}>
              <a
                href="#demo"
                className="group block overflow-hidden rounded-xl bg-bg-elevated"
              >
                <div className="relative aspect-4/5 overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-bg/80 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 font-sans text-[11px] tracking-[0.22em] text-fg/80">
                    {m.tag}
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.16em]">
                    {m.name}
                  </p>
                  <p className="mt-1 text-[13px] text-muted">{m.line}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseRecords() {
  return (
    <section id="cases" className="scroll-mt-24 bg-bg px-5 py-24 md:px-12 md:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>Case Records</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl">
            Stories from the first cohort.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {CASES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <article className="group relative overflow-hidden rounded-xl">
                <div className="aspect-16/10 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-fg/70">
                    {c.module} · {c.place}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                    {c.title}
                  </h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mx-auto mt-16 max-w-2xl text-center font-serif text-2xl leading-snug text-fg/90 md:text-3xl">
            The Adaptive Line is not a product catalogue. It is a series of
            private commissions, each one fitted to a single nervous system.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Biotech() {
  return (
    <section id="biotech" className="scroll-mt-24 bg-bg px-5 py-24 md:px-12 md:py-32 lg:px-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Biotech</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl">
              From scan to synapse.
            </h2>
          </Reveal>
          <ol className="mt-12 space-y-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <li className="grid grid-cols-[auto_1fr] gap-5 border-t border-line pt-6">
                  <span className="font-display text-sm tracking-[0.2em] text-accent">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">
                      {s.copy}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal>
          <div className="overflow-hidden rounded-xl">
            <img
              src="/images/neural.jpg"
              alt="Neural lace integration portrait"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Tiers() {
  return (
    <section id="tiers" className="scroll-mt-24 bg-bg px-5 py-24 md:px-12 md:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>Tiers of access</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl">
            Not a membership. A relationship.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-xl border p-6 md:p-8",
                  t.featured
                    ? "border-fg/25 bg-fg text-bg"
                    : "border-line bg-bg-elevated",
                )}
              >
                <p
                  className={cn(
                    "text-[11px] uppercase tracking-[0.22em]",
                    t.featured ? "text-bg/60" : "text-muted",
                  )}
                >
                  {t.kicker}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                  {t.name}
                </h3>
                <p className="mt-1 font-serif text-3xl">{t.price}</p>
                <p
                  className={cn(
                    "mt-5 text-[15px] leading-relaxed",
                    t.featured ? "text-bg/75" : "text-muted",
                  )}
                >
                  {t.copy}
                </p>
                <ul className="mt-8 space-y-2 text-sm">
                  {t.points.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span
                        className={cn(
                          "size-1 rounded-full",
                          t.featured ? "bg-bg" : "bg-accent",
                        )}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LiveDemo() {
  const [active, setActive] = useState(0);
  const mod = MODULES[active] ?? MODULES[0];

  return (
    <section id="demo" className="scroll-mt-24 bg-bg px-5 py-24 md:px-12 md:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>Live Demo</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl">
            Fit a module to the field.
          </h2>
        </Reveal>
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col gap-2">
            {MODULES.map((m, i) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-lg border px-5 py-4 text-left transition-colors duration-200",
                  i === active
                    ? "border-fg/30 bg-fg text-bg"
                    : "border-line bg-bg-elevated text-fg hover:border-line-strong",
                )}
              >
                <span className="text-[11px] uppercase tracking-[0.22em] opacity-60">
                  {m.tag}
                </span>
                <span className="mt-1 block font-display text-lg font-semibold tracking-tight">
                  {m.name}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-[13px]",
                    i === active ? "text-bg/70" : "text-muted",
                  )}
                >
                  {m.line}
                </span>
              </button>
            ))}
          </div>
          <div className="overflow-hidden rounded-xl bg-bg-elevated">
            <div className="relative aspect-16/10">
              <img
                key={mod.image}
                src={mod.image}
                alt={mod.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent" />
            </div>
            <div className="p-6 md:p-8">
              <p className="max-w-lg text-[15px] leading-relaxed text-muted">{mod.copy}</p>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
                {mod.specs.map((s) => (
                  <div key={s.k}>
                    <dt className="text-[11px] uppercase tracking-[0.2em] text-faint">
                      {s.k}
                    </dt>
                    <dd className="mt-1 font-display text-lg font-semibold tabular-nums">
                      {s.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Connect({ id = "connect" }: { id?: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const record = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      intent: String(data.get("intent") ?? ""),
      at: Date.now(),
    };
    try {
      localStorage.setItem("augmenta-case-record", JSON.stringify(record));
    } catch {
      /* private mode */
    }
    setSent(true);
  }

  return (
    <section id={id} className="scroll-mt-24 bg-bg-warm px-5 py-24 md:px-12 md:py-32 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-end">
        <Reveal>
          <Eyebrow>Connect</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-6xl">
            A future already in motion.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            The Adaptive Line is accepting a limited cohort this season. Begin a
            case record and the atelier will answer within seven days.
          </p>
        </Reveal>
        <Reveal>
          {sent ? (
            <div className="rounded-xl border border-line bg-bg p-8">
              <p className="font-display text-2xl font-semibold tracking-tight">
                Record received.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                Your file is held in this browser. A human at the Institute
                would take it from here — in this preview, that is the whole
                gesture.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <Field name="name" label="Name" autoComplete="name" required />
              <Field
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                required
              />
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted">
                  Intent
                </span>
                <select
                  name="intent"
                  data-native-cursor
                  className="mt-2 h-12 w-full rounded-lg border border-line bg-bg px-4 text-[15px] text-fg outline-none focus:border-fg/40"
                  defaultValue="Commission"
                >
                  <option>Observe</option>
                  <option>Commission</option>
                  <option>Legacy</option>
                </select>
              </label>
              <div className="pt-2">
                <MagneticButton type="submit">Begin your case record</MagneticButton>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.22em] text-muted">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        data-native-cursor
        className="mt-2 h-12 w-full rounded-lg border border-line bg-bg px-4 text-[15px] text-fg outline-none placeholder:text-faint focus:border-fg/40"
      />
    </label>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg px-5 py-10 md:px-12 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Mark className="size-8 text-fg" />
          <span className="font-display text-sm font-semibold tracking-[0.18em] uppercase">
            Augmenta
          </span>
        </div>
        <p className="text-[12px] uppercase tracking-[0.18em] text-faint">
          Studio · Case Records · Privacy · Index
        </p>
        <p className="text-[12px] text-faint">
          © 2026 Augmenta Institute. All systems reserved.
        </p>
      </div>
    </footer>
  );
}
