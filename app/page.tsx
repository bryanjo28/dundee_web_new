import "./hero-layout.css";
import "./story-section.css";
import "./hero-theme.css";
import Image from "next/image";
import Link from "next/link";
import { AnnouncementRibbon } from "./announcement-ribbon";
import { restaurant } from "./restaurant-content";
import { AnimatedText } from "./animated-text";
import { SlideUpText } from "./slide-up-text";
import { FeaturedMenu } from "./featured-menu";
import { TestimonialsCarousel } from "./testimonials-carousel";
import { FaqSection } from "./faq";
import { ScrollReveal } from "./scroll-reveal";
import { StructuredData } from "./structured-data";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Home() {
  return <>
    <StructuredData page="home" />
    <main>
      <section className="hero-band"><div className="hero container">
        <div className="hero-copy"><span className="eyebrow"><i /> MADE FOR GOOD TIMES</span><h1><AnimatedText>Lapar boleh.</AnimatedText><br /><AnimatedText delay={180}>Makan harus</AnimatedText>{" "}<em><AnimatedText highlight delay={480}>seru.</AnimatedText></em></h1><p>Steak juicy, rice yang comforting, chicken yang bikin rebutan. Pilih favoritmu, kumpulkan orang-orangmu.</p><div className="hero-actions"><a className="button" href="#pesan">Pesan Sekarang <ArrowUpRight size={18} aria-hidden="true" /></a><a className="text-link" href="#menu">Lihat Menu <ArrowDown size={18} aria-hidden="true" /></a></div><div className="hero-proof"><span className="proof-stars" aria-label="Lima bintang">★★★★★</span><span>Enak dinikmati bareng-bareng</span></div></div>
        <ScrollReveal className="hero-stage" waitForImage><div className="hero-image" data-slot="hero">{restaurant.heroImage ? <Image src={restaurant.heroImage} alt="Hidangan favorit Dundee" fill priority sizes="(max-width: 650px) 100vw, (max-width: 1200px) 58vw, 720px" /> : <Image src="/assets/food/chicken-steak.webp" alt="Menu steak dan ayam favorit Dundee" fill priority sizes="(max-width: 650px) 100vw, (max-width: 1200px) 58vw, 720px" />}</div><span className="hero-sticker">GOOD<br />FOOD<br /><b>GOOD<br />MOOD!</b></span><div className="hero-caption"><span>01 / THE GOOD STUFF</span><span>Steak · Rice · Chicken</span></div></ScrollReveal>
      </div></section>
      <AnnouncementRibbon />
      <FeaturedMenu />
      <section className="story-section" id="cerita"><div className="container story-grid"><ScrollReveal className="story-art story-location" direction="pop" waitForImage><div className="story-photo"><Image src="/assets/location.webp" alt="Gerai Dundee dengan papan menu dan pelanggan di depan konter" width={448} height={452} sizes="(max-width: 650px) 90vw, 448px" /></div><span className="story-sticker">GATHER<br />& EAT!</span></ScrollReveal><div className="story-copy"><span className="eyebrow">CERITA DI BALIK MEJA</span><h2><SlideUpText emphasize="rame.">Makanan enak tuh makin enak kalau rame.</SlideUpText></h2><p>{restaurant.story}</p><div className="perks"><div><b>01</b><span>Rasa yang bikin<br />pengen balik</span></div><div><b>02</b><span>Menu buat<br />semua selera</span></div><div><b>03</b><span>Paling pas<br />buat rame-rame</span></div></div></div></div></section>
      <TestimonialsCarousel />
      <section className="order-section" id="pesan"><div className="container order-inner"><ScrollReveal distance={12}><span className="eyebrow">HUBUNGI DUNDEE</span><h2><AnimatedText>Info franchise</AnimatedText><br /><AnimatedText delay={160}>&amp; pemesanan.</AnimatedText></h2><p>Untuk informasi franchise atau pemesanan langsung, hubungi tim Dundee melalui WhatsApp.</p></ScrollReveal><ScrollReveal className="order-action" distance={12}>{restaurant.whatsapp ? <a className="button button-light" href={`https://wa.me/${restaurant.whatsapp}`} target="_blank" rel="noopener noreferrer">Hubungi Kami <ArrowUpRight size={18} aria-hidden="true" /></a> : <a className="button button-light" href="#kunjungi">Pesan Sekarang <ArrowUpRight size={18} aria-hidden="true" /></a>}<span>Tanya franchise atau pesan menu favoritmu.<br />Langsung lewat WhatsApp.</span></ScrollReveal><svg className="order-spark" aria-hidden="true" focusable="false" viewBox="0 0 100 100" width="1em" height="1em" fill="currentColor"><path d="M42 0h16v31l22-22 11 11-22 22h31v16H69l22 22-11 11-22-22v31H42V69L20 91 9 80l22-22H0V42h31L9 20 20 9l22 22Z" /></svg></div></section>
      <section className="visit-section container" id="kunjungi"><ScrollReveal className="visit-heading" group stagger={80} distance={12}><span className="eyebrow">MEJA KAMU MENUNGGU</span><h2>Main ke Dundee.</h2><p>Makan bareng, ketawa bareng. Begini harusnya.</p></ScrollReveal><div className="visit-card"><ScrollReveal className="visit-pin"><span>⌖</span><small>COME<br />ON IN!</small></ScrollReveal><ScrollReveal className="visit-details" group stagger={100}><span className="eyebrow">FIND YOUR WAY</span><h3>Temukan Dundee</h3><p>{restaurant.address || "Info lokasi Dundee segera hadir. Simpan dulu halaman ini, ya!"}</p>{restaurant.hours && <p className="visit-hours">Buka: {restaurant.hours}</p>}</ScrollReveal><ScrollReveal className="visit-links">{restaurant.mapsUrl ? <a className="button" href={restaurant.mapsUrl} target="_blank" rel="noopener noreferrer">Buka petunjuk arah <ArrowUpRight size={18} aria-hidden="true" /></a> : <span className="location-soon">Detail lokasi menyusul</span>}<Link className="text-link" href="/lokasi">Info lokasi lengkap <ArrowUpRight size={18} aria-hidden="true" /></Link>{restaurant.whatsapp && <a className="text-link" href={`https://wa.me/${restaurant.whatsapp}`} target="_blank" rel="noopener noreferrer">Tanya dulu via WhatsApp ↗</a>}</ScrollReveal></div></section>
      <FaqSection />
    </main>
  </>;
}
