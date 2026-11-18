// Single source for the FAQ section on the page and the FAQPage structured
// data, so the visible answers and the markup can never drift apart.
//
// Only add an answer here once the business has confirmed it. No prices: the
// site does not show menu prices anywhere in the UI.
export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    id: "jam-buka",
    question: "Jam buka Dundee?",
    answer: "Dundee buka setiap hari, pukul 10.00 sampai 21.30.",
  },
  {
    id: "lokasi",
    question: "Dundee di Royal Plaza lantai berapa?",
    answer:
      "Dundee ada di Royal Plaza Lt 3 No. 16-18, Jl. Ahmad Yani, Wonokromo, Surabaya.",
  },
  {
    id: "pesan-antar",
    question: "Bisa pesan antar lewat aplikasi?",
    answer:
      "Bisa lewat GrabFood. GoFood belum tersedia, jadi untuk sementara pesanan antar lewat GrabFood atau langsung ke WhatsApp tim Dundee.",
  },
  {
    id: "menu",
    question: "Menu apa saja yang ada di Dundee?",
    answer:
      "Menu Dundee dibagi jadi tiga: Steak, Rice, dan Chicken. Yang jadi favorit di sini Chicken Steak, Ayam Bakar Belacan, dan Chicken Pepper, ditambah Nasi Goreng, Nasi Udang, Chicken Cheese, dan Chicken Serundeng.",
  },
  {
    id: "sejak-kapan",
    question: "Sejak kapan Dundee berdiri?",
    answer:
      "Dundee berdiri sejak 1997 dan masih berjualan di Royal Plaza Surabaya sampai sekarang.",
  },
  {
    id: "kontak",
    question: "Bagaimana cara menghubungi Dundee?",
    answer:
      "Hubungi tim Dundee lewat WhatsApp di 0813-3266-6688, untuk pemesanan langsung, tanya menu, atau informasi franchise.",
  },
];
