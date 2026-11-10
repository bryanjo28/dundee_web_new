import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dundee | Steak, Rice & Chicken",
  description: "Jelajahi menu steak, rice, dan chicken Dundee. Rasa enak dan momen hangat untuk setiap cerita di meja makan.",
  // Icons are served by the app/ file conventions (favicon.ico, icon.png,
  // apple-icon.png) and app/manifest.ts — no manual <link> tags needed.
  applicationName: "Dundee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
