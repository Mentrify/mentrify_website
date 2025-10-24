/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Sparkles, Stars } from "lucide-react";
import { CollegeCarousel } from "@/components/CollegeCarousel";

// ── Toggle this to switch the whole page look ──────────────────────────────────
const USE_GREY = false;
// ───────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  // Use Element so refs can be <section> or <div>
  const sectionsRef = useRef<(Element | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.15 }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // HERO spotlight
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = heroSectionRef.current;
    if (!el) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--hx", `${x}%`);
    el.style.setProperty("--hy", `${y}%`);
  };
  const resetHeroSpotlight = () => {
    const el = heroSectionRef.current;
    if (!el) return;
    el.style.setProperty("--hx", "50%");
    el.style.setProperty("--hy", "35%");
  };

  // HOW IT WORKS spotlight (NEW – mirrors CTA)
  const howSectionRef = useRef<HTMLElement | null>(null);
  const handleHowMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = howSectionRef.current;
    if (!el) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--wx", `${x}%`);
    el.style.setProperty("--wy", `${y}%`);
  };
  const resetHowSpotlight = () => {
    const el = howSectionRef.current;
    if (!el) return;
    el.style.setProperty("--wx", "60%");
    el.style.setProperty("--wy", "20%");
  };

  // Design tokens that swap based on USE_GREY
  const bgBase = USE_GREY
    ? "bg-grey-1200 text-primaryPalette-200"
    : "bg-white text-grey-1200";
  const heroShell = USE_GREY
    ? "bg-gradient-to-b from-grey-1300 via-grey-1200 to-grey-1000"
    : "bg-[radial-gradient(120%_120%_at_50%_0%,theme(colors.primaryPalette.100/_0.55),transparent_60%),linear-gradient(to_bottom,white,theme(colors.secondaryPalette.100/_0.35))]";
  const gridOverlay = USE_GREY
    ? "bg-[linear-gradient(to_right,theme(colors.grey.1100/_0.25)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.grey.1100/_0.25)_1px,transparent_1px)] bg-[size:44px_44px]"
    : "bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] bg-[size:48px_48px]";
  const glowA = USE_GREY
    ? "bg-[radial-gradient(closest-side,theme(colors.primaryPalette.100),transparent_60%)]"
    : "bg-[radial-gradient(closest-side,theme(colors.secondaryPalette.200),transparent_60%)]";
  const glowB = USE_GREY
    ? "bg-[radial-gradient(closest-side,theme(colors.secondaryPalette.200),transparent_60%)]"
    : "bg-[radial-gradient(closest-side,theme(colors.primaryPalette.100),transparent_60%)]";
  const card = USE_GREY
    ? "bg-grey-1000/60 ring-1 ring-white/5"
    : "bg-white ring-1 ring-black/10";
  const muted = USE_GREY ? "text-primaryPalette-200/80" : "text-grey-600";
  const strong = USE_GREY ? "text-primaryPalette-200" : "text-grey-900";

  return (
    <div
      className={`min-h-screen antialiased selection:bg-primary-900/20 selection:text-primary-900 ${bgBase}`}
    >
      {/* 1) LANDING / HERO */}
      <section
        ref={(el) => {
          heroSectionRef.current = el;
        }}
        className="relative isolate pt-[150px] flex flex-col items-center text-center overflow-hidden"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={resetHeroSpotlight}
        style={{ ["--hx" as any]: "50%", ["--hy" as any]: "35%" }}
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className={`absolute inset-0 ${heroShell}`} />
          <div
            className={`absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full ${glowA} opacity-30 blur-3xl`}
          />
          <div
            className={`absolute -bottom-32 -right-28 h-[36rem] w-[36rem] rounded-full ${glowB} opacity-30 blur-3xl`}
          />
          <div className={`absolute inset-0 ${gridOverlay}`} />
          <div
            className="absolute inset-0"
            style={
              USE_GREY
                ? ({
                    backgroundImage: `radial-gradient(420px 420px at var(--hx) var(--hy), rgba(160,130,255,.35), transparent 70%)`,
                  } as React.CSSProperties)
                : ({
                    backgroundImage: `radial-gradient(420px 420px at var(--hx) var(--hy), rgba(160,130,255,.22), transparent 70%)`,
                  } as React.CSSProperties)
            }
          />
        </div>

        {/* Small pill */}
        <div
          className={`relative mx-auto rounded-full ${
            USE_GREY
              ? "bg-grey-1000/70 text-primaryPalette-200/80 ring-white/5"
              : "bg-white/70 text-grey-700 ring-black/10"
          } px-4 py-1.5 text-sm/6 backdrop-blur-md ring-1 shadow-sm hidden sm:flex items-center gap-2`}
        >
          <Stars
            className={`w-4 h-4 ${
              USE_GREY ? "text-primary-900/70" : "text-primary-900"
            }`}
          />
          Real talks. Real students. Real clarity.
        </div>

        {/* Copy */}
        <div
          ref={(el) => {
            sectionsRef.current[0] = el;
          }}
          className="relative z-10 mx-auto mt-10 mb-12 w-full max-w-5xl px-6 text-center opacity-0"
        >
          <h1
            className={`text-balance font-extrabold tracking-tight ${
              USE_GREY
                ? "text-5xl md:text-6xl"
                : "text-5xl md:text-6xl text-black"
            }`}
          >
            Make the Right Choice with Someone Who&apos;s Living It
          </h1>

          <p className={`mx-auto mt-6 max-w-2xl text-lg md:text-xl ${muted}`}>
            Choosing a college is overwhelming — but you don&apos;t have to do
            it alone. <b>Mentrify</b> connects you with real students from your
            target colleges for 1-on-1 mentorship, honest reviews, and insider
            advice.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/mentors" className="w-full max-w-md">
              <button className="apple-button text-base md:text-lg px-12 py-5 flex items-center justify-center group w-full relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-primary-900/0 via-primary-800/20 to-primary-900/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <Sparkles className="mr-3 h-5 w-5 md:h-6 md:w-6 text-white group-hover:rotate-12 transition-transform" />
                <span className="font-semibold">Find Your Perfect Mentor</span>
                <ArrowRight className="ml-3 h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            {[
              "Verified mentors",
              "Instant booking",
              "Money-back guarantee",
            ].map((item, i) => (
              <div
                key={i}
                className={`inline-flex items-center rounded-full px-3 py-1 backdrop-blur ${card}`}
              >
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span className={muted}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel for cllg logos */}
      <CollegeCarousel useGrey={USE_GREY} />

      {/* Feature cards row (still part of landing) */}
      <section className="relative">
        <div
          className="
    mx-auto w-[92%] max-w-6xl
    px-6 md:px-0
    mt-8 md:mt-12
  "
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { t: "Top colleges", d: "IIT, NIT, BITS +50 more" },
              { t: "Real insights", d: "No scripts. No fluff." },
              { t: "Book in minutes", d: "Pick a slot. Pay. Done." },
            ].map((cardItem, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl p-5 backdrop-blur-md transition hover:-translate-y-0.5 ${card} ${
                  USE_GREY
                    ? "hover:ring-primary-900/40"
                    : "hover:ring-primary-900/30"
                }`}
              >
                <div
                  className={`absolute -top-12 -right-12 h-36 w-36 rounded-full ${glowA} opacity-25 transition group-hover:opacity-40`}
                />
                <div className={`flex items-center gap-2 ${strong}`}>
                  <Sparkles className="h-5 w-5 text-primary-900/90" />
                  <p className="font-semibold">{cardItem.t}</p>
                </div>
                <p className={`mt-1 text-sm ${muted}`}>{cardItem.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2) ABOUT */}
      <section
        ref={(el) => {
          sectionsRef.current[1] = el;
        }}
        className={`${
          USE_GREY ? "bg-grey-1200" : "bg-white"
        } pt-6 md:pt-0 py-20 opacity-0`}
      >
        <div className="mx-auto max-w-6xl px-6 text-center mt-20">
          <h2 className={`text-3xl md:text-4xl font-bold ${strong}`}>
            About Mentrify
          </h2>
          <p className={`mx-auto mt-3 max-w-3xl ${muted}`}>
            We help students cut through the noise and find clarity when
            choosing colleges. Our mentors are authentic — they share real,
            experience-based insights so students can make informed decisions.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3 items-stretch">
            {[
              {
                t: "Clarity",
                d: "Cut through the noise with clear next steps and real examples from students who've been there before.",
              },
              {
                t: "Authenticity",
                d: "Get honest, experience-based guidance -> no scripts, no fluff, so you hear what really works on campus.",
              },
              {
                t: "Trust",
                d: "Ask anything in a safe, judgment-free space and leave with practical advice you can act on today.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className={`h-full rounded-2xl p-6 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,.03),0_10px_40px_-20px_rgba(120,99,255,.25)]
        ${
          USE_GREY
            ? "bg-grey-1300 ring-1 ring-white/5"
            : "bg-white ring-1 ring-black/10"
        }
        flex flex-col`}
              >
                <h3 className="text-2xl font-semibold text-primary-900 min-h-[40px]">
                  {c.t}
                </h3>

                {/* EXACTLY three lines: clamp + fixed line height + min-height for 3 rows */}
                <p
                  className={`mt-3 ${muted} text-[16px] leading-7 
          overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]
          min-h-[84px]`} // 3 * 28px (leading-7) = 84px
                >
                  {c.d}
                </p>

                <div className="mt-2" />
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/about">
              <button
                className={`group inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all hover:gap-3 ${
                  USE_GREY
                    ? "bg-grey-1000/70 text-primaryPalette-200 ring-1 ring-white/10 hover:ring-primary-900/50"
                    : "bg-white text-grey-900 ring-1 ring-black/10 hover:ring-primary-900/30 shadow-sm"
                }`}
              >
                Know More About Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3) HOW IT WORKS (with CTA-like background, FIXED) */}
      <section
        ref={(el) => {
          sectionsRef.current[2] = el;
          howSectionRef.current = el;
        }}
        className={`relative overflow-hidden py-20 opacity-0 ${
          USE_GREY ? "bg-grey-1200" : "bg-white"
        }`}
        onMouseMove={handleHowMouseMove}
        onMouseLeave={resetHowSpotlight}
        style={{ ["--wx" as any]: "60%", ["--wy" as any]: "20%" }} // default spotlight
      >
        {/* Interactive spotlight background (correct syntax) */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={
            USE_GREY
              ? ({
                  backgroundImage: `
                    radial-gradient(340px 340px at var(--wx) var(--wy), rgba(160,130,255,.32), transparent 70%),
                    radial-gradient(60% 60% at 100% 100%, rgba(187,160,255,.20), transparent 70%)
                  `,
                } as React.CSSProperties)
              : ({
                  backgroundImage: `
                    radial-gradient(320px 320px at var(--wx) var(--wy), rgba(160,130,255,.22), transparent 70%),
                    linear-gradient(to bottom, rgba(187,160,255,.10), transparent)
                  `,
                } as React.CSSProperties)
          }
        />

        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={`text-3xl md:text-4xl font-bold ${strong}`}>
              How It Works
            </h2>
            <p className={`mt-3 ${muted}`}>
              A simple, modern flow designed for clarity and speed.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Explore",
                desc: "Browse verified students from top colleges. Filter by course, college, or interests to find the perfect guide.",
              },
              {
                title: "Schedule",
                desc: "Choose a date and time that works for you. Pay securely and confirm your session.",
              },
              {
                title: "Connect",
                desc: "Have a 1-on-1 conversation, get transparent guidance, and make decisions with confidence.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-6 shadow-[0_10px_40px_-20px_rgba(120,99,255,.35)] bg-gradient-to-b ${
                  USE_GREY
                    ? "from-grey-1300 to-grey-1200 ring-1 ring-white/5"
                    : "from-white to-white ring-1 ring-black/10"
                }`}
              >
                <span
                  className={`absolute -top-3 left-5 inline-flex h-8 w-8 items-center justify-center rounded-full ${
                    USE_GREY
                      ? "bg-grey-1000 text-primary-900 ring-1 ring-white/10"
                      : "bg-white text-primary-900 ring-1 ring-black/10"
                  } text-sm font-semibold`}
                >
                  {i + 1}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-primary-900">
                  {s.title}
                </h3>
                <p className={`mt-2 ${muted}`}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/how-it-works">
              <button
                className={`group inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all hover:gap-3 ${
                  USE_GREY
                    ? "bg-grey-1000/70 text-primaryPalette-200 ring-1 ring-white/10 hover:ring-primary-900/50"
                    : "bg-white text-grey-900 ring-1 ring-black/10 hover:ring-primary-900/30 shadow-sm"
                }`}
              >
                Learn More About the Process
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4) READY / CTA */}
      {/* <section className="bg-black text-white overflow-hidden py-20 flex items-center justify-center">
        <div className="mx-auto w-full max-w-3xl px-6 text-center">
          <h2 className={`text-4xl font-bold ${strong} text-white`}>
            Ready to make the right choice?
          </h2>
          <p className="mt-4 text-lg text-white">
            Connect with a mentor today for a short, focused session and get the
            clarity you need to move forward.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/mentors">
              <button
                className="apple-button text-lg px-8 py-4 transition-transform duration-200 will-change-transform"
                style={{
                  transform:
                    "translate3d(calc((var(--xnum) - 50) * 0.06px), calc((var(--ynum) - 50) * 0.06px), 0)",
                }}
              >
                Browse Mentors
              </button>
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
}
