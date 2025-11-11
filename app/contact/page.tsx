"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [state, handleSubmit] = useForm("xjkaroan");
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(e);
    if (state.succeeded) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white py-20 md:py-32 px-6">
        <div className="max-w-5xl mx-auto text-center mt-10">
          <h1 className="text-5xl md:text-6xl text-black font-extrabold tracking-tight">
            Get in{" "}
            <span className="bg-gradient-to-r from-primary-900 via-violet-500 to-pink-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-2">
            Have questions about Mentrify? We'd love to hear from you. Reach out
            to our team and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                Contact Information
              </h2>
              <div className="space-y-6">
                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600 mt-1">
                      <a
                        href="mailto:support@mentrify.com"
                        className="hover:text-blue-600 transition"
                      >
                        support@mentrify.com
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      We'll get back to you within 24 hours
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Support</h3>
                    <p className="text-gray-600 mt-1">
                      Available Monday to Friday, 9 AM - 6 PM IST
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Headquarters
                    </h3>
                    <p className="text-gray-600 mt-1">India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/help" className="hover:text-blue-600 transition">
                    → FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="hover:text-blue-600 transition"
                  >
                    → How It Works
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send us a Message
            </h2>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Thank you for reaching out!
                </h3>
                <p className="text-green-700">
                  We've received your message and will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className="bg-white border-gray-300 rounded-lg"
                  />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    className="bg-white border-gray-300 rounded-lg"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label
                    htmlFor="subject"
                    className="text-gray-700 font-medium"
                  >
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="What is this about?"
                    required
                    className="bg-white border-gray-300 rounded-lg"
                  />
                  <ValidationError
                    prefix="Subject"
                    field="subject"
                    errors={state.errors}
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-gray-700 font-medium"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    required
                    className="bg-white border-gray-300 rounded-lg"
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="apple-button text-base md:text-lg px-12 py-5 flex items-center justify-center group w-full max-w-md relative overflow-hidden"
                >
                  {state.submitting ? "Sending..." : "Send Message"}
                </button>

                {state.succeeded && (
                  <p className="text-center text-green-600 text-sm">
                    Message sent successfully!
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
