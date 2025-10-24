/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Logo = {
  src: string;
  alt: string; // also used as display name
  href?: string;
};

export function CollegeCarousel({ useGrey = false }: { useGrey?: boolean }) {
  const logos: Logo[] = useMemo(
    () => [
      { src: "/logo/iit_bombay.png", alt: "IIT Bombay" },
      { src: "/logo/iit_delhi.png", alt: "IIT Delhi" },
      { src: "/logo/iit_kanpur.png", alt: "IIT Kanpur" },
      { src: "/logo/iit_madras.png", alt: "IIT Madras" },
      { src: "/logo/iit_gandhinagar.png", alt: "IIT Gandhinagar" },
      // add more…
    ],
    []
  );

  // we’ll render the list twice to make the loop seamless
  const items = useMemo(() => [...logos, ...logos], [logos]);

  const shell = useGrey
    ? "bg-grey-1200"
    : "bg-[radial-gradient(120%_120%_at_0%_0%,theme(colors.secondaryPalette.100/_0.35),transparent_60%)]";
  const ring = useGrey ? "ring-white/10" : "ring-black/10";
  const label = useGrey ? "text-primaryPalette-200/80" : "text-grey-600";
  const nameColor = useGrey ? "text-primaryPalette-200/90" : "text-grey-900";

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [duration, setDuration] = useState(20); // fallback

  // compute animation duration based on content width (~100px/sec)
  useEffect(() => {
    const calc = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      // half of track width is one full loop (because items are duplicated)
      const halfWidth = track.scrollWidth / 2;
      const pxPerSec = 100; // adjust for speed
      const secs = Math.max(8, Math.min(60, halfWidth / pxPerSec));
      setDuration(secs);
    };
    calc();
    // recalc on resize/font load
    window.addEventListener("resize", calc);
    const id = setInterval(calc, 500); // quick settle for first render/layout
    setTimeout(() => clearInterval(id), 1500);
    return () => {
      window.removeEventListener("resize", calc);
      clearInterval(id);
    };
  }, []);

  // pause when not visible
  const [isInView, setIsInView] = useState(true);
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setIsInView(e.isIntersecting)),
      { threshold: 0.1 }
    );
    obs.observe(vp);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className={`relative ${shell} py-10`}
      aria-label="Top colleges using Mentrify mentors"
    >
      <div className="mx-auto w-[92%] max-w-6xl px-6">
        <div className="flex items-center justify-between gap-4">
          <p className={`text-base ${label}`}>Mentors from</p>
        </div>

        <div
          ref={viewportRef}
          className={`
            mt-4 relative overflow-hidden
            rounded-2xl ring-1 ${ring} backdrop-blur-md
            // fade edges
          `}
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div
            // this wrapper controls the animation
            className={`marquee ${isInView ? "" : "paused"} no-scrollbar`}
            style={
              {
                // @ts-ignore -- CSS var used in styled-jsx below
                "--marquee-duration": `${duration}s`,
              } as React.CSSProperties
            }
          >
            <div ref={trackRef} className="marquee-track">
              {items.map((logo, i) => (
                <div
                  key={`${logo.src}-${i}`}
                  role="listitem"
                  className={`
  card
  ${
    useGrey
      ? "bg-grey-1000/60 border-2 border-white"
      : "bg-white border-2 border-black/20"
  }
`}
                  title={logo.alt}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={200}
                    height={60}
                    className="object-contain h-12 sm:h-14 w-auto opacity-90"
                    priority={i < 6}
                  />
                  <span
                    className={`text-sm sm:text-sm font-semibold ${nameColor} text-center leading-tight opacity-100`}
                  >
                    {logo.alt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* styles JUST for this component */}
      <style jsx>{`
        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          height: 112px; /* h-28 */
          width: 220px; /* sm:w-[220px] baseline */
          padding: 12px; /* p-3 */
          border-radius: 0.75rem; /* rounded-xl */
          margin-right: 12px; /* gap */
          backdrop-filter: blur(6px);
        }
        @media (min-width: 640px) {
          .card {
            margin-right: 16px; /* sm:gap-4-ish */
          }
        }

        .marquee {
          position: relative;
          width: 100%;
          cursor: default;
        }
        .marquee:hover .marquee-track {
          animation-play-state: paused;
        }
        .paused .marquee-track {
          animation-play-state: paused;
        }

        .marquee-track {
          display: inline-flex;
          align-items: center;
          width: max-content; /* let content define intrinsic width */
          animation: marquee var(--marquee-duration, 20s) linear infinite;
          will-change: transform;
          padding: 12px; /* outer p-3 to match your ring radius */
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* hide scrollbars just in case */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
