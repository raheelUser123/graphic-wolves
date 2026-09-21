import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Graphic Wolves | Branding, Development & E-Commerce",
    template: "%s | Graphic Wolves",
  },
  description:
    "Graphic Wolves is a creative team focused on branding, development and e-commerce experiences.",
  keywords: ["Graphic Wolves", "branding", "web development", "e-commerce", "creative agency"],
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Graphic Wolves",
  description: "Creative agency for branding, development and e-commerce.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
