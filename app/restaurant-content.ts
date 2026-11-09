// Put photos in public/assets and use paths such as /assets/steak.jpg.
export const restaurant = {
  heroImage: "", // Landscape food photograph, recommended 1600 x 1200.
  story: "Bagian ini menunggu cerita asli Dundee. Ceritakan awal perjalanan restoran, inspirasi di balik hidangan, dan suasana yang ingin dibagikan bersama para tamu.",
  address: "",
  hours: "",
  whatsapp: "", // Country code + number, digits only, such as 628xxxxxxxxxx.
  mapsUrl: "",
};
export const categories = ["Semua", "Steak", "Rice", "Chicken"] as const;
export type Category = (typeof categories)[number];
export type MenuItem = { id: string; category: Exclude<Category, "Semua">; name: string; description: string; price: string; image: string };
// Sample slots, not actual dishes or prices. Replace the names and descriptions too.
export const menuItems: MenuItem[] = [
  { id: "steak-1", category: "Steak", name: "Pilihan steak pertama", description: "Isi dengan potongan daging, saus, dan pelengkap hidangan.", price: "", image: "" },
  { id: "rice-1", category: "Rice", name: "Pilihan rice pertama", description: "Isi dengan jenis nasi, lauk, dan rasa khas hidangan.", price: "", image: "" },
  { id: "chicken-1", category: "Chicken", name: "Pilihan chicken pertama", description: "Isi dengan olahan ayam, saus, dan pelengkap hidangan.", price: "", image: "" },
  { id: "steak-2", category: "Steak", name: "Pilihan steak kedua", description: "Ruang untuk pilihan steak berikutnya dari dapur Dundee.", price: "", image: "" },
  { id: "rice-2", category: "Rice", name: "Pilihan rice kedua", description: "Ruang untuk pilihan nasi berikutnya dari dapur Dundee.", price: "", image: "" },
  { id: "chicken-2", category: "Chicken", name: "Pilihan chicken kedua", description: "Ruang untuk pilihan ayam berikutnya dari dapur Dundee.", price: "", image: "" },
];
