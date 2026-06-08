import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans, Playfair_Display, Montserrat } from "next/font/google";
import NexusRealPopupSystem from "@/components/ui/NexusRealPopupSystem";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "DreamHome Realty | India's Premier Luxury Real Estate Platform", template: "%s | DreamHome Realty" },
  description: "Discover 2,500+ verified luxury properties across India. AI-powered matching, RERA verified listings, zero brokerage. Buy, Rent, Sell, and Invest with confidence.",
  keywords: ["luxury real estate india", "buy property india", "rent apartment", "RERA verified", "premium homes"],
  openGraph: {
    type: "website",
    siteName: "DreamHome Realty",
    title: "DreamHome Realty | India's Premier Property Platform",
    description: "Discover India's finest luxury properties. RERA verified, AI-powered, zero brokerage.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${playfair.variable} ${montserrat.variable} antialiased`}
        style={{
          fontFamily: "var(--font-dm), system-ui, sans-serif",
        }}
        suppressHydrationWarning
      >
        <WishlistProvider>
          <AuthProvider>
            <NexusRealPopupSystem />
            {children}
          </AuthProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}