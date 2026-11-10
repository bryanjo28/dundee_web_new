import "./menu-effects.css";
import Image from "next/image";
import { Utensils } from "lucide-react";
import { SlideUpText } from "./slide-up-text";

const favorites = [
  { name: "Chicken Steak", note: "Ayam bersaus, nasi hangat, dan sayuran dalam satu piring.", image: "chicken-steak-hero.png", category: "Steak", spotlight: true },
  { name: "Chicken Serundeng", note: "Ayam renyah dengan taburan serundeng gurih.", image: "Chicken serundeng.jpeg", category: "Rice", spotlight: false },
  { name: "Chicken Pepper", note: "Ayam bersaus lada dengan kentang goreng.", image: "chicken pepper.jpeg", category: "Chicken", spotlight: false },
];
const moreDishes = [
  { name: "Chicken Cheese", image: "chicken cheese.jpeg" },
  { name: "Ayam Bakar Belacan", image: "chicken balacan.png" },
  { name: "Cheese Golden Chick", image: "Cheese golden chick.jpg" },
  { name: "Nasi Goreng", image: "nasi goreng top.jpg" },
  { name: "Nasi Udang", image: "Nasi udang.jpg" },
];

export function FeaturedMenu() {
  return <section className="menu-section container" id="menu">
    <div className="section-top menu-heading">
      <div><span className="eyebrow">DARI DAPUR DUNDEE</span><h2><SlideUpText>Yang mana dulu nih?</SlideUpText></h2></div>
    </div>
    <div className="favorites-grid">
      {favorites.map((dish) => <article className={`food-card${dish.spotlight ? " food-card-spotlight" : ""}`} key={dish.name}>
        <div className="food-card-photo">
          <span className="food-category"><Utensils size={12} aria-hidden="true" />{dish.category}</span>
          <Image src={`/assets/food/${dish.image}`} alt={dish.name} fill sizes="(max-width: 650px) 90vw, (max-width: 900px) 45vw, 32vw" />
          {dish.spotlight && <span className="food-signature">Satu piring,<br /><em>lengkap.</em></span>}
        </div>
        <div className="food-card-copy"><div><h3>{dish.name}</h3><p>{dish.note}</p></div><span className="food-card-arrow" aria-hidden="true"><Utensils size={18} /></span></div>
      </article>)}
    </div>
    <div className="more-menu-heading"><span>Masih ada yang lain.</span><span>Semua ini bagian dari dapur kami</span></div>
    <div className="more-menu-grid">{moreDishes.map((dish) => <article className="small-food-card" key={dish.name}>
      <div className="small-food-photo"><Image src={`/assets/food/${dish.image}`} alt={dish.name} fill sizes="(max-width: 650px) 45vw, (max-width: 900px) 30vw, 20vw" /></div>
      <div><h3>{dish.name}</h3><Utensils size={17} aria-hidden="true" /></div>
    </article>)}</div>
    {/* <p className="menu-note">Foto hidangan Dundee. Untuk harga dan ketersediaan, langsung tanya tim kami.</p> */}
  </section>;
}
