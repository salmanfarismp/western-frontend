import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders & Deliveries | Westernswings",
  description:
    "Track your handcrafted swing chair orders, workshop progress, and digital receipts.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
