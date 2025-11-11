import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help & FAQs - Mentrify",
  description:
    "Find answers to frequently asked questions about Mentrify. Get help with bookings, sessions, payments, and mentorship guidance.",
  openGraph: {
    title: "Help & FAQs - Mentrify",
    description:
      "Find answers to frequently asked questions about Mentrify mentorship platform.",
    url: "https://mentrify.com/help",
    type: "website",
  },
  twitter: {
    title: "Help & FAQs - Mentrify",
    description:
      "Find answers to frequently asked questions about Mentrify mentorship platform.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
