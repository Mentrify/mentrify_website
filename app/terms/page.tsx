"use client";

import React, { useMemo } from "react";
import Link from "next/link";

const EFFECTIVE_DATE = "October 9, 2025";
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

type Section = { h: string; sub?: string; b: React.ReactNode };

export default function TermsOfServicePage() {
  const sections: Section[] = useMemo(
    () => [
      {
        h: "Overview",
        b: (
          <>
            Mentrify is a mentorship platform connecting students with verified
            college mentors for 1-on-1 guidance. By creating an account, booking
            a session, or accessing our platform, you confirm that you have read
            and accepted these Terms of Service as well as our{" "}
            <Link href="/privacy" className="underline text-primary-900">
              Privacy Policy
            </Link>
            .
          </>
        ),
      },
      {
        h: "Services",
        b: (
          <>
            We offer mentorship sessions, webinars, resources, and community
            access. Advice is based on mentor experiences and{" "}
            <strong>does not guarantee specific outcomes</strong>.
          </>
        ),
      },
      {
        h: "User Responsibilities",
        b: (
          <>
            Be respectful, punctual, and honest. Mentors should offer truthful,
            experience-based guidance and maintain confidentiality. Misuse may
            lead to suspension.
          </>
        ),
      },
      {
        h: "Payments & Refunds",
        b: (
          <>
            Sessions are prepaid. Payments are <strong>non-refundable</strong>{" "}
            unless a mentor misses the session or Mentrify cancels (subject to
            review). Rescheduling is allowed if requested at least{" "}
            <strong>24 hours</strong> prior.
          </>
        ),
      },
      {
        h: "No-Show & Rescheduling",
        b: (
          <>
            Student no-shows without notice aren’t eligible for refund or
            reschedule. Mentor no-shows may lead to suspension or removal.
          </>
        ),
      },
      {
        h: "Intellectual Property",
        b: (
          <>
            All content and platform design belong to Mentrify. Do not reproduce
            or use for commercial purposes without permission.
          </>
        ),
      },
      {
        h: "Prohibited Use",
        b: (
          <>
            No harassment, call recording without consent, misuse, or
            unauthorized access. Violations may result in termination and legal
            action.
          </>
        ),
      },
      {
        h: "Third-Party Services",
        b: (
          <>
            We use third-party services (payments, communications, analytics)
            which are governed by their own policies.
          </>
        ),
      },
      {
        h: "Termination",
        b: (
          <>
            We may suspend or terminate accounts that violate these terms. Upon
            termination, all rights to use the platform end.
          </>
        ),
      },
      {
        h: "Dispute Resolution",
        b: (
          <>
            Governed by the laws of <strong>India</strong>, with exclusive
            jurisdiction of courts in <em>(City, State)</em>.
          </>
        ),
      },
      {
        h: "Updates",
        b: (
          <>
            We may update these Terms. Continued use after changes indicates
            acceptance.
          </>
        ),
      },
      {
        h: "Contact Us",
        b: (
          <>
            Email{" "}
            <a
              href="mailto:support@mentrify.com"
              className="underline text-primary-900"
            >
              support@mentrify.com
            </a>
            , or visit our{" "}
            <Link href="/help" className="underline text-primary-900">
              Help Center
            </Link>
            .
          </>
        ),
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-white text-grey-900 selection:bg-primary-900/20 selection:text-primary-900">
      {/* Soft hero gradient */}
      <section className="relative mt-[100px]">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,theme(colors.primaryPalette.100/_0.55),transparent_60%),linear-gradient(to_bottom,white,theme(colors.secondaryPalette.100/_0.25))]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 ">
          {/* HEADER OUTSIDE THE CARD */}
          <div className="text-center mb-6">
            <h1 className="text-5xl md:text-6xl text-black font-extrabold tracking-tight">
              Terms of{" "}
              <span className="bg-gradient-to-r from-primary-900 via-violet-500 to-pink-400 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="mt-2 text-sm text-grey-600">
              Effective Date: {EFFECTIVE_DATE}
            </p>
          </div>

          {/* Document card (content only) */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-x-6 -inset-y-6 rounded-[28px] bg-white/60 blur-2xl" />
            <div className="pointer-events-none absolute -left-6 top-6 h-[88%] w-[calc(100%+3rem)] rounded-[28px] bg-black/[0.03] blur-xl" />
            <div className="pointer-events-none absolute -right-6 top-10 h-[85%] w-[calc(100%+3rem)] rounded-[28px] bg-black/[0.05] blur-xl" />

            <article className="relative rounded-[24px] bg-white ring-1 ring-black/10 shadow-[0_30px_120px_-40px_rgba(120,99,255,.35)]">
              <div className="px-8 py-8">
                <div className="mx-auto max-w-6xl">
                  {sections.map((s, i) => (
                    <section key={i} id={slug(s.h)} className="mb-6 last:mb-0">
                      <h2 className="text-lg font-bold text-black">
                        {s.h}
                        {s.sub && (
                          <span className="ml-2 align-middle text-xs uppercase tracking-wider text-grey-500">
                            {s.sub}
                          </span>
                        )}
                      </h2>
                      <p className="mt-2 text-grey-700 leading-relaxed text-justify">
                        {s.b}
                      </p>
                    </section>
                  ))}
                  <p className="mt-8 text-center text-xs text-grey-600">
                    Last updated on {EFFECTIVE_DATE}.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
