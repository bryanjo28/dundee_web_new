This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Dundee restaurant template

The homepage is a responsive restaurant template with brand colours, glass navigation,
menu category filters, and scroll reveals that respect reduced-motion preferences.

### Replace the sample content

Edit `app/restaurant-content.ts`:

- `restaurant.heroImage`: hero food photo, recommended 1600 × 1200 or larger.
- `restaurant.story`: the actual Dundee story.
- `restaurant.address` and `restaurant.hours`: location and opening hours.
- `restaurant.whatsapp`: digits including country code, without `+` or spaces.
- `restaurant.mapsUrl`: the restaurant's Google Maps link.
- `menuItems`: replace sample names, descriptions, prices, and image paths.

Put photos in `public/assets/`. A file named `steak.jpg` is referenced as
`/assets/steak.jpg`. Menu photos use a 4:3 crop; 1200 × 900 is recommended.
The six sample menu entries are placeholders, not a published restaurant menu.
Missing photos show clearly labelled slots. Missing contacts show an availability
message; the WhatsApp link appears once a number is supplied. Local image paths
work without additional configuration. Configure Next.js `images.remotePatterns`
before using remote image URLs.

Page sections live in `app/page.tsx`; menu filtering is in
`app/restaurant-menu.tsx`; scroll behaviour is in `app/scroll-reveal.tsx`.
Dundee colour tokens and responsive styles are in `app/globals.css`, with the
Hallmark foundation in `app/tokens.css` and `app/base.css`.

Verify with `npm run lint` and `npm run build`.
