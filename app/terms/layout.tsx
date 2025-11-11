import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Mentrify",
  description:
    "Read Mentrify's terms of service. Understand the rules and conditions for using our mentorship platform.",
  openGraph: {
    title: "Terms of Service - Mentrify",
    description:
      "Read Mentrify's terms of service. Understand the rules and conditions for using our mentorship platform.",
    url: "https://mentrify.com/terms",
    type: "website",
  },
  twitter: {
    title: "Terms of Service - Mentrify",
    description:
      "Read Mentrify's terms of service. Understand the rules and conditions for using our mentorship platform.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
