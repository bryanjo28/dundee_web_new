import Link from "next/link";
import "./brand-wordmark.css";
import "./footer-tagline.css";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container footer-main">
      <Link className="footer-brand" href="/" aria-label="Kembali ke beranda">
        <span className="footer-tagline"><strong>Good food.</strong><em>Good mood.</em></span>
      </Link>
      <p>Steak · Rice · Chicken<br />Paling enak dinikmati bareng.</p>
      {/* Plain anchor: #beranda is the header slot, which sits at the top of
          every page, so this scrolls up without leaving the current route. */}
      <a href="#beranda" className="back-top">Balik ke atas ↑</a>
    </div>
    <div className="container footer-bottom">
      <span>© 2025. Hak cipta dilindungi.</span>
      <span>Dibuat dengan rasa lapar dan hati senang.</span>
    </div>
  </footer>;
}
