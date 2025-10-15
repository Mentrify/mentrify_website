"use client";

import React, { useMemo } from "react";
import {
  ArrowRight,
  Users,
  Award,
  TrendingUp,
  Star,
  DollarSign,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function BecomeMentorPage() {
  // Stats
  const stats = useMemo(
    () => [
      {
        icon: DollarSign,
        number: "₹100",
        label: "Per Session",
        grad: "from-emerald-300/50 to-emerald-500/40",
        iconBg: "bg-emerald-500",
      },
      {
        icon: Users,
        number: "1000+",
        label: "Students Helped",
        grad: "from-blue-300/50 to-blue-500/40",
        iconBg: "bg-blue-500",
      },
      {
        icon: Star,
        number: "4.9",
        label: "Avg. Rating",
        grad: "from-amber-300/50 to-amber-500/40",
        iconBg: "bg-amber-500",
      },
      {
        icon: TrendingUp,
        number: "98%",
        label: "Success Rate",
        grad: "from-violet-300/50 to-violet-500/40",
        iconBg: "bg-violet-500",
      },
    ],
    []
  );

  // Benefits
  const benefits = useMemo(
    () => [
      {
        icon: Award,
        title: "Verified Certificate",
        desc: "Get a mentor certificate to showcase on LinkedIn and resumes.",
        accent: "from-blue-50 to-white",
      },
      {
        icon: TrendingUp,
        title: "Build Your Brand",
        desc: "Position yourself as a thought leader among your peers.",
        accent: "from-violet-50 to-white",
      },
      {
        icon: Users,
        title: "Impact Students",
        desc: "Provide authentic guidance that helps juniors succeed.",
        accent: "from-emerald-50 to-white",
      },
    ],
    []
  );

  function StatCard({
    Icon,
    number,
    label,
    grad,
    iconBg,
  }: {
    Icon: React.ElementType;
    number: string;
    label: string;
    grad: string;
    iconBg: string;
  }) {
    return (
      <div className="relative rounded-3xl">
        {/* gradient border */}
        <div
          className={`absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br ${grad}`}
        >
          <div className="h-full w-full rounded-[calc(1.5rem-1px)] bg-white/85 backdrop-blur" />
        </div>

        {/* card */}
        <div
          className="relative rounded-3xl p-6 shadow-[0_24px_60px_-28px_rgba(120,99,255,.35)] transition
                      hover:-translate-y-0.5 hover:shadow-[0_36px_90px_-30px_rgba(120,99,255,.45)]"
        >
          <div className="flex items-center gap-4">
            <div
              className={`h-12 w-12 rounded-2xl ${iconBg} text-white grid place-items-center shadow-sm`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-semibold leading-none tracking-tight">
                {number}
              </div>
              <div className="mt-1 text-sm text-gray-600">{label}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased selection:bg-primary-900/20">
      {/* HERO */}
      <section className="relative overflow-hidden mt-20 pb-20">
        {/* background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(120,99,255,0.20),transparent_60%),linear-gradient(to_bottom,white,rgba(212,172,208,0.20))]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute -right-24 -top-24 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(160,130,255,.35),transparent_70%)] blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(closest-side,rgba(187,160,255,.25),transparent_70%)] blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center mt-4 gap-2 rounded-full bg-white/70 ring-1 ring-black/10 shadow-sm backdrop-blur px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-primary-900 " />
            <span className="text-sm text-gray-700">
              Earn, impact, and grow as a verified mentor
            </span>
          </div>

          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight">
            Share Your Journey. <br />
            <span className="bg-gradient-to-r from-primary-900 via-violet-500 to-pink-400 bg-clip-text text-transparent">
              Shape Someone&apos;s Future.
            </span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Turn your college experience into guidance for the next generation.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/signup"
              className="apple-button text-lg px-8 py-4 inline-flex items-center justify-center"
            >
              Start Application <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="#benefits"
              className="apple-button-secondary text-lg px-8 py-4 inline-flex items-center justify-center"
            >
              Why mentor?
            </a>
          </div>

          {/* Stats */}
          <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <StatCard
                key={i}
                Icon={s.icon}
                number={s.number}
                label={s.label}
                grad={s.grad}
                iconBg={s.iconBg}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why Mentor with Mentrify?
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Make an impact, grow your personal brand, and earn while helping
            juniors.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {benefits.map((b, i) => (
              <article
                key={i}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-b ${b.accent} ring-1 ring-black/10 p-8 text-left transition hover:-translate-y-0.5 hover:shadow-xl`}
              >
                <div className="absolute -top-12 -right-10 h-36 w-36 rounded-full bg-[radial-gradient(closest-side,rgba(160,130,255,.25),transparent_60%)] opacity-30 group-hover:opacity-50" />
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl grid place-items-center bg-white ring-1 ring-black/10">
                    <b.icon className="h-6 w-6 text-primary-900" />
                  </div>
                  <h3 className="text-xl font-semibold">{b.title}</h3>
                </div>
                <p className="mt-3 text-gray-700">{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS (no form) */}
      <section>
        <div className="max-w-6xl mx-auto px-6 mb-10">
          {/* Steps */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Your Next Steps</h2>
            <p className="mt-3 text-lg text-gray-600">
              Becoming a mentor is simple — just apply, get verified, and start
              guiding.
            </p>

            <ol className="mt-8 space-y-6">
              {[
                {
                  t: "Quick 5-min application",
                  d: "Tell us about your college, course, and why you want to mentor.",
                },
                {
                  t: "Profile verification",
                  d: "We verify your identity and details within 24 hours.",
                },
                {
                  t: "Start earning",
                  d: "Go live and earn ₹100 per session with flexible scheduling.",
                },
              ].map((s, i) => (
                <li
                  key={i}
                  className="relative rounded-2xl bg-white p-6 ring-1 ring-black/10 shadow-[0_12px_40px_-28px_rgba(120,99,255,.35)]"
                >
                  <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white ring-1 ring-black/10 text-sm font-semibold text-primary-900">
                    {i + 1}
                  </span>
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600" /> {s.t}
                  </h4>
                  <p className="mt-1 text-gray-600">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="py-20 text-center bg-black">
        <h2 className="text-4xl font-bold text-white">
          Ready to Start Mentoring?
        </h2>
        <p className="mt-3 text-lg text-gray-500">
          Help juniors. Build your brand. Earn along the way.
        </p>
        <a
          href="/signup"
          className="mt-6 inline-block apple-button text-lg px-8 py-4"
        >
          Apply Now
        </a>
      </section> */}
    </div>
  );
}
