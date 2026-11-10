"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials, testimonialsPerPage, wrapTestimonialPage } from "./testimonials-content";
import "./testimonials-carousel.css";
import { ScrollReveal } from "./scroll-reveal";

export function TestimonialsCarousel() {
  const [page, setPage] = useState(0);
  const reducedMotion = useReducedMotion();
  const pageCount = Math.ceil(testimonials.length / testimonialsPerPage);
  const visible = testimonials.slice(page * testimonialsPerPage, (page + 1) * testimonialsPerPage);
  const navigate = (step: number) => setPage((current) => wrapTestimonialPage(current + step));

  return <section className="testimonials-section container" aria-labelledby="testimonials-title">
    <ScrollReveal className="testimonials-heading" distance={12}>
      <span className="eyebrow">CERITA DARI MEJA DUNDEE</span>
      <h2 id="testimonials-title">Makan bareng.<br /><em>Cerita bareng.</em></h2>
      <p className="testimonials-preview">Contoh testimoni · bukan ulasan pelanggan.</p>
    </ScrollReveal>
    <div className="testimonials-carousel" role="region" aria-roledescription="carousel" aria-label="Contoh testimoni" onKeyDown={(event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        navigate(event.key === "ArrowRight" ? 1 : -1);
      }
    }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div className="testimonials-grid" key={page} role="group" aria-label={`Halaman ${page + 1} dari ${pageCount}`}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}>
          {visible.map((testimonial, index) => <motion.figure className="testimonial-card" key={testimonial.id}
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : index * 0.07 }}>
            <Quote className="testimonial-quote-icon" size={27} strokeWidth={1.5} aria-hidden="true" />
            <blockquote><p>{testimonial.quote}</p></blockquote>
            <figcaption><span className="testimonial-avatar" aria-hidden="true">{testimonial.initials.replaceAll(".", "").replaceAll(" ", "")}</span><span><strong>{testimonial.initials}</strong><small>Contoh testimoni</small></span></figcaption>
          </motion.figure>)}
        </motion.div>
      </AnimatePresence>
      <div className="testimonial-navigation">
        <span className="testimonial-page-count" role="status" aria-live="polite" aria-atomic="true">{String(page + 1).padStart(2, "0")} <span>/ {String(pageCount).padStart(2, "0")}</span></span>
        <div className="testimonial-dots" aria-label="Pilih halaman testimoni">{Array.from({ length: pageCount }, (_, index) => <button key={index} type="button" aria-label={`Tampilkan halaman testimoni ${index + 1}`} aria-pressed={page === index} onClick={() => setPage(index)}><span /></button>)}</div>
        <div className="testimonial-arrows"><button type="button" className="testimonial-control" onClick={() => navigate(-1)} aria-label="Testimoni sebelumnya"><ArrowLeft size={19} aria-hidden="true" /></button><button type="button" className="testimonial-control" onClick={() => navigate(1)} aria-label="Testimoni berikutnya"><ArrowRight size={19} aria-hidden="true" /></button></div>
      </div>
    </div>
  </section>;
}
