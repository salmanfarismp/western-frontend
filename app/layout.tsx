import type { Metadata } from "next";
import { playfair, plusJakarta } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Westernswings",
  description:
    "Slow outdoor living, curated patio sanctuaries, and artisanal craftsmanship in solid teak, all-weather wicker, and sunbaked natural textiles.",
  keywords: [
    "outdoor furniture",
    "luxury patio",
    "hanging egg chair",
    "solid teak",
    "all-weather wicker",
    "slow living",
    "architectural outdoor design",
  ],
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
