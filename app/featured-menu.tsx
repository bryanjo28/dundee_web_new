import "./menu-effects.css";
import Image from "next/image";
import { Utensils } from "lucide-react";
import { SlideUpText } from "./slide-up-text";
import { ScrollReveal } from "./scroll-reveal";
import { FeaturedFan } from "./featured-fan";
import "./menu-refinements.css";

const favorites = [
  { name: "Chicken Steak", note: "Ayam bersaus, nasi hangat, dan sayuran dalam satu piring.", image: "chicken-steak-hero.png", category: "Steak", spotlight: true },
  { name: "Ayam Bakar Belacan", note: "Ayam bakar dengan sambal belacan dan nasi hangat.", image: "chicken balacan.png", category: "Rice", spotlight: false },
  { name: "Chicken Pepper", note: "Ayam bersaus lada dengan kentang goreng.", image: "chicken pepper.jpeg", category: "Chicken", spotlight: false },
];
const moreDishes = [
  { name: "Chicken Cheese", image: "chicken cheese.jpeg", category: "Chicken" },
  { name: "Chicken Serundeng", image: "Chicken serundeng.jpeg", category: "Rice" },
  { name: "Cheese Golden Chick", image: "Cheese golden chick.jpg", category: "Chicken" },
  { name: "Nasi Goreng", image: "nasi goreng top.jpg", category: "Rice" },
  { name: "Nasi Udang", image: "Nasi udang.jpg", category: "Rice" },
];

export function FeaturedMenu() {
  return <section className="menu-section container" id="menu">
    <div className="section-top menu-heading">
      <div><span className="eyebrow">DARI DAPUR DUNDEE</span><h2><SlideUpText>Yang mana dulu nih?</SlideUpText></h2></div>
    </div>
    <FeaturedFan>
      {[favorites[1], favorites[0], favorites[2]].map((dish) => <article className={`food-card${dish.spotlight ? " food-card-spotlight" : ""}`} key={dish.name}>
        <div className="food-card-photo">
          <span className="food-category"><Utensils size={12} aria-hidden="true" />{dish.category}</span>
          <Image src={`/assets/food/${dish.image}`} alt={dish.name} fill sizes="(max-width: 650px) 90vw, (max-width: 900px) 45vw, 32vw" />
        </div>
        <div className="food-card-copy"><div><h3>{dish.name}</h3><p>{dish.note}</p></div></div>
      </article>)}
    </FeaturedFan>
    <div className="more-menu-heading"><span>Masih ada yang lain.</span><span>Semua ini bagian dari dapur kami</span></div>
    <ScrollReveal className="more-menu-grid" group stagger={75}>{moreDishes.map((dish) => <article className="small-food-card" key={dish.name}>
      <div className="small-food-photo"><Image src={`/assets/food/${dish.image}`} alt={dish.name} fill sizes="(max-width: 650px) 45vw, (max-width: 900px) 30vw, 20vw" /></div>
      <div><p className="small-food-category">{dish.category}</p><h3>{dish.name}</h3></div>
    </article>)}</ScrollReveal>
    {/* <p className="menu-note">Foto hidangan Dundee. Untuk harga dan ketersediaan, langsung tanya tim kami.</p> */}
  </section>;
}
