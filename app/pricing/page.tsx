"use client";

import { Check, Star, Crown, Users } from "lucide-react";

const plans = [
  {
    name: "Student Plan",
    subtitle: "For Students",
    icon: Star,
    price: 199,
    priceLabel: "/ Session",
    tagline: "Perfect for individual learners",
    perks: [
      "1:1 mentorship session",
      "College & career guidance",
      "Honest reviews & insider tips",
      "Session summary & action items",
      "Chat support for follow-ups",
    ],
    highlight: false,
  },
  {
    name: "B2B / Organisation",
    icon: Users,
    price: 119,
    priceLabel: "/ Session",
    tagline: "+ Annual subscription charges",
    perks: [
      "Bulk session booking for teams",
      "Dedicated account manager",
      "Custom mentor matching",
      "Analytics & reporting dashboard",
      "Invoice & GST billing",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Premium Membership",
    icon: Crown,
    price: 299,
    priceLabel: "/ Month",
    tagline: "Unlimited access for power users",
    perks: [
      "Unlimited mentorship sessions",
      "Priority booking slots",
      "Exclusive mentor access",
      "Monthly progress reviews",
      "Resources & study materials",
      "Community access",
    ],
    highlight: false,
    ribbon: "Best Value",
  },
];

export default function Pricing() {
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
        </div>

        {/* cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((p, i) => (
            <PricingCard key={i} {...p} />
          ))}
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
  subtitle,
  icon: Icon,
  price,
  originalPrice,
  priceLabel,
  tagline,
  discount,
  perks,
  highlight,
  ribbon,
}: {
  name: string;
  subtitle?: string;
  icon: any;
  price: number;
  originalPrice?: number;
  priceLabel: string;
  tagline?: string;
  discount?: string;
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
          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            {originalPrice && (
              <span className="text-xl text-gray-400 line-through">
                ₹{originalPrice}
              </span>
            )}
            <span className="text-4xl font-extrabold tracking-tight">
              ₹{price}
            </span>
            <span className="text-gray-500 text-sm">{priceLabel}</span>
          </div>
          {discount && (
            <p className="mt-1 text-sm font-medium text-emerald-600">{discount}</p>
          )}
          {tagline && (
            <p className="mt-1 text-sm text-gray-600">{tagline}</p>
          )}
        </div>

        {/* perks list */}
        <ul className="mt-5 space-y-2 text-sm grow">
          {perks.map((f) => (
            <li key={f} className="flex gap-2">
              <Check className="h-4 w-4 mt-0.5 text-emerald-600" />
              <span className="text-gray-700">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
