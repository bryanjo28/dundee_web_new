// Put photos in public/assets and use paths such as /assets/steak.jpg.
export const restaurant = {
  heroImage: "/assets/food/chicken-steak-hero.webp", // Landscape food photograph, recommended 1600 x 1200.
  story: "Bagian ini menunggu cerita asli Dundee. Ceritakan awal perjalanan restoran, inspirasi di balik hidangan, dan suasana yang ingin dibagikan bersama para tamu.",
  address: "Royal Plaza, Jl. Ahmad Yani No.16-18 Lt 3, Wonokromo, Kec. Wonokromo, Surabaya, Jawa Timur 60231",
  // Address broken into schema.org PostalAddress fields (used for structured data).
  street: "Royal Plaza, Jl. Ahmad Yani No.16-18 Lt 3, Wonokromo, Kec. Wonokromo",
  city: "Surabaya",
  region: "Jawa Timur",
  postalCode: "60231",
  country: "ID",
  hours: "10.00-21.30",
  // Approximate: Royal Plaza Surabaya area (OpenStreetMap), not the exact unit.
  // Replace with the exact pin from Google Maps when available.
  latitude: -7.3086,
  longitude: 112.7342,
  priceRange: "Rp 25.000 – Rp 50.000",
  foundedYear: 1997, // From the official Instagram bio: "Legendary Taste, Since 1997".
  instagram: "https://www.instagram.com/dundee_restaurant/",
  googleBusiness: "https://share.google/f2pJSBSWNQ2fEOJvl",
  whatsapp: "6281332666688", // Country code + number, digits only, such as 628xxxxxxxxxx.
  mapsUrl: "https://share.google/ywA8IdQO3dpp47Hlz",
};
export const categories = ["Semua", "Steak", "Rice", "Chicken"] as const;
export type Category = (typeof categories)[number];
export type MenuItem = { id: string; category: Exclude<Category, "Semua">; name: string; description: string; price: string; image: string };
// Sample slots, not actual dishes. Prices stay out of the UI on purpose, so no
// price is rendered anywhere; the published range "Rp 25.000 – Rp 40.000" lives
// in `restaurant.priceRange` and is only emitted as structured data.
// Per-dish prices can be filled in here later once confirmed, for example:
//   { ..., price: "Rp 25.000 – Rp 40.000" }
export const menuItems: MenuItem[] = [
  { id: "steak-1", category: "Steak", name: "Pilihan steak pertama", description: "Isi dengan potongan daging, saus, dan pelengkap hidangan.", price: "", image: "" },
  { id: "rice-1", category: "Rice", name: "Pilihan rice pertama", description: "Isi dengan jenis nasi, lauk, dan rasa khas hidangan.", price: "", image: "" },
  { id: "chicken-1", category: "Chicken", name: "Pilihan chicken pertama", description: "Isi dengan olahan ayam, saus, dan pelengkap hidangan.", price: "", image: "" },
  { id: "steak-2", category: "Steak", name: "Pilihan steak kedua", description: "Ruang untuk pilihan steak berikutnya dari dapur Dundee.", price: "", image: "" },
  { id: "rice-2", category: "Rice", name: "Pilihan rice kedua", description: "Ruang untuk pilihan nasi berikutnya dari dapur Dundee.", price: "", image: "" },
  { id: "chicken-2", category: "Chicken", name: "Pilihan chicken kedua", description: "Ruang untuk pilihan ayam berikutnya dari dapur Dundee.", price: "", image: "" },
];
