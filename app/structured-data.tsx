import { restaurant } from "./restaurant-content";
import { faqs } from "./faq-content";
import { menuSections } from "./menu-items";
import {
  absoluteUrl,
  homeImages,
  locationPage,
  menuPage,
  ogImage,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
  siteTagline,
} from "./site";

// One graph per route, sharing the same @id values so search engines merge the
// three pages into a single restaurant entity instead of three unrelated ones.
// Validate edits with https://validator.schema.org/ or the Rich Results Test.
export type StructuredDataPage = "home" | "menu" | "lokasi";

const pageNodes = {
  home: { path: "/", name: siteTitle, description: siteDescription, crumb: undefined },
  menu: {
    path: menuPage.path,
    name: menuPage.structuredName,
    description: menuPage.description,
    crumb: "Menu",
  },
  lokasi: {
    path: locationPage.path,
    name: locationPage.structuredName,
    description: locationPage.description,
    crumb: "Lokasi",
  },
} as const;

export function StructuredData({ page = "home" }: { page?: StructuredDataPage }) {
  const whatsappNumber = restaurant.whatsapp ? `+${restaurant.whatsapp}` : undefined;
  const current = pageNodes[page];
  const pageUrl = absoluteUrl(current.path);

  const restaurantSchema = {
    "@type": "Restaurant",
    "@id": `${siteUrl}/#restaurant`,
    name: siteName,
    alternateName: "Dundee Resto",
    description: siteDescription,
    url: siteUrl,
    slogan: siteTagline,
    image: [ogImage.url, ...homeImages.slice(1, 4)].map(absoluteUrl),
    logo: absoluteUrl("/assets/logo-dundee.webp"),
    telephone: whatsappNumber,
    servesCuisine: ["Steak", "Chicken", "Rice"],
    priceRange: restaurant.priceRange,
    currenciesAccepted: "IDR",
    foundingDate: String(restaurant.foundedYear),
    areaServed: { "@type": "City", name: restaurant.city },
    sameAs: [restaurant.instagram, restaurant.googleBusiness],
    hasMap: restaurant.googleBusiness,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.street,
      addressLocality: restaurant.city,
      addressRegion: restaurant.region,
      postalCode: restaurant.postalCode,
      addressCountry: restaurant.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
    },
    // Assumes the same opening hours every day. Adjust if any day differs.
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: restaurant.hours.split("-")[0]?.replace(".", ":") ?? "10:00",
      closes: restaurant.hours.split("-")[1]?.replace(".", ":") ?? "21:30",
    },
    // Built from app/menu-items.ts, the same list the pages render, so the
    // markup cannot advertise a dish that is not on the menu.
    hasMenu: {
      "@type": "Menu",
      name: "Menu Dundee",
      url: absoluteUrl(menuPage.path),
      hasMenuSection: menuSections.map((section) => ({
        "@type": "MenuSection",
        name: section.name,
        hasMenuItem: section.items.map((name) => ({ "@type": "MenuItem", name })),
      })),
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      restaurantSchema,
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        inLanguage: "id-ID",
        publisher: { "@id": `${siteUrl}/#restaurant` },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: current.name,
        description: current.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#restaurant` },
        inLanguage: "id-ID",
      },
      // Built from the same source as the visible accordion, so the markup and
      // the page can never disagree. Note that Google no longer shows FAQ rich
      // results for sites like this one; the markup is here for machine-readable
      // answers, not for stars in the search results. It is emitted on the home
      // page only, where the accordion is actually visible.
      ...(page === "home"
        ? [
            {
              "@type": "FAQPage",
              "@id": `${siteUrl}/#faq`,
              isPartOf: { "@id": `${siteUrl}/#webpage` },
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
          ]
        : []),
      ...(current.crumb
        ? [
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Beranda", item: siteUrl },
                { "@type": "ListItem", position: 2, name: current.crumb, item: pageUrl },
              ],
            },
          ]
        : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
