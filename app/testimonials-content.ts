// Real customer reviews from the restaurant's public Google Business listing.
//
// Reviewer names are masked: first letter, ellipsis, last letter ("A...S").
// The source label is not rendered in the UI either; see the commented-out
// lines in testimonials-carousel.tsx to bring it back.
//
// Quotes are trimmed to the parts that read well on their own. The first
// letter is capitalized, the reviewer's emoji are dropped, obvious typos are
// fixed, and mentions of price are removed because the site does not show menu
// prices. "…" marks where the visible quote stops before the rest of the
// review. No words were added.
//
// The date of each review is deliberately not stored or shown.
//
// This content is deliberately NOT mirrored into structured data. Google
// excludes reviews a local business controls about itself from the star review
// feature, and forbids aggregating ratings from other websites.
export type Testimonial = {
  id: string;
  /** Masked display name, always "X...Y". */
  name: string;
  rating: number;
  /** Kept for reference; not currently shown in the UI. */
  source: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "trt",
    name: "T...T",
    rating: 5,
    source: "Google",
    quote: "Super kenyang poll sii menurutku bahkan bisa dimakan berdua, nasinya enak wangi pulen dan steak ayamnya bukan tebel tepung tapi beneran tebel dagingnya…",
  },
  {
    id: "hanaxv",
    name: "H...S",
    rating: 5,
    source: "Google",
    quote: "Makanannya enak, murah, cepat juga, pelayanannya bagus. Dari dulu makan Dundee paling enak sih, apalagi dibantu juga cari tempat duduk apabila rame…",
  },
  {
    id: "octa",
    name: "O...I",
    rating: 5,
    source: "Google",
    quote: "Makan siang di foodcourt Royal Plaza Surabaya…",
  },
  {
    id: "aucky",
    name: "A...H",
    rating: 5,
    source: "Google",
    quote: "Salah satu restoran ayam favorit di Surabaya lokal punya. Menunya sangat banyak dan bervariatif. Masakannya juga enak, terutama nasi goreng dan ayam gorengnya. Sambalnya juga bikin nagih…",
  },
];

// Four cards in a two-column grid: everything fits on one page, so the
// pagination controls stay hidden until the list grows past this.
export const testimonialsPerPage = 4;

export function wrapTestimonialPage(page: number) {
  const count = Math.ceil(testimonials.length / testimonialsPerPage);
  return ((page % count) + count) % count;
}