import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Mark } from "./ui";
import { Hero } from "./hero";
import {
  AdaptiveLine,
  Biotech,
  CaseRecords,
  Connect,
  Footer,
  LiveDemo,
  Manifesto,
  Marquee,
  StatsStrip,
  Tiers,
} from "./sections";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

let smooth: Lenis | null = null;

export function scrollToId(id: string) {
  const target = `#${id}`;
  if (smooth) {
    smooth.scrollTo(target, { offset: -16 });
    return;
  }
  document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
}

export function LandingPage() {
  const [booting, setBooting] = useState(true);

  return (
    <>
      {booting ? <Loader onDone={() => setBooting(false)} /> : null}
      <SmoothScroll disabled={booting}>
        <Cursor />
        <div className="grain" aria-hidden="true" />
        <Progress />
        <Nav hidden={booting} />
        <main>
          <Hero ready={!booting} onReserve={() => scrollToId("connect")} />
          <Manifesto />
          <StatsStrip />
          <Marquee />
          <AdaptiveLine />
          <CaseRecords />
          <Biotech />
          <AtelierBand />
          <Tiers />
          <LiveDemo />
          <Connect />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}

function AtelierBand() {
  return (
    <div className="relative h-[46vh] min-h-64 overflow-hidden md:h-[58vh]">
      <img
        src="/images/atelier.jpg"
        alt="The Augmenta atelier at night"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-bg/40" />
      <p className="absolute bottom-8 left-5 font-serif text-2xl text-fg md:left-12 md:text-4xl lg:left-16">
        Grown in the atelier. Worn for a life.
      </p>
    </div>
  );
}

function SmoothScroll({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled: boolean;
}) {
  useEffect(() => {
    if (disabled) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.09,
      smoothWheel: true,
    });
    smooth = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      smooth = null;
    };
  }, [disabled]);

  return <>{children}</>;
}

function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const bar = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const obj = { n: 0 };
    const tween = gsap.to(obj, {
      n: 100,
      duration: 1.65,
      ease: "power2.inOut",
      onUpdate: () => {
        const n = Math.round(obj.n);
        setPct(n);
        if (bar.current) bar.current.style.width = `${n}%`;
      },
      onComplete: () => {
        gsap.to("[data-loader]", {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
          delay: 0.12,
          onComplete: () => {
            document.body.style.overflow = "";
            doneRef.current();
          },
        });
      },
    });
    return () => {
      tween.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      data-loader
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg px-6 py-8 text-fg md:px-12"
    >
      <div className="flex items-center gap-3">
        <Mark className="size-8" />
        <span className="font-display text-sm font-semibold uppercase tracking-[0.22em]">
          Augmenta
        </span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <p className="font-serif text-3xl md:text-5xl">Human evolution</p>
        <p className="font-display text-5xl font-semibold tabular-nums tracking-tight md:text-7xl">
          {String(pct).padStart(2, "0")}
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-line">
        <div ref={bar} className="h-px w-0 bg-accent" />
      </div>
    </div>
  );
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    document.documentElement.classList.add("has-cursor");
    const pos = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    let seen = false;
    const move = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!seen) {
        seen = true;
        if (dot.current) dot.current.style.opacity = "1";
        if (ring.current) ring.current.style.opacity = "1";
      }
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
    };
    window.addEventListener("pointermove", move);
    let raf = 0;
    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg opacity-0 mix-blend-difference lg:block"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg/50 opacity-0 mix-blend-difference lg:block"
      />
    </>
  );
}

function Progress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: 0.25,
          start: "top top",
          end: "bottom bottom",
        },
      },
    );
    return () => {
      tween.kill();
    };
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-px origin-left bg-transparent">
      <div ref={ref} className="h-px origin-left scale-x-0 bg-accent" />
    </div>
  );
}

function Nav({ hidden }: { hidden: boolean }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function go(id: string) {
    setOpen(false);
    scrollToId(id);
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 transition-opacity duration-500",
          hidden ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <nav
          className={cn(
            "flex w-full max-w-4xl items-center justify-between gap-2 rounded-full px-2 py-1.5",
            "border border-fg/10 bg-bg/45 backdrop-blur-md",
            solid && "bg-bg/80",
          )}
        >
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex min-h-11 items-center gap-2 rounded-full py-1.5 pr-3 pl-1.5"
            aria-label="Augmenta home"
          >
            <Mark className="size-8 text-fg" />
            <span className="hidden font-display text-[13px] font-semibold uppercase tracking-[0.18em] sm:inline">
              Augmenta
            </span>
          </button>
          <ul className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => go(item.id)}
                  className="rounded-full px-3 py-2 text-[13px] text-fg/80 transition-colors hover:text-fg"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => go("connect")}
              className="min-h-11 rounded-full bg-fg px-4 py-2 text-[13px] font-medium text-bg transition-transform duration-150 active:scale-[0.96]"
            >
              Connect
            </button>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      {open ? (
        <div className="fixed inset-0 z-40 bg-bg px-6 pt-24 md:hidden">
          <ul className="flex flex-col gap-2">
            {NAV.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => go(item.id)}
                  className="w-full rounded-lg py-4 text-left font-serif text-3xl"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
