"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavFooter = pathname === "/" || pathname.startsWith("/coming-soon");

  return (
    <>
      {!hideNavFooter && <Navigation />}
      <main>{children}</main>
      {!hideNavFooter && <Footer />}
    </>
  );
}
