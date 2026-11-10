"use client";

import "./menu-effects.css";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** A once-only reveal. Text stays readable without JavaScript or with reduced motion. */
export function AnimatedText({ children, highlight = false, delay = 0 }: {
  children: ReactNode;
  highlight?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.dataset.visible = "true";
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <span ref={ref} className={highlight ? "text-highlight" : "text-reveal"} style={{ "--text-delay": `${delay}ms` } as CSSProperties}>{children}</span>;
}
