import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Mentrify Support",
  description:
    "Get in touch with Mentrify support. Have questions about mentorship? Contact us and we'll help you get started.",
  openGraph: {
    title: "Contact Us - Mentrify Support",
    description:
      "Get in touch with Mentrify support. Have questions about mentorship? Contact us and we'll help you get started.",
    url: "https://mentrify.com/contact",
    type: "website",
  },
  twitter: {
    title: "Contact Us - Mentrify Support",
    description:
      "Get in touch with Mentrify support. Have questions about mentorship? Contact us and we'll help you get started.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
