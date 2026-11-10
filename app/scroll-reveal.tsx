"use client";

import { useEffect, useRef, type ReactNode } from "react";
import "./interaction-motion.css";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  group?: boolean;
  stagger?: number;
  direction?: "up" | "left" | "pop";
  waitForImage?: boolean;
  spread?: boolean;
  distance?: number;
};

/** Animate the existing layout elements, keeping grid placement and hover transforms intact. */
export function ScrollReveal({ children, className, group = false, stagger = 90, direction = "up", waitForImage = false, spread = false, distance = 24 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || reducedMotion.matches || !window.IntersectionObserver || !root.animate) return;

    const elements = group ? Array.from(root.children).filter((child): child is HTMLElement => child instanceof HTMLElement) : [root];
    const animations = new Map<HTMLElement, Animation>();
    const imageListeners: (() => void)[] = [];
    const fan = spread && group && window.matchMedia("(min-width: 901px)").matches;
    elements.forEach((element, index) => {
      const offset = (elements.length - 1) / 2 - index;
      const frames: Keyframe[] = direction === "pop" ? [
        { opacity: 0, scale: 0.88, translate: "0 18px", rotate: "1.5deg", offset: 0 },
        { opacity: 1, scale: 1.025, translate: "0 -3px", rotate: "-0.5deg", offset: 0.7 },
        { opacity: 1, scale: 1, translate: "0 0", rotate: "0deg", offset: 1 },
      ] : [
        { opacity: 0, translate: fan ? `${offset * 70}px 28px` : direction === "left" ? `-${distance}px 0` : `0 ${distance}px`, rotate: fan ? `${offset * 5}deg` : "0deg" },
        { opacity: 1, translate: "0 0", rotate: "0deg" },
      ];
      const animation = element.animate(frames, { duration: direction === "pop" ? 850 : 700, delay: group ? index * stagger : 0, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
      animation.pause();
      animations.set(element, animation);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        const animation = animations.get(element);
        const image = waitForImage ? element.querySelector("img") : null;
        if (image && !image.complete) {
          const play = () => animation?.play();
          image.addEventListener("load", play, { once: true });
          image.addEventListener("error", play, { once: true });
          imageListeners.push(() => {
            image.removeEventListener("load", play);
            image.removeEventListener("error", play);
          });
        } else {
          animation?.play();
        }
        observer.unobserve(element);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });

    elements.forEach((element) => observer.observe(element));
    const showImmediately = () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      imageListeners.forEach((remove) => remove());
    };
    // Keyboard navigation and a changed motion preference must never leave controls hidden.
    root.addEventListener("focusin", showImmediately);
    reducedMotion.addEventListener("change", showImmediately);
    return () => {
      showImmediately();
      root.removeEventListener("focusin", showImmediately);
      reducedMotion.removeEventListener("change", showImmediately);
    };
  }, [group, stagger, direction, waitForImage, spread, distance]);

  return <div ref={ref} className={className} data-scroll-reveal={group ? "group" : direction}>{children}</div>;
}
