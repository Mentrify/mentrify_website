import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Mentrify Mentorship Plans",
  description:
    "Explore Mentrify's flexible pricing plans. Get started with early access passes or premium mentorship memberships. Affordable guidance from verified college mentors.",
  openGraph: {
    title: "Pricing - Mentrify Mentorship Plans",
    description:
      "Explore Mentrify's flexible pricing plans for mentorship sessions with verified college seniors.",
    url: "https://mentrify.com/pricing",
    type: "website",
  },
  twitter: {
    title: "Pricing - Mentrify Mentorship Plans",
    description:
      "Explore Mentrify's flexible pricing plans for mentorship sessions with verified college seniors.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
