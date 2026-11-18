"use client";

import { useState, type PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { testimonials, testimonialsPerPage, wrapTestimonialPage } from "./testimonials-content";
import "./testimonials-carousel.css";
import { ScrollReveal } from "./scroll-reveal";

// Where the reviews come from is hidden from the UI on purpose. To show the
// source again, restore `import { restaurant } from "./restaurant-content";`
// and uncomment the two marked lines below.

export function TestimonialsCarousel() {
  const [page, setPage] = useState(0);
  const reducedMotion = useReducedMotion();
  const pageCount = Math.ceil(testimonials.length / testimonialsPerPage);
  const visible = testimonials.slice(page * testimonialsPerPage, (page + 1) * testimonialsPerPage);
  const navigate = (step: number) => setPage((current) => wrapTestimonialPage(current + step));
  const paged = pageCount > 1;

  // Warm highlight that follows the pointer across the hovered card. Written to
  // CSS custom properties so the movement itself stays on the compositor.
  const trackPointer = (event: ReactPointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return <section className="testimonials-section container" id="testimoni" aria-labelledby="testimonials-title">
    <ScrollReveal className="testimonials-heading" distance={12}>
      <span className="eyebrow">CERITA DARI MEJA DUNDEE</span>
      <h2 id="testimonials-title">Makan bareng.<br /><em>Cerita bareng.</em></h2>
      {/* Source line hidden by request. To restore: <p className="testimonials-source">Ulasan asli pelanggan di <a href={restaurant.googleBusiness} target="_blank" rel="noopener noreferrer">Google</a></p> */}
    </ScrollReveal>
    <div className="testimonials-carousel" role="region" aria-roledescription={paged ? "carousel" : undefined} aria-label="Testimoni" onKeyDown={(event) => {
      if (!paged) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        navigate(event.key === "ArrowRight" ? 1 : -1);
      }
    }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div className="testimonials-grid" key={page} role="group" aria-label={paged ? `Halaman ${page + 1} dari ${pageCount}` : "Ulasan pelanggan"}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}>
          {visible.map((testimonial, index) => <motion.figure className="testimonial-card" key={testimonial.id}
            onPointerMove={trackPointer}
            initial={reducedMotion ? false : { opacity: 0, y: 34, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={reducedMotion ? undefined : { y: -8, transition: { type: "spring", stiffness: 300, damping: 24, delay: 0 } }}
            viewport={{ once: true, amount: 0.2 }}
            transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 17, delay: index * 0.08 }}>
            <span className="testimonial-mark" aria-hidden="true">&rdquo;</span>
            <div className="testimonial-meta">
              <Quote className="testimonial-quote-icon" size={24} strokeWidth={1.5} aria-hidden="true" />
              <div className="testimonial-rating" role="img" aria-label={`${testimonial.rating} dari 5 bintang`}>
                {Array.from({ length: 5 }, (_, star) => <Star key={star} className={star < testimonial.rating ? undefined : "is-empty"} size={15} strokeWidth={star < testimonial.rating ? 0 : 1.5} fill={star < testimonial.rating ? "currentColor" : "none"} aria-hidden="true" />)}
              </div>
            </div>
            <blockquote><p>{testimonial.quote}</p></blockquote>
            <figcaption><span className="testimonial-avatar" aria-hidden="true">{testimonial.name.split("...")[0]}</span><span><strong>{testimonial.name}</strong>{/* Source label hidden by request. To restore: <small>{testimonial.source}</small> */}</span></figcaption>
          </motion.figure>)}
        </motion.div>
      </AnimatePresence>
      <div className="testimonial-navigation" hidden={!paged}>
        <span className="testimonial-page-count" role="status" aria-live="polite" aria-atomic="true">{String(page + 1).padStart(2, "0")} <span>/ {String(pageCount).padStart(2, "0")}</span></span>
        <div className="testimonial-dots" aria-label="Pilih halaman testimoni">{Array.from({ length: pageCount }, (_, index) => <button key={index} type="button" aria-label={`Tampilkan halaman testimoni ${index + 1}`} aria-pressed={page === index} onClick={() => setPage(index)}><span /></button>)}</div>
        <div className="testimonial-arrows"><button type="button" className="testimonial-control" onClick={() => navigate(-1)} aria-label="Testimoni sebelumnya"><ArrowLeft size={19} aria-hidden="true" /></button><button type="button" className="testimonial-control" onClick={() => navigate(1)} aria-label="Testimoni berikutnya"><ArrowRight size={19} aria-hidden="true" /></button></div>
      </div>
    </div>
  </section>;
}
