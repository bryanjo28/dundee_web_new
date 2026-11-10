"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import "./slide-up-text.css";

export function SlideUpText({ children, emphasize }: { children: string; emphasize?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    element.dataset.ready = "true";
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.visible = String(entry.isIntersecting);
    }, { threshold: 0.3, rootMargin: "0px 0px -32px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <span className="slide-up-text" ref={ref} aria-label={children}>
    {children.split(/\s+/).map((word, index) => <span key={`${word}-${index}`} aria-hidden="true">
      <span className="slide-up-mask"><span className="slide-up-word" style={{ "--word-delay": `${index * 85}ms` } as CSSProperties}>{word === emphasize ? <em>{word}</em> : word}</span></span>{" "}
    </span>)}
  </span>;
}
