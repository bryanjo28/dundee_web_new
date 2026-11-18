import "./faq.css";
import { ArrowDown } from "lucide-react";
import { faqs } from "./faq-content";

// Native <details> accordion: no JavaScript, keyboard accessible, and the
// answers stay in the HTML so crawlers read them even while collapsed.
export function FaqSection() {
  return <section className="faq-section container" id="faq">
    <div className="faq-grid">
      <div className="faq-heading">
        <span className="eyebrow">SEBELUM KAMU DATANG</span>
        <h2>Yang sering<br /><em>ditanyain.</em></h2>
        <p>Masih ada yang mau ditanya? Tim Dundee siap bantu lewat WhatsApp.</p>
        <a className="text-link" href="#pesan">Hubungi kami <ArrowDown size={18} aria-hidden="true" /></a>
      </div>
      <div className="faq-list">
        {faqs.map((faq) => <details className="faq-item" key={faq.id}>
          <summary>{faq.question}<span aria-hidden="true">+</span></summary>
          <p>{faq.answer}</p>
        </details>)}
      </div>
    </div>
  </section>;
}
