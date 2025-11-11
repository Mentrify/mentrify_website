"use client";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy - Mentrify",
  description:
    "Read Mentrify's refund policy. Understand our terms for cancellations, refunds, and session credits.",
  openGraph: {
    title: "Refund Policy - Mentrify",
    description:
      "Read Mentrify's refund policy. Understand our terms for cancellations, refunds, and session credits.",
    url: "https://mentrify.com/refund-policy",
    type: "website",
  },
  twitter: {
    title: "Refund Policy - Mentrify",
    description:
      "Read Mentrify's refund policy. Understand our terms for cancellations, refunds, and session credits.",
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Refund Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: November 2024
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
          <div className="space-y-8 text-gray-700">
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Overview
              </h2>
              <p>
                At Mentrify, we want you to have complete confidence in your
                mentorship experience. This Refund Policy outlines the terms
                under which refunds are provided for services purchased through
                our platform.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Eligibility for Refunds
              </h2>
              <p>Refunds are available under the following circumstances:</p>
              <ul className="list-disc pl-6 mt-4 space-y-3">
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
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Non-Refundable Scenarios
              </h2>
              <p>
                Refunds will NOT be issued in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-3">
                <li>
                  <strong>Session Completed:</strong> Sessions that have been
                  completed (even partially) are non-refundable.
                </li>
                <li>
                  <strong>Late Cancellation:</strong> Cancellations made less
                  than 24 hours before the session start time are non-refundable.
                </li>
                <li>
                  <strong>Student No-Show:</strong> If you fail to join a
                  session without cancelling in advance, the session will be
                  marked as completed and is non-refundable.
                </li>
                <li>
                  <strong>Mentor Mismatch:</strong> Dissatisfaction with the
                  mentor's advice or communication style is not grounds for
                  refund. We recommend booking a session with a different mentor
                  instead.
                </li>
                <li>
                  <strong>User Fault Issues:</strong> Technical problems caused
                  by your device, internet connection, or software are
                  non-refundable.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Refund Process
              </h2>
              <p>
                To request a refund, follow these steps:
              </p>
              <ol className="list-decimal pl-6 mt-4 space-y-3">
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
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Refund Timeline
              </h2>
              <p>
                Once your refund request is approved, the funds will be returned
                to your original payment method within:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-3">
                <li>
                  <strong>Credit/Debit Card:</strong> 5-7 business days
                </li>
                <li>
                  <strong>Digital Wallets (Razorpay, etc.):</strong> 3-5
                  business days
                </li>
                <li>
                  <strong>Bank Transfers:</strong> 5-10 business days (varies by
                  bank)
                </li>
              </ul>
              <p className="mt-4">
                Note: Processing times depend on your financial institution and
                may vary.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Credits vs. Refunds
              </h2>
              <p>
                If you cancel a session more than 24 hours in advance, you have
                two options:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-3">
                <li>
                  <strong>Mentrify Credit:</strong> Instant credit in your
                  account to book another session (no processing fee).
                </li>
                <li>
                  <strong>Cash Refund:</strong> Refund to your original payment
                  method (may include a 5% processing fee and take 5-10 business
                  days).
                </li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Special Circumstances
              </h2>
              <p>
                In rare situations, we may approve refunds outside the standard
                policy:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-3">
                <li>
                  <strong>Mentor Unavailability:</strong> If a mentor becomes
                  unavailable and we cannot reschedule at a suitable time, you
                  may be eligible for a refund.
                </li>
                <li>
                  <strong>Repeated Technical Issues:</strong> If you experience
                  multiple technical failures, we may offer a refund or credit
                  at our discretion.
                </li>
                <li>
                  <strong>Service Interruptions:</strong> In case of extended
                  platform outages affecting your session, we will provide
                  appropriate compensation.
                </li>
              </ul>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Dispute Resolution
              </h2>
              <p>
                If you disagree with our refund decision, you may:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-3">
                <li>
                  <strong>Appeal:</strong> Submit an appeal with additional
                  details to support@mentrify.com within 7 days of our decision.
                </li>
                <li>
                  <strong>Escalation:</strong> Our management team will review
                  your case within 10 business days.
                </li>
                <li>
                  <strong>Chargebacks:</strong> We ask that you exhaust all
                  support channels before filing a chargeback with your bank.
                  Chargebacks may result in account suspension.
                </li>
              </ul>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Contact Us
              </h2>
              <p>
                For refund inquiries or to request a refund, please contact our
                support team:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@mentrify.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@mentrify.com
                  </a>
                </p>
                <p className="mt-2">
                  <strong>Support Hours:</strong> Monday to Friday, 9 AM - 6 PM
                  IST
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Policy Changes
              </h2>
              <p>
                Mentrify reserves the right to modify this Refund Policy at any
                time. Changes will be effective immediately upon posting to the
                website. Your continued use of the platform constitutes
                acceptance of the updated policy.
              </p>
            </div>

            {/* Closing Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-12">
              <p className="text-gray-900">
                We're committed to providing a transparent and fair refund
                process. If you have any questions about this policy, please
                don't hesitate to reach out to our support team at{" "}
                <a
                  href="mailto:support@mentrify.com"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  support@mentrify.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
