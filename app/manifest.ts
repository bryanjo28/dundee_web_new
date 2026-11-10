import type { MetadataRoute } from "next";

// Required for `output: "export"`: the manifest route must be explicitly static.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dundee | Steak, Rice & Chicken",
    short_name: "Dundee",
    description:
      "Jelajahi menu steak, rice, dan chicken Dundee. Rasa enak dan momen hangat untuk setiap cerita di meja makan.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F3EA",
    theme_color: "#142345",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
