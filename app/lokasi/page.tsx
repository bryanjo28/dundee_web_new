import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StructuredData } from "../structured-data";
import { restaurant } from "../restaurant-content";
import { locationPage } from "../site";
import "../site-pages.css";

export const metadata: Metadata = {
  title: locationPage.title,
  description: locationPage.description,
  alternates: { canonical: locationPage.path },
  openGraph: {
    url: locationPage.path,
    title: locationPage.title,
    description: locationPage.description,
  },
};

const whatsappUrl = restaurant.whatsapp ? `https://wa.me/${restaurant.whatsapp}` : undefined;

// 6281332666688 -> 0813-3266-6688, derived so the number is written down once.
const phoneLabel = `0${restaurant.whatsapp.slice(2)}`.replace(/^(\d{4})(\d{4})(\d+)$/, "$1-$2-$3");

export default function LocationPage() {
  return <>
    <StructuredData page="lokasi" />
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow"><i /> MAMPIR YUK</span>
          <h1>Ketemu di<br /><em>Royal Plaza.</em></h1>
          <p className="page-lede">
            Dundee ada di lantai 3 Royal Plaza, Jl. Ahmad Yani, Wonokromo, Surabaya.
            Buka setiap hari dari jam 10.00 sampai 21.30.
          </p>
          <div className="page-actions">
            {restaurant.mapsUrl && <a className="button" href={restaurant.mapsUrl} target="_blank" rel="noopener noreferrer">Buka petunjuk arah <ArrowUpRight size={18} aria-hidden="true" /></a>}
            {whatsappUrl && <a className="text-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Tanya via WhatsApp</a>}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="location-grid">
          <div className="location-card">
            <span className="eyebrow">ALAMAT</span>
            <h3>Royal Plaza Lt 3</h3>
            <p>{restaurant.address}</p>
          </div>
          <div className="location-card">
            <span className="eyebrow">JAM BUKA</span>
            <h3>Setiap hari</h3>
            <p className="location-strong">10.00 – 21.30</p>
            <p>Tanpa hari libur. Kalau mau datang menjelang tutup, sebaiknya kabari dulu lewat WhatsApp.</p>
          </div>
          <div className="location-card">
            <span className="eyebrow">PESAN ANTAR</span>
            <h3>GrabFood</h3>
            <p>Pesanan antar lewat GrabFood, atau langsung ke WhatsApp tim Dundee. GoFood belum tersedia.</p>
            {whatsappUrl && <a className="text-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Pesan lewat WhatsApp <ArrowUpRight size={16} aria-hidden="true" /></a>}
          </div>
          <div className="location-card">
            <span className="eyebrow">KONTAK</span>
            <h3>{phoneLabel}</h3>
            <p>WhatsApp untuk pemesanan, tanya menu, atau informasi franchise.</p>
            <a className="text-link" href={restaurant.instagram} target="_blank" rel="noopener noreferrer">Instagram @dundee_restaurant <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>

        <div className="page-note">
          <p><strong>Masih ada yang mau ditanya?</strong> Jam buka, cara pesan, dan menu Dundee sudah dirangkum di halaman utama. Kalau belum terjawab, tim Dundee siap bantu lewat WhatsApp.</p>
          <div className="page-note-actions">
            <Link className="text-link" href="/#faq">Baca FAQ</Link>
            <Link className="text-link" href="/menu">Lihat menu</Link>
          </div>
        </div>
      </div>
    </main>
  </>;
}
