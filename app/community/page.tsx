"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Users,
  Heart,
  Zap,
  Network,
  Lightbulb,
} from "lucide-react";

// Constants
const STEPS = [
  {
    number: 1,
    title: "Open a Support Ticket",
    description: "When a student joins our Discord community, they start by opening a support ticket and answering a few quick questions.",
    bgGradient: "from-primary-50 to-primary-100",
    borderColor: "border-primary-200",
    badgeBg: "bg-primary-500",
  },
  {
    number: 2,
    title: "Get Verified",
    description: "This helps us understand their background, interests, and learning goals. Once verified, they gain full access to the server.",
    bgGradient: "from-secondaryPalette-100/20 to-secondary-100/20",
    borderColor: "border-primary-300",
    badgeBg: "bg-primary-600",
  },
  {
    number: 3,
    title: "Unlock Full Access",
    description: "Access channels for discussions, mentorship, and networking with verified mentors and fellow students.",
    bgGradient: "from-primary-100/30 to-primary-50",
    borderColor: "border-primary-300",
    badgeBg: "bg-primary-700",
  },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Easy Mentorship Access",
    description: "For smaller doubts or quick guidance, students can directly ping their mentors on Discord chat without needing to schedule a call. This makes learning instant, personal, and engaging.",
    iconBg: "bg-primary-100",
  },
  {
    icon: Heart,
    title: "More Than a Platform",
    description: "Mentrify isn't about business, it's about building meaningful relationships and creating impact through peer and mentor support.",
    iconBg: "bg-secondary-100",
  },
  {
    icon: Users,
    title: "Student-to-Student Connections",
    description: "Our community fosters collaboration among learners, helping them share experiences, grow together, and build lasting friendships.",
    iconBg: "bg-primary-100",
  },
  {
    icon: Network,
    title: "Mentor Networking",
    description: "Mentors can connect among themselves, forming a network of passionate guides dedicated to student success and mutual growth.",
    iconBg: "bg-secondary-100",
  },
];

const STATS = [
  { number: "500+", label: "Active Community Members" },
  { number: "100+", label: "Verified Mentors" },
  { number: "24/7", label: "Support Available" },
];

// Component for feature card
const FeatureCard = ({ feature }: { feature: typeof FEATURES[0] }) => {
  const Icon = feature.icon;
  return (
    <div className="bg-white rounded-3xl p-8 border border-primary-200 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 ${feature.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
          <Icon className="h-7 w-7 text-primary-600" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-grey-200 mb-3">
            {feature.title}
          </h3>
          <p className="text-grey-700 leading-relaxed">{feature.description}</p>
        </div>
      </div>
    </div>
  );
};

// Component for step card
const StepCard = ({ step }: { step: typeof STEPS[0] }) => {
  return (
    <div className="relative">
      <div className={`bg-gradient-to-br ${step.bgGradient} rounded-3xl p-8 ${step.borderColor} border h-full`}>
        <div className={`w-16 h-16 ${step.badgeBg} rounded-full flex items-center justify-center mb-6 text-white font-bold text-xl`}>
          {step.number}
        </div>
        <h3 className="text-2xl font-semibold text-grey-200 mb-3">
          {step.title}
        </h3>
        <p className="text-grey-700 leading-relaxed">{step.description}</p>
      </div>
      {/* Connector for desktop */}
      <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-primary-300 to-primary-400"></div>
    </div>
  );
};

export default function CommunityPage() {
  return (
    <div className="min-h-screen text-grey-1200 selection:bg-primary-900/20 selection:text-primary-900">
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(120%_120%_at_50%_0%,theme(colors.primaryPalette.100/_0.55),transparent_60%),linear-gradient(to_bottom,white,theme(colors.secondaryPalette.100/_0.25))]">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mt-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-grey-200 mb-4 sm:mb-6 leading-tight">
              Our Community
            </h1>
            <p className="text-xl sm:text-2xl text-primary-900 max-w-3xl mx-auto mb-8">
              Built on Discord, Driven by Students
            </p>
            <p className="text-lg sm:text-xl text-grey-700 max-w-2xl mx-auto leading-relaxed">
              At Mentrify, we believe mentorship goes beyond scheduled calls 
              it's about building a supportive, collaborative, and inspiring
              community where every student can thrive.
            </p>
          </div>

          {/* Discord CTA Button */}
          <div className="flex justify-center gap-4 flex-wrap mt-8">
            <Link
              href="https://discord.gg/your-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="apple-button text-base md:text-lg px-8 py-4 flex items-center justify-center group w-full relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-primary-900/0 via-primary-800/20 to-primary-900/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <MessageCircle className="h-5 w-5 mr-2 text-white" />
                <span className="font-semibold text-white">
                  Join Our Discord
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-grey-200 text-center mb-4 sm:mb-6">
            How It Works
          </h2>
          <p className="text-center text-lg text-grey-700 mb-12 sm:mb-16 max-w-2xl mx-auto">
            A simple, three-step process to join our thriving community
          </p>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {STEPS.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-1 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-grey-200 text-center mb-12 sm:mb-16">
            What Makes Our Community Special
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-primary-900 via-primary-700 to-secondaryPalette-100 rounded-3xl p-12 sm:p-16 text-white text-center">
            <Lightbulb className="h-16 w-16 mx-auto mb-6 text-primary-100" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Our Mission
            </h2>
            <p className="text-lg sm:text-xl text-primary-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              We are building a community by the students, for the students, a
              space where curiosity thrives, doubts turn into learning, and
              mentorship turns into friendship.
            </p>
            <p className="text-lg sm:text-xl text-primary-100 leading-relaxed">
              At Mentrify, we're not just guiding students, we're growing with
              them.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl sm:text-5xl font-bold text-primary-600 mb-3">
                  {stat.number}
                </div>
                <p className="text-lg text-grey-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
