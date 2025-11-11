"use client";

import React, { useMemo } from "react";;

const EFFECTIVE_DATE = "October 9, 2025";
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

type Section = { h: string; b: React.ReactNode };

export default function PrivacyPolicyPage() {
  const sections: Section[] = useMemo(
    () => [
      {
        h: "Overview",
        b: (
          <>
            At Mentrify, we respect your privacy and are committed to protecting
            the personal information you share with us. This Privacy Policy
            explains how we collect, make use of, share, and safeguard your
            personal and professional information when you sign up on our
            platform, whether as a mentee (student) or a mentor.
          </>
        ),
      },
      {
        h: "Information We Collect",
        b: (
          <>
            We collect personal information that you provide directly to us and
            data generated through your use of our platform. The type of
            information collected depends on whether you are a mentee or a
            mentor.
            <br />
            <br />
            <strong>a) If You Are a Mentee:</strong> We collect your name,
            contact information, academic background, interests, and career
            goals. We also collect booking details, feedback, chat transcripts,
            and other data shared during sessions. Sharing additional personal
            details is entirely at your discretion.
            <br />
            <br />
            <strong>b) If You Are a Mentor:</strong> We collect your personal
            and professional details such as name, contact information,
            education, expertise, biography, payment details, session logs,
            feedback, and communication history. This helps us verify your
            credentials and facilitate smooth mentorship sessions.
          </>
        ),
      },
      {
        h: "How We Use the Information",
        b: (
          <>
            We use the information to deliver services, improve user experience,
            and maintain a safe and trustworthy environment.
            <br />
            <br />
            <strong>For Mentees:</strong> Your data helps us recommend mentors,
            schedule sessions, send reminders, and request feedback. We may
            analyze anonymized data to improve our services.
            <br />
            <br />
            <strong>For Mentors:</strong> We use your data for verification,
            showcasing your profile, managing sessions and payments, and sharing
            relevant platform updates.
          </>
        ),
      },
      {
        h: "Sharing of Information",
        b: (
          <>
            We do not sell your personal information. However, certain data may
            be shared:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>With mentors or mentees — to enable mentorship sessions.</li>
              <li>
                With service providers — such as payment processors or IT
                vendors.
              </li>
              <li>For legal compliance — if required by law or authorities.</li>
            </ul>
            All third parties comply with strong privacy and security standards.
          </>
        ),
      },
      {
        h: "Your Privacy Controls",
        b: (
          <>
            You can update, correct, or delete your information anytime by
            logging into your account or contacting us. You can also manage your
            email and notification preferences.
          </>
        ),
      },
      {
        h: "Data Security",
        b: (
          <>
            We implement encryption, secure servers, and restricted access to
            protect your data. While we use industry-standard measures, no
            online platform is completely secure. Please use strong passwords
            and enable two-factor authentication.
          </>
        ),
      },
      {
        h: "Data Retention & Deletion",
        b: (
          <>
            We retain data as long as necessary to provide our services and
            comply with legal obligations.
            <br />
            <br />
            <strong>Mentee Data:</strong> Retained while the account is active
            and deleted upon request, unless legally required.
            <br />
            <br />
            <strong>Mentor Data:</strong> Retained during active mentorship and
            for financial or tax compliance if needed.
          </>
        ),
      },
      {
        h: "Compliance and Legal Obligations",
        b: (
          <>
            Mentrify complies with all relevant data protection laws, including
            applicable privacy regulations and, where relevant, the General Data
            Protection Regulation (GDPR). We disclose data to authorities only
            under proper legal process.
          </>
        ),
      },
      {
        h: "Policy Updates",
        b: (
          <>
            We may update this Privacy Policy periodically. Updates will be
            posted on this page with a revised “Last Updated” date. Continued
            use of our services constitutes acceptance of the updated policy.
          </>
        ),
      },
      {
        h: "Contact Us",
        b: (
          <>
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a
              href="mailto:support@mentrify.com"
              className="underline text-primary-900"
            >
              support@mentrify.com
            </a>
            .
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
              Privacy{" "}
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
