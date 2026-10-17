import type { Metadata } from "next";
import { playfair, plusJakarta } from "@/lib/fonts";
import "./globals.css";

import { siteConfig } from "@/lib/config/site";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-context";
import { CartSidebar } from "@/components/modules/cart";
import { AuthModal } from "@/components/auth/auth-modal";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Westernswings | Swing Chairs",
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
        <AuthProvider>
          <CartProvider>
            {children}
            <CartSidebar />
            <AuthModal />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
