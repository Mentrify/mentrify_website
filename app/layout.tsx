import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mentrify - Real Students. Real Advice.",
  description:
    "Connect with verified college seniors for 1-on-1 guidance sessions. Get honest advice on courses, campuses, and careers from students who have been in your shoes.",
  keywords:
    "mentorship, college guidance, student advice, career counseling, college seniors",
  generator: "v0.app",
  metadataBase: new URL("https://mentrify.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mentrify.com",
    siteName: "Mentrify",
    title: "Mentrify - Real Students. Real Advice.",
    description:
      "Connect with verified college seniors for 1-on-1 guidance sessions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mentrify - Mentorship Platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mentrify",
    creator: "@mentrify",
    title: "Mentrify - Real Students. Real Advice.",
    description:
      "Connect with verified college seniors for 1-on-1 guidance sessions.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Google Analytics */}
      <GoogleAnalytics />

      <body className={`min-h-screen bg-white ${inter.className}`}>
        <AnalyticsTracker />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Analytics />
      </body>
    </html>
  );
}
