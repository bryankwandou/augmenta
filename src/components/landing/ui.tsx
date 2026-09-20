import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { cn } from "@/lib/cn";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.16" />
      <circle
        cx="16"
        cy="16"
        r="8.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <circle
        cx="16"
        cy="16"
        r="4.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="16" cy="16" r="1.35" fill="currentColor" />
    </svg>
  );
}

export function MagneticButton({
  children,
  className,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        gsap.to(el, { x: x * 0.22, y: y * 0.28, duration: 0.35, ease: "power3.out" });
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: "power3.out" });
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-7 py-3.5",
        "bg-fg text-bg font-medium tracking-tight",
        "transition-transform duration-150 ease-out active:scale-[0.96]",
        "text-[15px]",
        className,
      )}
    >
      {children}
    </button>
  );
}

function useInView(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-revealed");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        el.style.transitionDelay = `${delay}s`;
        el.classList.add("is-revealed");
        io.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return ref;
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useInView(delay);
  return (
    <div ref={ref} className={cn("reveal-up", className)}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
      {children}
    </p>
  );
}
