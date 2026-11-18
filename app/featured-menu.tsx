import "./menu-effects.css";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Utensils } from "lucide-react";
import { SlideUpText } from "./slide-up-text";
import { ScrollReveal } from "./scroll-reveal";
import { FeaturedFan } from "./featured-fan";
import { otherDishes, spotlightDishes } from "./menu-items";
import "./menu-refinements.css";

// The home page shows three dishes in full and names the rest, then sends
// anyone who wants the whole list to /menu.
export function FeaturedMenu() {
  return <section className="menu-section container" id="menu">
    <div className="section-top menu-heading">
      <div><span className="eyebrow">DARI DAPUR DUNDEE</span><h2><SlideUpText>Yang mana dulu nih?</SlideUpText></h2></div>
    </div>
    <FeaturedFan>
      {spotlightDishes.map((dish) => <article className={`food-card${dish.homeFan === 2 ? " food-card-spotlight" : ""}`} key={dish.id}>
        <div className="food-card-photo">
          <span className="food-category"><Utensils size={12} aria-hidden="true" />{dish.category}</span>
          <Image src={dish.image} alt={dish.name} fill sizes="(max-width: 650px) 90vw, (max-width: 900px) 45vw, 32vw" />
        </div>
        <div className="food-card-copy"><div><h3>{dish.name}</h3><p>{dish.note}</p></div></div>
      </article>)}
    </FeaturedFan>
    <div className="more-menu-heading"><span>Masih ada yang lain.</span><span>Semua ini bagian dari dapur kami</span></div>
    <ScrollReveal className="menu-teaser" group stagger={50}>
      <ul className="menu-teaser-list">
        {otherDishes.map((dish) => <li className="menu-teaser-item" key={dish.id}><span>{dish.category}</span><strong>{dish.name}</strong></li>)}
      </ul>
      <Link className="button menu-teaser-cta" href="/menu">Lihat semua menu <ArrowUpRight size={18} aria-hidden="true" /></Link>
    </ScrollReveal>
    {/* Prices are deliberately not shown on the page. The published range lives
        in `restaurant.priceRange` and is exposed only through the Restaurant
        JSON-LD, so it appears in search results but never in the UI. */}
    {/* <p className="menu-note">Foto hidangan Dundee. Untuk harga dan ketersediaan, langsung tanya tim kami.</p> */}
  </section>;
}
