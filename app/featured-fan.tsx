"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ScrollReveal } from "./scroll-reveal";
import "./featured-fan.css";

/** Adapt Animata's fanned product cards to the existing food photography. */
export function FeaturedFan({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  return <ScrollReveal className="favorites-grid featured-fan" group stagger={110} spread>
    {Children.toArray(children).map((child, index) => <motion.div
      className="featured-fan-item"
      key={index}
      initial={false}
      style={{ zIndex: index === 1 ? 3 : 1 }}
      whileHover={reducedMotion ? undefined : { y: -12, scale: 1.025, zIndex: 5 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}>
      {child}
    </motion.div>)}
  </ScrollReveal>;
}
