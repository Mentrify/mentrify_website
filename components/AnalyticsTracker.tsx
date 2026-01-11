"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GA_ID = "G-5113YLN7N5";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const gtag = (window as any).gtag;
    if (!gtag) return;

    gtag("config", GA_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
