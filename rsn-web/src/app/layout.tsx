import type { Metadata } from "next";
import { Inter, Playfair_Display, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: "--font-ibm-arabic"
});

export const metadata: Metadata = {
  title: "RSN Alarabiya | Crowd Management & Security",
  description: "Leading Crowd Management & Security Services in Saudi Arabia.",
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-navy-950 font-sans antialiased text-white selection:bg-gold-500/30",
          inter.variable,
          playfair.variable,
          ibmArabic.variable
        )}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
