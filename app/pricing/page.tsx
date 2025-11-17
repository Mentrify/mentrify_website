"use client";

import { useState } from "react";
import { Check, Star, Crown, Rocket } from "lucide-react";
import Link from "next/link";

type Phase = "early" | "post";

const features = {
  base: [
    "1 mentorship call included",
    "Access to Discord (Basic)",
    "Free resource on booking",
  ],
  membership: [
    "2 mentorship calls (2nd at ₹99)",
    "Premium Discord access",
    "2 free webinars/workshops",
    "Career path materials",
    "Priority to apply as Mentor (from 2nd year)",
  ],
};

// Renamed per SS
const plans = {
  early: [
    {
      name: "Early Unlock Pass",
      icon: Rocket,
      price: 99,
      cta: "Grab Early Access",
      perks: features.base,
      highlight: false,
    },
    {
      name: "Standard Access Pass",
      icon: Star,
      price: 199,
      cta: "Upgrade Plan",
      perks: features.base,
      highlight: true, // Popular
    },
  ],
  post: [
    {
      name: "Early Unlock Pass",
      icon: Rocket,
      price: 199,
      cta: "Start Now",
      perks: features.base,
      highlight: false,
    },
    {
      name: "Standard Access Pass",
      icon: Star,
      price: 299,
      cta: "Go Standard",
      perks: features.base,
      highlight: true,
    },
  ],
  membership: [
    {
      name: "Power Access Pass (Membership)",
      icon: Crown,
      price: 299, // launch price
      cta: "Become a Member",
      perks: [...features.base, ...features.membership],
      highlight: true,
    },
  ],
};

export default function Pricing() {
  const [phase, setPhase] = useState<Phase>("early");
  const active = phase === "early" ? plans.early : plans.post;

  return (
    <section className="relative py-20">
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,theme(colors.primaryPalette.100/_0.55),transparent_60%),linear-gradient(to_bottom,white,theme(colors.secondaryPalette.100/_0.25))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-10">
        {/* header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Simple, transparent{" "}
            <span className="bg-gradient-to-r from-primary-900 via-violet-500 to-pink-400 bg-clip-text text-transparent">
              pricing
            </span>
          </h2>
          <p className="mt-3 text-gray-600">
            Pick a plan that matches where you are. Upgrade anytime.
          </p>

          {/* phase toggle */}
          <div className="mt-6 inline-flex items-center rounded-full bg-white/70 ring-1 ring-black/10 backdrop-blur p-1">
            <button
              onClick={() => setPhase("early")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  phase === "early"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm"
                    : "text-gray-700 hover:bg-white"
                }`}
            >
              Early Bird
            </button>
            <button
              onClick={() => setPhase("post")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  phase === "post"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm"
                    : "text-gray-700 hover:bg-white"
                }`}
            >
              Post Early
            </button>
          </div>
        </div>

        {/* cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {active.map((p, i) => (
            <PricingCard key={i} {...p} />
          ))}
          <PricingCard {...plans.membership[0]} ribbon="Best Value" />
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Taxes may apply. You can switch plans anytime.
        </p>
      </div>
    </section>
  );
}

function PricingCard({
  name,
  icon: Icon,
  price,
  cta,
  perks,
  highlight,
  ribbon,
}: {
  name: string;
  icon: any;
  price: number;
  cta: string;
  perks: string[];
  highlight?: boolean;
  ribbon?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur ring-1 ring-black/10 h-full
        shadow-[0_24px_80px_-40px_rgba(120,99,255,.35)]
        transition hover:-translate-y-1 hover:shadow-[0_40px_120px_-40px_rgba(120,99,255,.45)]`}
    >
      {/* gradient border */}
      <div className="absolute inset-0 rounded-3xl p-[1px]">
        <div className="h-full w-full rounded-[calc(1.5rem-1px)] bg-gradient-to-br from-violet-300/40 via-purple-200/30 to-blue-200/30" />
      </div>

      {/* ribbon */}
      {(highlight || ribbon) && (
        <div className="absolute right-4 top-4 z-10">
          <span className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-medium text-white shadow">
            {ribbon ?? "Popular"}
          </span>
        </div>
      )}

      {/* content */}
      <div className="relative p-7 flex flex-col h-full">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 grid place-items-center rounded-xl bg-violet-50 ring-1 ring-violet-200 text-violet-600">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>

        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-4xl font-extrabold tracking-tight">
            ₹{price}
          </span>
          <span className="text-gray-500 text-sm">/ one-time</span>
        </div>

        {/* grow keeps button aligned across cards */}
        <ul className="mt-5 space-y-2 text-sm grow">
          {perks.map((f) => (
            <li key={f} className="flex gap-2">
              <Check className="h-4 w-4 mt-0.5 text-emerald-600" />
              <span className="text-gray-700">{f}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/find-mentors"
          className="mt-6 block rounded-xl text-center text-sm font-medium px-4 py-3
            bg-black text-white hover:opacity-90 transition
            focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
        >
          {cta}
        </Link>

        <div className="mt-3 text-[11px] text-gray-500">
          Includes free resource on booking. Calls after the included ones use
          standard pricing.
        </div>
      </div>
    </div>
  );
}
