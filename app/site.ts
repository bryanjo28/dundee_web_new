// Single source of truth for site-wide SEO values.
// Change siteUrl here when the production domain changes.
export const siteUrl = "https://dundee-resto.biz.id";

export const siteName = "Dundee";

export const siteTitle = "Dundee | Steak, Rice & Chicken di Surabaya";

export const siteDescription =
  "Dundee di Royal Plaza Wonokromo, Surabaya. Steak juicy, rice comforting, dan chicken gurih. Buka 10.00-21.30. Pesan menu favoritmu lewat WhatsApp.";

export const siteTagline = "Steak · Rice · Chicken";

// Social preview image. Relative here; metadata fields resolve it against metadataBase.
export const ogImage = {
  url: "/assets/og-dundee.jpg",
  width: 1200,
  height: 630,
  alt: "Chicken Steak Dundee dengan nasi hangat dan sayuran",
};

// Photos shown on the home page, used for the image sitemap.
export const homeImages = [
  "/assets/food/chicken-steak-hero.webp",
  "/assets/food/chicken-balacan.webp",
  "/assets/food/chicken-pepper.webp",
  "/assets/food/chicken-cheese.webp",
  "/assets/food/chicken-serundeng.webp",
  "/assets/food/cheese-golden-chick.webp",
  "/assets/food/nasi-goreng-top.webp",
  "/assets/food/nasi-udang.webp",
  "/assets/location.webp",
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

// Sub-page copy lives here so the page metadata and the structured data read
// from the same strings.
export const menuPage = {
  path: "/menu",
  title: "Menu Lengkap",
  description:
    "Menu Dundee di Royal Plaza Surabaya: Steak, Rice, dan Chicken. Delapan hidangan, dari Chicken Steak dan Ayam Bakar Belacan sampai Nasi Udang.",
  structuredName: "Menu Dundee",
};

export const locationPage = {
  path: "/lokasi",
  title: "Lokasi & Jam Buka",
  description:
    "Dundee ada di Royal Plaza Lt 3 No. 16-18, Jl. Ahmad Yani, Wonokromo, Surabaya. Buka setiap hari 10.00-21.30. Lihat petunjuk arah dan cara memesan.",
  structuredName: "Lokasi Dundee",
};
