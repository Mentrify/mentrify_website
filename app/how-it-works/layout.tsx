import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works - Mentrify Mentorship Process",
  description:
    "Learn how Mentrify works. Find a mentor, book a session, and get guidance from verified college students. Simple 3-step process for aspiring mentees.",
  openGraph: {
    title: "How It Works - Mentrify Mentorship Process",
    description:
      "Learn how Mentrify works with our simple 3-step process to connect with verified mentors.",
    url: "https://mentrify.com/how-it-works",
    type: "website",
  },
  twitter: {
    title: "How It Works - Mentrify Mentorship Process",
    description:
      "Learn how Mentrify works with our simple 3-step process to connect with verified mentors.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
