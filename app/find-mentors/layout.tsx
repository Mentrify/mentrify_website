import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Mentors - Mentrify",
  description:
    "Browse and connect with verified college mentors at Mentrify. Find the perfect mentor for guidance on courses, careers, and campus life.",
  openGraph: {
    title: "Find Mentors - Mentrify",
    description:
      "Browse and connect with verified college mentors at Mentrify.",
    url: "https://mentrify.com/find-mentors",
    type: "website",
  },
  twitter: {
    title: "Find Mentors - Mentrify",
    description:
      "Browse and connect with verified college mentors at Mentrify.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
