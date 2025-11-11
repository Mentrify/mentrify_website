import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy - Mentrify",
  description:
    "Read Mentrify's refund policy. Understand our terms for cancellations, refunds, and session credits.",
  openGraph: {
    title: "Refund Policy - Mentrify",
    description:
      "Read Mentrify's refund policy. Understand our terms for cancellations, refunds, and session credits.",
    url: "https://mentrify.com/refund-policy",
    type: "website",
  },
  twitter: {
    title: "Refund Policy - Mentrify",
    description:
      "Read Mentrify's refund policy. Understand our terms for cancellations, refunds, and session credits.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
