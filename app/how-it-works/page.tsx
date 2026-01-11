"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function HowItWorksPage() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      num: 1,
      title: "Find Your Mentor",
      desc: "Browse verified mentors from top colleges and filter by your preferences. Search by college, course, branch, or interests to find the perfect match.",
    },
    {
      num: 2,
      title: "Schedule a Session",
      desc: "Pick a convenient time slot and book your 1-on-1 mentorship session. No back-and-forth — just seamless scheduling.",
    },
    {
      num: 3,
      title: "Connect & Learn",
      desc: "Join your video session and get personalized guidance from your mentor. Ask questions, get real insights, and learn from experience.",
    },
    {
      num: 4,
      title: "Achieve Your Goals",
      desc: "Walk away with clarity and confidence to make the right decisions. Your mentor helps you see the path forward.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .liquid-glass {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(30px) saturate(180%);
          -webkit-backdrop-filter: blur(30px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.6);
        }

        .liquid-glass-strong {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(40px) saturate(200%);
          -webkit-backdrop-filter: blur(40px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.8),
            0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .liquid-glass-accent {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(255, 255, 255, 0.3) 100%
          );
          backdrop-filter: blur(35px) saturate(190%);
          -webkit-backdrop-filter: blur(35px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.09),
            inset 0 2px 4px 0 rgba(255, 255, 255, 0.7);
        }

        .bento-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .bento-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px 0 rgba(0, 0, 0, 0.15),
            inset 0 2px 4px 0 rgba(255, 255, 255, 0.9);
        }
      `}</style>

      <div className="max-w-[1300px] mx-auto px-4 md:px-6 py-12 pt-[150px]">
        {/* Hero Title Section */}
        <section
          ref={(el) => {
            if (el) sectionsRef.current[0] = el as HTMLDivElement;
          }}
          className="text-center mb-16 opacity-0"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass mb-8">
            <Sparkles className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-semibold text-gray-800">
              Simple & Effective
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 mb-6 leading-[0.95]">
            How It{" "}
            <span className="bg-gradient-to-r from-primary-900 via-violet-500 to-pink-400 bg-clip-text text-transparent">
              Works
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            From discovery to conversation, Mentrify streamlines every step —{" "}
            <span className="font-semibold text-gray-900">
              connect with mentors in minutes
            </span>
          </p>
        </section>

        {/* Steps Grid */}
        <section
          ref={(el) => {
            if (el) sectionsRef.current[1] = el as HTMLDivElement;
          }}
          className="opacity-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bento-card liquid-glass-strong rounded-[2rem] p-8 md:p-10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {step.num}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
