"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    title: "Getting Started",
    items: [
      {
        q: "What is Mentrify and how does it work?",
        a: "Mentrify is a 1-on-1 mentorship platform that connects you with verified students from top colleges. You can talk to them about courses, campus life, placements, and decision-making — directly from someone who’s been through it.",
      },
      {
        q: "Who are the mentors on Mentrify?",
        a: "Our mentors are real students and recent graduates from top universities who’ve been carefully verified by our team. They bring authentic, first-hand experience to guide you.",
      },
      {
        q: "Do I need to create an account to use Mentrify?",
        a: "Yes — creating an account helps us personalise your experience and lets you book, track, and manage your sessions easily.",
      },
      {
        q: "What kind of questions can I ask a mentor?",
        a: "Anything related to college life — from course difficulty, placements, and clubs to accommodation, internships, and how to prepare for entrance exams.",
      },
      {
        q: "How is Mentrify different from career counselling?",
        a: "Traditional counselling gives generic advice. Mentrify connects you directly with someone who’s actually living your dream — for real, practical insights.",
      },
    ],
  },
  {
    title: "Bookings & Sessions",
    items: [
      {
        q: "How do I book a session?",
        a: "Simply choose a mentor, pick a convenient time, and confirm your booking. You’ll receive a calendar invite and link for your session.",
      },
      {
        q: "How long are the sessions?",
        a: "Session durations are dependent on the package the user has signed up for. Different packages offer various durations.",
      },
      {
        q: "Can I book multiple sessions with the same mentor?",
        a: "Yes! If you feel connected or need ongoing guidance, you can book multiple sessions anytime.",
      },
      {
        q: "What if I want to talk to more than one mentor?",
        a: "You can book as many different mentors as you like — many students do this to compare different colleges or courses.",
      },
      {
        q: "What if my mentor doesn’t show up?",
        a: "In rare cases like this, manual intervention will be required. A request has to be put up on the contact us section and then it will be reviewed by us. If approved, you will get the refund.",
      },
      {
        q: "Are sessions recorded?",
        a: "No, sessions are private and confidential. We don’t record them to ensure a safe space for honest conversations.",
      },
    ],
  },
  {
    title: "Payments and Refunds",
    items: [
      {
        q: "How do I pay for a session?",
        a: "Payments are made securely on the platform when you book. We accept all major cards, UPI, and digital wallets.",
      },
      {
        q: "Do mentors set their own prices?",
        a: "Yes, each mentor decides their own session fee based on their experience. You’ll see the price before booking.",
      },
      {
        q: "Can I get a refund if I cancel?",
        a: "Manual intervention shall be required. A request has to be put up on the contact us section and then it will be reviewed by us. If approved, you will get the refund.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. All payments are encrypted and processed through trusted payment gateways. We don’t store any sensitive payment data.",
      },
    ],
  },
  {
    title: "Becoming a Mentor",
    items: [
      {
        q: "Who can become a mentor on Mentrify?",
        a: "Anyone currently studying at a college or a recent graduate with relevant experience can apply to mentor.",
      },
      {
        q: "How does the application process work?",
        a: "Fill out the mentor application form, share your details, and go through a short verification call. Once approved, you’ll start receiving bookings.",
      },
      {
        q: "Do mentors get paid?",
        a: "Yes — mentors set their own session fee and are paid for every session they complete.",
      },
      {
        q: "How much time do I need to commit as a mentor?",
        a: "There’s no fixed requirement. You decide how many sessions you want to take and when.",
      },
      {
        q: "Can I pause or stop mentoring anytime?",
        a: "Yes, you have full flexibility. You can pause your availability or stop mentoring whenever you like.",
      },
      {
        q: "How do I become a top-rated mentor?",
        a: "Being honest, responsive, and helpful goes a long way. Mentors with strong reviews and consistent ratings get highlighted more often.",
      },
    ],
  },
];

export default function HelpPage() {
  const [state, handleSubmit] = useForm("xjkaroan");
  const [active, setActive] = React.useState(0);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [search, setSearch] = React.useState("");
  const accordionRef = useRef<HTMLDivElement | null>(null);

  const selectedItems = faqs[active].items.filter(
    (it) =>
      it.q.toLowerCase().includes(search.toLowerCase()) ||
      it.a.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => setOpenIndex(null), [active]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <main className="flex-1 w-full mt-10">
        {/* HERO — match About-style hero */}
        <section className="relative overflow-hidden">
          <div className="py-20">
            <div className="max-w-5xl mx-auto px-4 text-center">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                Help{" "}
                <span className="bg-gradient-to-r from-primary-900 via-violet-500 to-pink-400 bg-clip-text text-transparent">
                  Center
                </span>
              </h1>

              <p className="mt-4 text-lg md:text-xl text-gray-700">
                We're <strong>revolutionizing mentorship</strong> by connecting
                students with <strong>seniors</strong> who truly understand
                their journey. Real experiences, honest guidance, authentic
                connections.
              </p>
            </div>
          </div>
        </section>

        {/* CATEGORY TABS */}
        <section className="max-w-4xl mx-auto px-4 mb-8 mt-2">
          <div className="flex flex-wrap gap-3 justify-center">
            {faqs.map((f, i) => {
              const activeTab = i === active;
              return (
                <button
                  key={f.title}
                  onClick={() => {
                    setActive(i);
                    setOpenIndex(null);
                  }}
                  className={[
                    "px-5 py-2.5 rounded-full transition shadow-sm ring-1",
                    "focus:outline-none focus:ring-0 focus-visible:outline-none", // ← add this
                    i === active
                      ? "bg-primary-900 text-white ring-primary-900"
                      : "bg-white text-gray-700 hover:text-gray-900 ring-black/10 hover:ring-black/20",
                  ].join(" ")}
                >
                  {f.title}
                </button>
              );
            })}
          </div>
        </section>

        {/* ACCORDION */}
        <section className="max-w-5xl mx-auto px-4 pb-12">
          <div
            ref={accordionRef}
            className="rounded-2xl bg-white shadow-[0_20px_60px_-20px_rgba(120,99,255,.25)] ring-1 ring-black/[0.08] overflow-hidden"
          >
            <div className="px-8 pt-8 pb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                {faqs[active].title}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {selectedItems.length}{" "}
                {selectedItems.length === 1 ? "article" : "articles"}
              </p>
            </div>

            <div className="divide-y divide-gray-200/70">
              {selectedItems.map((item, idx) => {
                const open = openIndex === idx;
                return (
                  <div key={idx} className="group">
                    <button
                      onClick={() => setOpenIndex(open ? null : idx)}
                      className={[
                        "w-full text-left px-8 py-6",
                        "flex items-start justify-between gap-6",
                        "hover:bg-gray-50/80 transition-all duration-200",
                        "focus:outline-none focus-visible:bg-gray-50/80",
                      ].join(" ")}
                      aria-expanded={open}
                    >
                      <span className="font-medium text-gray-900 text-[15px] leading-normal w-[calc(100%-2rem)]">
                        {item.q}
                      </span>
                      <div className={`transform transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      </div>
                    </button>

                    <div
                      className={[
                        "grid",
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        "transition-[grid-template-rows] duration-300 ease-out",
                      ].join(" ")}
                    >
                      <div className="overflow-hidden">
                        <div 
                          className={[
                            "px-8 pb-6",
                            "transition-opacity duration-300",
                            open ? "opacity-100" : "opacity-0",
                          ].join(" ")}
                        >
                          <div className="text-gray-600 leading-relaxed text-[15px] pr-8">
                            {item.a}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section className="max-w-5xl mx-auto py-12 px-4">
          <div className="rounded-2xl bg-white/80 backdrop-blur shadow-[0_30px_80px_-40px_rgba(120,99,255,.3)] ring-1 ring-black/10 p-8">
            <h2 className="text-2xl font-bold">Still need help?</h2>
            <p className="mt-1 text-gray-600">
              Reach us at{" "}
              <a
                href="mailto:support@mentrify.com"
                className="underline text-primary-800"
              >
                support@mentrify.com
              </a>{" "}
              or use the form below — we’ll get back to you within 24 hours.
            </p>

            {state.succeeded ? (
              <div className="mt-8 text-center font-semibold text-primary-900">
                Thank you for contacting us! We'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-800">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    className="mt-2 bg-white/80 ring-1 ring-black/10 focus:ring-2 focus:ring-primary-900"
                  />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-800">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="mt-2 bg-white/80 ring-1 ring-black/10 focus:ring-2 focus:ring-primary-900"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-800">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    required
                    rows={5}
                    className="mt-2 bg-white/80 ring-1 ring-black/10 focus:ring-2 focus:ring-primary-900"
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                </div>
                <button
                  type="submit"
                  className="apple-button w-full mt-2"
                  disabled={state.submitting}
                >
                  {state.submitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
