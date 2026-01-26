"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50" />
      </div>

      {/* Content */}
      <div className="w-full max-w-3xl text-center">
        {/* Logo mark */}
        <Link href="/" className="flex items-center justify-center space-x-2 group mb-6">
          <Image
            src="/6-removebg-preview.png"
            alt="Mentrify"
            width={140}
            height={140}
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Brand Name */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-8">
          Mentrify
        </h1>

        {/* Main Line */}
        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
          Something amazing is <br className="hidden sm:block" />
          coming soon.
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
          We’re building the future of student mentorship.
          <br />
          Be among the first to experience it.
        </p>

        {/* CTA */}
        {/* <Link href="#early-access">
          <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-slate-900 text-white font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300">
            Early Access
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </Link> */}
      </div>
    </div>
  );
}
