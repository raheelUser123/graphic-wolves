import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll/SmoothScroll";
export const metadata: Metadata = {
  // IMPORTANT: change this to your real production domain.
  metadataBase: new URL("https://graphicwolves.com"),

  title: {
    default: "Graphic Wolves | Branding, Development & E-Commerce",
    template: "%s | Graphic Wolves",
  },

  description:
    "Graphic Wolves is a creative team focused on branding, development and e-commerce experiences.",

  keywords: [
    "Graphic Wolves",
    "branding",
    "web development",
    "e-commerce",
    "creative agency",
  ],

  robots: {
    index: true,
    follow: true,
  },

  manifest: "/site.webmanifest",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        url: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Graphic Wolves",
  description:
    "Creative agency for branding, development and e-commerce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/borscha-typeface/Borscha-Regular-BF69c8e64155413.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Global Lenis Smooth Scroll */}
        <SmoothScroll />
        
        {children}
      </body>
    </html>
  );
}