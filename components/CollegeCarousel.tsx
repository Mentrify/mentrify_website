/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Logo = {
  src: string;
  alt: string; // college name
};

export function CollegeCarousel({ useGrey = false }: { useGrey?: boolean }) {
  const logos: Logo[] = useMemo(
    () => [
      { src: "/clg-logos/iit_delhi.png", alt: "IIT Delhi" },
      { src: "/clg-logos/iit_bombay.png", alt: "IIT Bombay" },
      { src: "/clg-logos/iit_madras.png", alt: "IIT Madras" },
      { src: "/clg-logos/iit_kanpur.png", alt: "IIT Kanpur" },
      { src: "/clg-logos/iit_gandhinagar.png", alt: "IIT Gandhinagar" },
      { src: "/clg-logos/image.png", alt: "NIT Trichy" },
      { src: "/clg-logos/image (1).png", alt: "NIT Warangal" },
      { src: "/clg-logos/image (2).png", alt: "NIT Surathkal" },
      { src: "/clg-logos/image (3).png", alt: "BITS Pilani" },
      { src: "/clg-logos/image (4).png", alt: "VIT Vellore" },
      { src: "/clg-logos/image (5).png", alt: "SRM University" },
      { src: "/clg-logos/image (6).png", alt: "DTU Delhi" },
      { src: "/clg-logos/image (7).png", alt: "NSUT Delhi" },
      { src: "/clg-logos/image (8).png", alt: "IIIT Hyderabad" },
      { src: "/clg-logos/image (9).png", alt: "IIIT Delhi" },
      { src: "/clg-logos/image (10).png", alt: "PEC Chandigarh" },
      { src: "/clg-logos/image(11).png", alt: "IISER Pune" },
      { src: "/clg-logos/image (12).png", alt: "ISM Dhanbad" },
      { src: "/clg-logos/image (111).png", alt: "IIIT Bangalore" },
    ],
    []
  );

  // Duplicate for seamless scroll
  const items = useMemo(() => [...logos, ...logos, ...logos], [logos]);

  const shell = useGrey
    ? "bg-grey-1200"
    : "bg-[radial-gradient(120%_120%_at_0%_0%,theme(colors.secondaryPalette.100/_0.35),transparent_60%)]";
  const ring = useGrey ? "ring-white/10" : "ring-black/10";
  const strong = useGrey ? "text-primaryPalette-200" : "text-grey-900";
  const muted = useGrey ? "text-primaryPalette-200/80" : "text-grey-600";

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [duration, setDuration] = useState(30);
  const [isInView, setIsInView] = useState(true);

  // Calculate scroll duration dynamically
  useEffect(() => {
    const calc = () => {
      const track = trackRef.current;
      if (!track) return;
      const width = track.scrollWidth / 3;
      const pxPerSec = 120;
      const secs = Math.max(10, Math.min(60, width / pxPerSec));
      setDuration(secs);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Pause when not visible
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
      className={`relative ${shell} py-12`}
      aria-label="Top colleges using Mentrify mentors"
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Header */}
        <h2 className={`text-3xl md:text-4xl font-bold ${strong}`}>
          Mentors From Top Colleges
        </h2>
        <p className={`mx-auto mt-3 max-w-3xl ${muted} text-base md:text-lg`}>
          Connect with real students from IITs, NITs, BITS, and other premier institutions to get authentic insights and guidance.
        </p>

        {/* Carousel */}
        <div
          ref={viewportRef}
          className={`mt-10 relative overflow-hidden rounded-2xl ring-1 ${ring} backdrop-blur-md`}
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div
            className={`marquee ${isInView ? "" : "paused"} no-scrollbar`}
            style={
              {
                "--marquee-duration": `${duration}s`,
              } as React.CSSProperties
            }
          >
            <div ref={trackRef} className="marquee-track">
              {items.map((logo, i) => (
                <div
                  key={`${logo.src}-${i}`}
                  className="flex flex-col items-center justify-center mx-8"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={60}
                    className="object-contain h-12 sm:h-14 w-auto opacity-90"
                    priority={i < 6}
                  />
                  <span className={`mt-1 text-sm ${muted} text-center`}>
                    {logo.alt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .marquee {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .marquee:hover .marquee-track {
          animation-play-state: paused;
        }
        .paused .marquee-track {
          animation-play-state: paused;
        }

        .marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: scroll var(--marquee-duration, 30s) linear infinite;
          will-change: transform;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

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
