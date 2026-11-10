import "./story-section.css";
import "./hero-theme.css";
import Image from "next/image";
import { AnnouncementRibbon } from "./announcement-ribbon";
import { CopyrightYear } from "./copyright-year";
import { restaurant } from "./restaurant-content";
import { ScrollHeader } from "./scroll-header";
import { AnimatedText } from "./animated-text";
import { SlideUpText } from "./slide-up-text";
import { FeaturedMenu } from "./featured-menu";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Home() {
  return <>
    <ScrollHeader>
      <nav className="nav-glass container" aria-label="Navigasi utama">
        <a className="brand" href="#beranda" aria-label="Dundee, beranda"><Image src="/assets/dundee_logo.png" alt="" width={60} height={60} priority /><span>DUNDEE<small>STEAK · RICE · CHICKEN</small></span></a>
        <div className="desktop-links"><a href="#menu">Menu</a><a href="#cerita">Cerita kami</a><a href="#kunjungi">Lokasi</a></div>
        <a className="button nav-action" href={restaurant.whatsapp ? `https://wa.me/${restaurant.whatsapp}` : "#pesan"}>Pesan Sekarang <ArrowUpRight size={18} aria-hidden="true" /></a>
        <details className="mobile-nav"><summary aria-label="Buka navigasi">Menu <span aria-hidden="true">☰</span></summary><div><a href="#menu">Menu</a><a href="#cerita">Cerita kami</a><a href="#kunjungi">Lokasi</a><a href="#pesan">Pesan sekarang</a></div></details>
      </nav>
    </ScrollHeader>
    <main>
      <section className="hero-band"><div className="hero container">
        <div className="hero-copy"><span className="eyebrow"><i /> MADE FOR GOOD TIMES</span><h1><AnimatedText>Lapar boleh.</AnimatedText><br /><AnimatedText delay={180}>Makan harus</AnimatedText>{" "}<em><AnimatedText highlight delay={480}>seru.</AnimatedText></em></h1><p>Steak juicy, rice yang comforting, chicken yang bikin rebutan. Pilih favoritmu, kumpulkan orang-orangmu.</p><div className="hero-actions"><a className="button" href="#pesan">Pesan Sekarang <ArrowUpRight size={18} aria-hidden="true" /></a><a className="text-link" href="#menu">Lihat Menu <ArrowDown size={18} aria-hidden="true" /></a></div><div className="hero-proof"><span className="proof-stars" aria-label="Lima bintang">★★★★★</span><span>Enak dinikmati bareng-bareng</span></div></div>
        <div className="hero-stage"><div className="hero-image" data-slot="hero">{restaurant.heroImage ? <Image src={restaurant.heroImage} alt="Hidangan favorit Dundee" fill priority sizes="(max-width: 650px) 100vw, (max-width: 1200px) 58vw, 720px" /> : <Image src="/assets/food/chicken_steak.png" alt="Menu steak dan ayam favorit Dundee" fill priority sizes="(max-width: 650px) 100vw, (max-width: 1200px) 58vw, 720px" />}</div><span className="hero-sticker">GOOD<br />FOOD<br /><b>GOOD<br />MOOD!</b></span><div className="hero-caption"><span>01 / THE GOOD STUFF</span><span>Steak · Rice · Chicken</span></div></div>
      </div></section>
      <AnnouncementRibbon />
      <FeaturedMenu />
      <section className="story-section" id="cerita"><div className="container story-grid"><div className="story-art story-location"><div className="story-photo"><Image src="/assets/location.png" alt="Gerai Dundee dengan papan menu dan pelanggan di depan konter" width={448} height={452} sizes="(max-width: 650px) 90vw, 448px" /></div><span className="story-sticker">GATHER<br />& EAT!</span></div><div className="story-copy"><span className="eyebrow">CERITA DI BALIK MEJA</span><h2><SlideUpText emphasize="rame.">Makanan enak tuh makin enak kalau rame.</SlideUpText></h2><p>{restaurant.story}</p><div className="perks"><div><b>01</b><span>Rasa yang bikin<br />pengen balik</span></div><div><b>02</b><span>Menu buat<br />semua selera</span></div><div><b>03</b><span>Paling pas<br />buat rame-rame</span></div></div></div></div></section>
      <section className="quote-section container"><span className="eyebrow">KATA MEREKA</span><div className="quote-card"><span className="quote-mark">“</span><div><p>Tempat yang pas buat makan enak tanpa banyak mikir. Semua di meja punya favoritnya sendiri.</p><span className="quote-by">— Catatan dari meja Dundee <i>★★★★★</i></span></div><span className="quote-doodle" aria-hidden="true">♥</span></div></section>
      <section className="order-section" id="pesan"><div className="container order-inner"><div><span className="eyebrow">WAKTUNYA MAKAN</span><h2><AnimatedText>Udah kebayang</AnimatedText><br />rasanya, kan?</h2><p>Yuk, ajak temanmu dan tentukan menu andalan hari ini.</p></div><div className="order-action">{restaurant.whatsapp ? <a className="button button-light" href={`https://wa.me/${restaurant.whatsapp}`} target="_blank" rel="noopener noreferrer">Pesan via WhatsApp <span>↗</span></a> : <a className="button button-light" href="#kunjungi">Pesan Sekarang <span>↗</span></a>}<span>Steak · Rice · Chicken<br />Bikin hari biasa jadi lebih seru.</span></div><span className="order-spark" aria-hidden="true">✳</span></div></section>
      <section className="visit-section container" id="kunjungi"><div className="visit-heading"><span className="eyebrow">MEJA KAMU MENUNGGU</span><h2>Main ke Dundee.</h2><p>Makan bareng, ketawa bareng. Begini harusnya.</p></div><div className="visit-card"><div className="visit-pin"><span>⌖</span><small>COME<br />ON IN!</small></div><div className="visit-details"><span className="eyebrow">FIND YOUR WAY</span><h3>Temukan Dundee</h3><p>{restaurant.address || "Info lokasi Dundee segera hadir. Simpan dulu halaman ini, ya!"}</p>{restaurant.hours && <p className="visit-hours">Buka: {restaurant.hours}</p>}</div><div className="visit-links">{restaurant.mapsUrl ? <a className="button" href={restaurant.mapsUrl} target="_blank" rel="noopener noreferrer">Buka petunjuk arah <span>↗</span></a> : <span className="location-soon">Detail lokasi menyusul</span>}{restaurant.whatsapp && <a className="text-link" href={`https://wa.me/${restaurant.whatsapp}`} target="_blank" rel="noopener noreferrer">Tanya dulu via WhatsApp ↗</a>}</div></div></section>
    </main>
      <footer className="site-footer"><div className="container footer-main"><a className="footer-brand" href="#beranda"><Image src="/assets/dundee_logo.png" alt="" width={74} height={74} /><span>DUNDEE<small>GOOD FOOD. GOOD MOOD.</small></span></a><p>Steak · Rice · Chicken<br />Paling enak dinikmati bareng.</p><a href="#beranda" className="back-top">Balik ke atas ↑</a></div><div className="container footer-bottom"><span>© Dundee <CopyrightYear /></span><span>Dibuat dengan rasa lapar dan hati senang.</span></div></footer>
  </>;
}
