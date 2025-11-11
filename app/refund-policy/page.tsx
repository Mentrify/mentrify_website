"use client";

import React, { useMemo } from "react";

const EFFECTIVE_DATE = "November 2024";
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

type Section = { h: string; b: React.ReactNode };

export default function RefundPolicyPage() {
  const sections: Section[] = useMemo(
    () => [
      {
        h: "Overview",
        b: (
          <>
            At Mentrify, we want you to have complete confidence in your
            mentorship experience. This Refund Policy outlines the terms under
            which refunds are provided for services purchased through our
            platform.
          </>
        ),
      },
      {
        h: "Eligibility for Refunds",
        b: (
          <>
            Refunds are available under the following circumstances:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Cancelled Before Session:</strong> If you cancel a
                booked session at least 24 hours before the scheduled start
                time, you are eligible for a full refund.
              </li>
              <li>
                <strong>Session Not Conducted:</strong> If a mentor fails to
                attend a scheduled session without prior notice, you are
                entitled to a full refund or credit toward future sessions.
              </li>
              <li>
                <strong>Technical Issues:</strong> If the session cannot be
                completed due to technical problems on our platform (not your
                internet connection), we will offer a full refund or
                rescheduling option.
              </li>
              <li>
                <strong>Unused Credits:</strong> If you purchase a package and
                do not use all credits within 6 months, you may request a
                refund for unused credits, minus a 10% processing fee.
              </li>
              <li>
                <strong>Duplicate Charges:</strong> In case of accidental
                duplicate billing, we will issue a full refund for the
                duplicate charge within 5 business days.
              </li>
            </ul>
          </>
        ),
      },
      {
        h: "Non-Refundable Scenarios",
        b: (
          <>
            Refunds will NOT be issued in the following circumstances:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Session Completed:</strong> Sessions that have been
                completed (even partially) are non-refundable.
              </li>
              <li>
                <strong>Late Cancellation:</strong> Cancellations made less than
                24 hours before the session start time are non-refundable.
              </li>
              <li>
                <strong>Student No-Show:</strong> If you fail to join a session
                without cancelling in advance, the session will be marked as
                completed and is non-refundable.
              </li>
              <li>
                <strong>Mentor Mismatch:</strong> Dissatisfaction with the
                mentor's advice or communication style is not grounds for
                refund. We recommend booking a session with a different mentor
                instead.
              </li>
              <li>
                <strong>User Fault Issues:</strong> Technical problems caused by
                your device, internet connection, or software are
                non-refundable.
              </li>
            </ul>
          </>
        ),
      },
      {
        h: "Refund Process",
        b: (
          <>
            To request a refund, follow these steps:
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li>
                Log in to your Mentrify account and navigate to your booking
                history.
              </li>
              <li>
                Select the session for which you want a refund and click
                "Request Refund."
              </li>
              <li>
                Provide a reason for your refund request from the available
                options.
              </li>
              <li>
                Submit any supporting documentation if required (e.g.,
                screenshots of technical issues).
              </li>
              <li>
                Our support team will review your request within 3-5 business
                days.
              </li>
            </ol>
          </>
        ),
      },
      {
        h: "Refund Timeline",
        b: (
          <>
            Once your refund request is approved, the funds will be returned to
            your original payment method within:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Credit/Debit Card:</strong> 5-7 business days
              </li>
              <li>
                <strong>Digital Wallets (Razorpay, etc.):</strong> 3-5 business
                days
              </li>
              <li>
                <strong>Bank Transfers:</strong> 5-10 business days (varies by
                bank)
              </li>
            </ul>
            <br />
            Note: Processing times depend on your financial institution and may
            vary.
          </>
        ),
      },
      {
        h: "Credits vs. Refunds",
        b: (
          <>
            If you cancel a session more than 24 hours in advance, you have two
            options:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Mentrify Credit:</strong> Instant credit in your account
                to book another session (no processing fee).
              </li>
              <li>
                <strong>Cash Refund:</strong> Refund to your original payment
                method (may include a 5% processing fee and take 5-10 business
                days).
              </li>
            </ul>
          </>
        ),
      },
      {
        h: "Special Circumstances",
        b: (
          <>
            In rare situations, we may approve refunds outside the standard
            policy:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Mentor Unavailability:</strong> If a mentor becomes
                unavailable and we cannot reschedule at a suitable time, you may
                be eligible for a refund.
              </li>
              <li>
                <strong>Repeated Technical Issues:</strong> If you experience
                multiple technical failures, we may offer a refund or credit at
                our discretion.
              </li>
              <li>
                <strong>Service Interruptions:</strong> In case of extended
                platform outages affecting your session, we will provide
                appropriate compensation.
              </li>
            </ul>
          </>
        ),
      },
      {
        h: "Dispute Resolution",
        b: (
          <>
            If you disagree with our refund decision, you may:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Appeal:</strong> Submit an appeal with additional details
                to{" "}
                <a
                  href="mailto:support@mentrify.com"
                  className="underline text-primary-900"
                >
                  support@mentrify.com
                </a>{" "}
                within 7 days of our decision.
              </li>
              <li>
                <strong>Escalation:</strong> Our management team will review your
                case within 10 business days.
              </li>
              <li>
                <strong>Chargebacks:</strong> We ask that you exhaust all support
                channels before filing a chargeback with your bank. Chargebacks
                may result in account suspension.
              </li>
            </ul>
          </>
        ),
      },
      {
        h: "Contact Us",
        b: (
          <>
            For refund inquiries or to request a refund, please contact our
            support team at{" "}
            <a
              href="mailto:support@mentrify.com"
              className="underline text-primary-900"
            >
              support@mentrify.com
            </a>{" "}
            during support hours (Monday to Friday, 9 AM - 6 PM IST).
          </>
        ),
      },
      {
        h: "Policy Changes",
        b: (
          <>
            Mentrify reserves the right to modify this Refund Policy at any
            time. Changes will be effective immediately upon posting to the
            website. Your continued use of the platform constitutes acceptance
            of the updated policy.
          </>
        ),
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-white text-grey-900 selection:bg-primary-900/20 selection:text-primary-900">
      <section className="relative mt-[125px]">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,theme(colors.primaryPalette.100/_0.55),transparent_60%),linear-gradient(to_bottom,white,theme(colors.secondaryPalette.100/_0.25))]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-6">
            <h1 className="text-5xl md:text-6xl text-black font-extrabold tracking-tight">
              Refund{" "}
              <span className="bg-gradient-to-r from-primary-900 via-violet-500 to-pink-400 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="mt-2 text-sm text-grey-600">
              Effective Date: {EFFECTIVE_DATE}
            </p>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-x-6 -inset-y-6 rounded-[28px] bg-white/60 blur-2xl" />
            <div className="pointer-events-none absolute -left-6 top-6 h-[88%] w-[calc(100%+3rem)] rounded-[28px] bg-black/[0.03] blur-xl" />
            <div className="pointer-events-none absolute -right-6 top-10 h-[85%] w-[calc(100%+3rem)] rounded-[28px] bg-black/[0.05] blur-xl" />

            <article className="relative rounded-[24px] bg-white ring-1 ring-black/10 shadow-[0_30px_120px_-40px_rgba(120,99,255,.35)]">
              <div className="px-8 py-8">
                <div className="mx-auto max-w-6xl">
                  {sections.map((s, i) => (
                    <section key={i} id={slug(s.h)} className="mb-6 last:mb-0">
                      <h2 className="text-lg font-bold text-black">{s.h}</h2>
                      {/* IMPORTANT: use div, not p, to allow lists/blocks inside */}
                      <div className="mt-2 text-grey-700 leading-relaxed text-justify">
                        {s.b}
                      </div>
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
