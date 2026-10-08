import type { Metadata } from "next";
import { playfair, plusJakarta } from "@/lib/fonts";
import "./globals.css";

import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Westernswings | Handcrafted Luxury Outdoor Swings",
    template: "%s | Westernswings",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-canvas-linen text-espresso-rich font-sans selection:bg-primary-container selection:text-surface-card">
        {children}
      </body>
    </html>
  );
}
