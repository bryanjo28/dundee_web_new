import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import "./brand-wordmark.css";
import { restaurant } from "./restaurant-content";
import { ScrollHeader } from "./scroll-header";

// Route links use next/link so the pages are prefetched; the `/#section` links
// jump back to a section of the home page from any route.
const navLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Cerita kami", href: "/#cerita" },
  { label: "Testimoni", href: "/#testimoni" },
  { label: "Lokasi", href: "/lokasi" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteHeader() {
  return <ScrollHeader>
    <nav className="nav-glass container" aria-label="Navigasi utama">
      <Link className="brand" href="/" aria-label="Dundee, beranda">
        <Image className="brand-wordmark" src="/assets/logo-dundee.webp" alt="Dundee Resto" width={480} height={197} priority />
      </Link>
      <div className="desktop-links">
        {navLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
      </div>
      <a className="button nav-action" href={restaurant.whatsapp ? `https://wa.me/${restaurant.whatsapp}` : "/#pesan"}>Hubungi kami <ArrowUpRight size={18} aria-hidden="true" /></a>
      <details className="mobile-nav">
        <summary aria-label="Buka navigasi">Menu <span aria-hidden="true">☰</span></summary>
        <div>
          {navLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          <Link href="/#pesan">Pesan sekarang</Link>
        </div>
      </details>
    </nav>
  </ScrollHeader>;
}
