import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mentrify - Real Students. Real Advice.",
  description:
    "Connect with verified college seniors for 1-on-1 guidance sessions. Get honest advice on courses, campuses, and careers from students who have been in your shoes.",
  keywords:
    "mentorship, college guidance, student advice, career counseling, college seniors",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen bg-white ${inter.className} pt-10 md:pt-12 lg:pt-14`}
      >
        {/* Global header */}
        <Navigation />

        <main className="">{children}</main>

        {/* Global footer */}
        <Footer />
      </body>
    </html>
  );
}
