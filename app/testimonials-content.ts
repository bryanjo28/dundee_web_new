// Preview copy only. Replace with genuine customer reviews before presenting as real feedback.
export const testimonials = [
  { id: "ap", initials: "A. P.", quote: "Ayamnya renyah, sausnya pas, dan paling enak dimakan selagi hangat. Chicken Steak bakal jadi pilihan lagi." },
  { id: "dr", initials: "D. R.", quote: "Suka serundengnya yang gurih. Nasi, ayam, dan sambalnya cocok buat makan siang yang lagi pengen simpel." },
  { id: "ns", initials: "N. S.", quote: "Kalau makan bareng teman, enaknya bisa pilih menu masing-masing. Ada yang pilih steak, ada yang pilih nasi." },
  { id: "fm", initials: "F. M.", quote: "Chicken Pepper cocok buat yang suka saus lada. Kentang gorengnya jadi pasangan yang pas buat ayamnya." },
  { id: "rl", initials: "R. L.", quote: "Pilihan menu kejunya menarik. Buat pencinta rasa gurih dan creamy, ini bisa masuk daftar yang mau dicoba." },
  { id: "bk", initials: "B. K.", quote: "Makan santai setelah jalan-jalan, sambil ngobrol dan berbagi menu. Suasana makan bareng begini yang paling seru." },
];

export const testimonialsPerPage = 3;

export function wrapTestimonialPage(page: number) {
  const count = Math.ceil(testimonials.length / testimonialsPerPage);
  return ((page % count) + count) % count;
}
