"use client";

import { useEffect, useRef } from "react";
import {
  Search,
  Calendar,
  MessageCircle,
} from "lucide-react";
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

export default function HowItWorksPage() {
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

  const steps = [
    {
      num: "01",
      title: "Explore",
      desc: "Browse verified students from top colleges. Filter by course, college, or interests to find the perfect guide.",
      icon: Search,
    },
    {
      num: "02",
      title: "Schedule",
      desc: "Choose a date and time that works for you. Pay securely and confirm your session.",
      icon: Calendar,
    },
    {
      num: "03",
      title: "Connect",
      desc: "Have a 1-on-1 conversation, get transparent guidance, and make decisions with confidence.",
      icon: MessageCircle,
    },
  ];

  return (
    <div className="min-h-screen antialiased bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,theme(colors.primaryPalette.100/_0.55),transparent_60%),linear-gradient(to_bottom,white,theme(colors.secondaryPalette.100/_0.25))]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div
            ref={(el) => {
              sectionsRef.current[0] = el;
            }}
            className="opacity-0"
          >
            <h1 className="mt-10 text-5xl md:text-6xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-black via-violet-500 to-pink-400 bg-clip-text text-transparent">
                How It Works
                </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Three simple steps to find clarity
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section with Curved Path */}
      <section
        ref={(el) => {
          sectionsRef.current[1] = el;
        }}
        className="py-10 opacity-0 bg-white"
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative">
            {/* Curved SVG Path */}
            <svg
              className="absolute left-0 top-0 w-full h-full hidden lg:block pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path
                d="M 100 80 Q 250 200, 100 380 Q -50 560, 100 740"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="3"
                strokeDasharray="8,8"
                strokeLinecap="round"
              />
            </svg>

            {/* Steps */}
            <div className="space-y-32 lg:space-y-40">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isEven = idx % 2 === 0;
                
                return (
                  <div 
                    key={idx} 
                    className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
                      isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Circle Node */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-28 h-28 rounded-full flex items-center justify-center bg-white ring-2 ring-violet-200 shadow-[0_24px_80px_-40px_rgba(120,99,255,.35)] hover:shadow-[0_40px_120px_-40px_rgba(120,99,255,.45)] transition-all hover:scale-105">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center">
                          <Icon className="h-12 w-12 text-violet-600" />
                        </div>
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 ${isEven ? 'lg:text-left' : 'lg:text-right'}`}>
                      <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur ring-1 ring-black/10 p-8 shadow-[0_24px_80px_-40px_rgba(120,99,255,.35)] hover:shadow-[0_40px_120px_-40px_rgba(120,99,255,.45)] transition-all hover:-translate-y-1 cursor-pointer">
                        {/* Gradient border effect */}
                        <div className="absolute inset-0 rounded-3xl p-[1px]">
                          <div className="h-full w-full rounded-[calc(1.5rem-1px)] bg-gradient-to-br from-violet-300/40 via-purple-200/30 to-blue-200/30" />
                        </div>
                        
                        <div className="relative flex items-center gap-8">
                          {/* Left: Title Section */}
                          <div className="flex items-baseline gap-4 flex-shrink-0">
                            <span className="text-6xl font-bold bg-gradient-to-r from-primary-900 via-violet-500 to-pink-400 bg-clip-text text-transparent transition-all group-hover:scale-110">
                              {step.num}
                            </span>
                            <h3 className="text-3xl font-bold text-grey-900 transition-all group-hover:text-primary-900 whitespace-nowrap">
                              {step.title}
                            </h3>
                          </div>
                          
                          {/* Right: Description - Hidden by default, appears on hover */}
                          <div className="flex-1 overflow-hidden">
                            <p className="text-lg text-gray-600 opacity-0 translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                              {step.desc}
                            </p>
                          </div>
                        </div>

                        {/* Hover indicator */}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-900 to-violet-500 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}