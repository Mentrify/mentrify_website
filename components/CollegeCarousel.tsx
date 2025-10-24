/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Logo = {
  src: string;
  alt: string;
  href?: string;
};

export function CollegeCarousel({ useGrey = false }: { useGrey?: boolean }) {
  // Put your logos in /public/logos (or update paths below)
  const logos: Logo[] = useMemo(
    () => [
      { src: "/logos/iit_bombay.png", alt: "IIT Bombay" },
      { src: "/logos/iit_delhi.png", alt: "IIT Delhi" },
      { src: "/logos/iit_kanpur.png", alt: "IIT Kanpur" },
      { src: "/logos/iit_madras.png", alt: "IIT Madras" },
      { src: "/logos/iit_gandhinagar.png", alt: "IIT Gandhinagar" },
      // add more here as you get assets (NITs, BITS, etc.)
    ],
    []
  );

  // Duplicate to make “infinite-like” loop smooth when auto-advancing
  const items = useMemo(() => [...logos, ...logos], [logos]);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isHover, setIsHover] = useState(false);
  const [isInView, setIsInView] = useState(true);

  // Reduced motion respect
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Observe visibility to pause when off-screen
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const rootObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setIsInView(e.isIntersecting);
      },
      { threshold: 0.15 }
    );
    rootObserver.observe(el);
    return () => rootObserver.disconnect();
  }, []);

  // Auto-advance every 2.5s (skips if reduced-motion / hover / off-screen)
  useEffect(() => {
    if (prefersReduced) return;
    const el = trackRef.current;
    if (!el) return;

    const step = () => {
      // width of one “card” (logo cell) based on first child
      const first = el.querySelector<HTMLDivElement>("[data-card]");
      const cardW = first?.offsetWidth ?? 220;
      const maxScroll = el.scrollWidth / 2; // halfway point (since duplicated)
      // if we’ve scrolled past half, reset back by half to simulate loop
      if (el.scrollLeft >= maxScroll) {
        el.scrollLeft = el.scrollLeft - maxScroll;
      }
      el.scrollBy({ left: cardW, behavior: "smooth" });
    };

    const id = setInterval(() => {
      if (!isHover && isInView) step();
    }, 2500);

    return () => clearInterval(id);
  }, [isHover, isInView, prefersReduced]);

  const scrollByCards = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLDivElement>("[data-card]");
    const cardW = first?.offsetWidth ?? 220;
    el.scrollBy({ left: dir * cardW * 1.2, behavior: "smooth" });
  };

  const shell = useGrey
    ? "bg-grey-1200"
    : "bg-[radial-gradient(120%_120%_at_0%_0%,theme(colors.secondaryPalette.100/_0.35),transparent_60%)]";
  const ring = useGrey ? "ring-white/10" : "ring-black/10";
  const label = useGrey ? "text-primaryPalette-200/80" : "text-grey-600";

  return (
    <section
      className={`relative ${shell} py-10`}
      aria-label="Top colleges using Mentrify mentors"
    >
      <div className="mx-auto w-[92%] max-w-6xl px-6">
        <div className="flex items-center justify-between gap-4">
          <p className={`text-sm ${label}`}>Mentors from</p>

          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              aria-label="Scroll logos left"
              onClick={() => scrollByCards(-1)}
              className={`rounded-full p-2 ring-1 ${ring} hover:opacity-90 active:scale-95 transition`}
            >
              <ChevronLeft
                className={
                  useGrey ? "text-primaryPalette-200" : "text-grey-900"
                }
              />
            </button>
            <button
              type="button"
              aria-label="Scroll logos right"
              onClick={() => scrollByCards(1)}
              className={`rounded-full p-2 ring-1 ${ring} hover:opacity-90 active:scale-95 transition`}
            >
              <ChevronRight
                className={
                  useGrey ? "text-primaryPalette-200" : "text-grey-900"
                }
              />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          role="list"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className={`
            mt-4 relative flex overflow-x-auto no-scrollbar
            snap-x snap-mandatory gap-2 sm:gap-3
            scroll-smooth
            rounded-2xl p-3
            ring-1 ${ring}
            backdrop-blur-md
          `}
          // subtle fade edges
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          {items.map((logo, i) => (
            <div
              key={`${logo.src}-${i}`}
              role="listitem"
              data-card
              className={`
                shrink-0 snap-start
                rounded-xl bg-white/80 p-3 sm:p-4
                ${
                  useGrey
                    ? "bg-grey-1000/60 ring-1 ring-white/5"
                    : "ring-1 ring-black/5"
                }
                flex items-center justify-center
                h-16 sm:h-20
                w-[180px] sm:w-[220px]
              `}
              aria-label={logo.alt}
              title={logo.alt}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={60}
                className="object-contain h-full w-auto opacity-90"
                priority={i < 6} // first “row” eager
              />
            </div>
          ))}
        </div>

        {/* small caption under the track */}
        <p className={`mt-3 text-xs ${label}`}>
          IITs, NITs, BITS and 50+ more campuses.
        </p>
      </div>

      {/* Hide scrollbars in most browsers */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
