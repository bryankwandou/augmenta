import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MagneticButton } from "./ui";

export function Hero({
  onReserve,
  ready,
}: {
  onReserve: () => void;
  ready: boolean;
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ready) return;
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        el.querySelectorAll("[data-hero-in]"),
        { y: 28, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.1 },
        0.15,
      );
      tl.fromTo(
        el.querySelector("[data-hero-media]"),
        { scale: 1.12 },
        { scale: 1, duration: 1.8, ease: "power2.out" },
        0,
      );
    }, el);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] overflow-hidden bg-hero-from text-fg"
    >
      <div className="absolute inset-0 overflow-hidden" data-hero-media>
        <video
          className="hero-ken absolute inset-0 h-full w-full object-cover object-[80%_center]"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero.jpg"
          aria-hidden="true"
        >
          <source src="/images/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-r from-hero-from/50 via-transparent to-transparent max-md:from-bg/65 max-md:via-bg/20" />
        <div className="absolute inset-0 bg-linear-to-t from-bg/40 via-transparent to-bg/15 md:from-transparent" />
      </div>

      <Orbits />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-24 pt-28 md:justify-center md:px-12 md:pb-16 lg:px-16">
        <div className="max-w-xl">
          <p
            data-hero-in
            className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-fg/80"
          >
            Gateway to your augmented self
          </p>
          <h1
            data-hero-in
            className="mt-5 font-display text-[2.7rem] font-semibold leading-[0.95] tracking-[-0.04em] md:text-6xl lg:text-[4.4rem]"
          >
            A window
            <br />
            of coming
            <br />
            enhancements
          </h1>
          <p
            data-hero-in
            className="mt-6 max-w-md text-[15px] leading-relaxed text-fg/80 md:text-base"
          >
            A future where carbon fiber, titanium, and human instinct align. Not
            machine. Not human. Something wonderfully poised between.
          </p>
          <div data-hero-in className="mt-8">
            <MagneticButton onClick={onReserve}>Reserve Now</MagneticButton>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-8 top-[42%] z-10 hidden -translate-y-1/2 flex-col items-end gap-20 lg:flex">
        <OrbitStat value="10+" label="Years real" />
        <OrbitStat value="40+" label="Use forms" className="mr-8" />
        <OrbitStat value="95%" label="Repeat members" />
      </div>
    </section>
  );
}

function OrbitStat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-baseline gap-2">
        <span className="size-1.5 rounded-full bg-fg" />
        <span className="font-display text-3xl font-semibold tracking-tight">{value}</span>
      </div>
      <p className="mt-1 pl-3.5 text-[10px] uppercase tracking-[0.22em] text-fg/70">
        {label}
      </p>
    </div>
  );
}

function Orbits() {
  return (
    <svg
      className="pointer-events-none absolute -right-[18%] top-1/2 hidden h-[140%] w-[78%] -translate-y-1/2 text-fg/25 lg:block"
      viewBox="0 0 800 800"
      fill="none"
      aria-hidden="true"
    >
      <g className="orbit-spin">
        <circle cx="400" cy="400" r="220" stroke="currentColor" strokeWidth="1" />
        <circle cx="400" cy="400" r="300" stroke="currentColor" strokeWidth="1" />
        <circle cx="400" cy="400" r="380" stroke="currentColor" strokeWidth="1" />
        <circle cx="620" cy="220" r="3" fill="currentColor" />
        <circle cx="760" cy="400" r="3" fill="currentColor" />
        <circle cx="640" cy="620" r="3" fill="currentColor" />
      </g>
    </svg>
  );
}
