import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Mentrify",
  description:
    "Read Mentrify's privacy policy. Understand how we collect, use, and protect your personal data.",
  openGraph: {
    title: "Privacy Policy - Mentrify",
    description:
      "Read Mentrify's privacy policy. Understand how we collect, use, and protect your personal data.",
    url: "https://mentrify.com/privacy",
    type: "website",
  },
  twitter: {
    title: "Privacy Policy - Mentrify",
    description:
      "Read Mentrify's privacy policy. Understand how we collect, use, and protect your personal data.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
