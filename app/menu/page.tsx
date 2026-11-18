import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StructuredData } from "../structured-data";
import { dishes, dishesByCategory, menuCategories } from "../menu-items";
import { restaurant } from "../restaurant-content";
import { menuPage } from "../site";
import "../site-pages.css";

export const metadata: Metadata = {
  title: menuPage.title,
  description: menuPage.description,
  alternates: { canonical: menuPage.path },
  openGraph: {
    url: menuPage.path,
    title: menuPage.title,
    description: menuPage.description,
  },
};

const whatsappUrl = restaurant.whatsapp ? `https://wa.me/${restaurant.whatsapp}` : undefined;

export default function MenuPage() {
  return <>
    <StructuredData page="menu" />
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow"><i /> MENU DUNDEE</span>
          <h1>Steak, rice,<br /><em>dan chicken.</em></h1>
          <p className="page-lede">
            {dishes.length} hidangan dalam tiga bagian. Semuanya dimasak di dapur Dundee,
            Royal Plaza Surabaya, dan paling enak dimakan selagi hangat.
          </p>
          <div className="page-actions">
            {whatsappUrl && <a className="button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Pesan lewat WhatsApp <ArrowUpRight size={18} aria-hidden="true" /></a>}
            <Link className="text-link" href="/lokasi">Lokasi &amp; jam buka</Link>
          </div>
        </div>
      </section>

      {menuCategories.map((category, index) => {
        const items = dishesByCategory(category);
        return <section className="menu-group container" id={category.toLowerCase()} key={category}>
          <div className="menu-group-head">
            <div>
              <span className="eyebrow">BAGIAN {String(index + 1).padStart(2, "0")}</span>
              <h2>{category}</h2>
            </div>
            <span className="menu-group-count">{items.length} hidangan</span>
          </div>
          <div className="menu-page-grid">
            {items.map((dish) => <article className="menu-card" key={dish.id}>
              <div className="menu-card-photo">
                <Image src={dish.image} alt={dish.name} fill sizes="(max-width: 650px) 50vw, (max-width: 900px) 45vw, (max-width: 1100px) 30vw, 22vw" />
              </div>
              <div className="menu-card-body">
                <span className="menu-card-category">{dish.category}</span>
                <h3>{dish.name}</h3>
                {dish.note && <p>{dish.note}</p>}
              </div>
            </article>)}
          </div>
        </section>;
      })}

      <div className="container">
        {/* No prices anywhere on this page on purpose: the published range is
            exposed only as Restaurant structured data. */}
        <div className="page-note">
          <div>
            <p><strong>Cara pesan.</strong> Langsung ke gerai di Royal Plaza, lewat WhatsApp, atau lewat GrabFood. GoFood belum tersedia, jadi belum bisa dipesan dari sana.</p>
            <p>Harga dan ketersediaan tiap hidangan bisa berubah. Tanya tim Dundee lewat WhatsApp untuk info terbaru.</p>
          </div>
          <div className="page-note-actions">
            {whatsappUrl && <a className="button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Tanya via WhatsApp <ArrowUpRight size={18} aria-hidden="true" /></a>}
            <Link className="text-link" href="/#kunjungi">Lihat lokasi</Link>
          </div>
        </div>
      </div>
    </main>
  </>;
}
