"use client"

import React from "react";
import {
  ArrowRight,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Sparkles,
  X,
} from "lucide-react";

export default function BecomeMentorPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const benefits = [
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
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased selection:bg-primary-900/20">
      {/* HERO */}
      <section className="relative overflow-hidden mt-[145px] pb-20">
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
              Shape Someone's Future.
            </span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Turn your college experience into guidance for the next generation.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => window.location.href = "https://app.mentrify.com/mentor-signup"}
              className="apple-button text-lg px-8 py-4 inline-flex items-center justify-center"
            >
              Start Application <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <a
              href="#benefits"
              className="apple-button-secondary text-lg px-8 py-4 inline-flex items-center justify-center"
            >
              Why mentor?
            </a>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="py-5">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why Mentor with Mentrify?
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Make an impact, grow your personal brand, and earn while helping
            juniors.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {benefits.map((b, i) => {
              const IconComponent = b.icon;
              return (
                <article
                  key={i}
                  className={`group relative overflow-hidden rounded-3xl bg-gradient-to-b ${b.accent} ring-1 ring-black/10 p-8 text-left transition hover:-translate-y-0.5 hover:shadow-xl`}
                >
                  <div className="absolute -top-12 -right-10 h-36 w-36 rounded-full bg-[radial-gradient(closest-side,rgba(160,130,255,.25),transparent_60%)] opacity-30 group-hover:opacity-50" />
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl grid place-items-center bg-white ring-1 ring-black/10">
                      <IconComponent className="h-6 w-6 text-primary-900" />
                    </div>
                    <h3 className="text-xl font-semibold">{b.title}</h3>
                  </div>
                  <p className="mt-3 text-gray-700">{b.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section>
        <div className="max-w-6xl mx-auto px-6 mb-10">
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
                  d: "We will verify your identity and get back to you within 24 hours.",
                },
                {
                  t: "Start mentoring and earning",
                  d: "Once approved, you can start taking mentee sessions and earning.",
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

      {/* Modal */}
      {/* {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
            
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-900 to-violet-600 mb-6">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">Ready to Make an Impact?</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Fill out our quick 5-minute application form and join hundreds of mentors helping students succeed. We'll review your application and get back to you within 24 hours!
              </p>
              
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfa5VsGV8n26SslUehuFqtsR-rVwHVjV22BqosFFzzNvW44vg/viewform?usp=preview"
                target="_blank"
                rel="noopener noreferrer"
                className="apple-button text-base px-8 py-4 inline-flex items-center justify-center w-full"
              >
                Open Application Form <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}