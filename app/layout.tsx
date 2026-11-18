import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { ogImage, siteDescription, siteName, siteTitle, siteUrl } from "./site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const keywords = [
  "Dundee",
  "Dundee Resto",
  "Dundee Royal Plaza",
  "Dundee Surabaya",
  "steak Surabaya",
  "chicken steak Surabaya",
  "rice bowl Surabaya",
  "ayam bakar Surabaya",
  "chicken balacan",
  "chicken serundeng",
  "nasi kuning Surabaya",
  "restoran Wonokromo",
  "kuliner Royal Plaza Surabaya",
  "tempat makan keluarga Surabaya",
  "resto steak sejak 1997",
  // GoFood is not available yet, so it is deliberately not advertised.
  "Dundee GrabFood",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords,
  applicationName: siteName,
  category: "restaurant",
  alternates: {
    canonical: "/",
  },
  // Icons are served by the app/ file conventions (favicon.ico, icon.png,
  // apple-icon.png) and app/manifest.ts — no manual <link> tags needed.
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // After adding the domain in Google Search Console, paste the token here:
  // verification: { google: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
};

export const viewport: Viewport = {
  themeColor: "#142345",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
