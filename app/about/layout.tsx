import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Mentrify - Our Mission & Story",
  description:
    "Learn about Mentrify's mission to connect ambitious students with experienced college mentors. Discover our story and why we're building the future of mentorship.",
  openGraph: {
    title: "About Mentrify - Our Mission & Story",
    description:
      "Learn about Mentrify's mission to connect ambitious students with experienced college mentors.",
    url: "https://mentrify.com/about",
    type: "website",
  },
  twitter: {
    title: "About Mentrify - Our Mission & Story",
    description:
      "Learn about Mentrify's mission to connect ambitious students with experienced college mentors.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
