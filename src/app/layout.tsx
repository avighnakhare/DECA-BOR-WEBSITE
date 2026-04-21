import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { ReadingGuide } from "@/components/ReadingGuide";
import { HoverReader } from "@/components/HoverReader";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Birkdale Audiology | Premium Hearing Care in Huntersville, NC",
  description: "Lake Norman's Premier Audiology Team offering specialized hearing care, hearing aids, tinnitus treatments, and cognitive screening. Locally owned and operated.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans min-h-screen bg-background text-foreground flex flex-col`}
      >
        <AccessibilityProvider>
          <HoverReader />
          <ReadingGuide />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
