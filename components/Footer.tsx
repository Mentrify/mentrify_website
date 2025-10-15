import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 pb-20 mt-10">
        {/* ===== CTA block (top, dark gradient) ===== */}
        <section
          className="relative mb-5 overflow-hidden rounded-[28px] border border-black/10 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 35%), linear-gradient(180deg, #1d1d1f 0%, #000 100%)",
          }}
        >
          <div className="px-6 md:px-12 py-16 md:py-20 text-center">
            <h2 className="text-2xl md:text-[28px] font-semibold text-white">
              Ready to make the right choice?
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-300">
              Connect with a mentor today for a short, focused session and get
              the clarity you need to move forward.
            </p>

            <div className="mt-8">
              <Link
                href="/signup"
                className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-medium text-gray-900 shadow-sm hover:shadow transition-shadow"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10" />
        </section>

        {/* ===== Single soft container with watermark + ONE card ===== */}
        <div className="relative rounded-[28px] bg-transparent backdrop-blur-0 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          {/* Only visible card (full width, no extra rim showing) */}
          <div className="relative mx-0 my-0 rounded-3xl bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <div className="px-8 md:px-12 py-12">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                {/* Brand + blurb */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-5">
                    <Image
                      src="/6-removebg-preview.png"
                      alt="Mentrify"
                      width={40}
                      height={40}
                      className="h-10 w-10"
                    />
                    <span className="text-lg font-semibold text-gray-900">
                      Mentrify
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                    Connecting ambitious students with experienced college
                    seniors for authentic guidance and mentorship.
                  </p>

                  {/* Socials */}
                  <div className="flex items-center gap-4 mt-6 text-gray-500">
                    <a
                      aria-label="X"
                      href="https://x.com"
                      className="hover:text-gray-900"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4 4l16 16M20 4L4 20"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </a>
                    <a
                      aria-label="Instagram"
                      href="https://instagram.com"
                      className="hover:text-gray-900"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="5"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="4"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                      </svg>
                    </a>
                    <a
                      aria-label="LinkedIn"
                      href="https://linkedin.com"
                      className="hover:text-gray-900"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9v9M6 6.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM10 18v-6.2c0-2.3 3-2.5 3-0.2V18M13 11.8C13 9.5 16 9.3 16 11.6V18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </a>
                    <a
                      aria-label="GitHub"
                      href="https://github.com"
                      className="hover:text-gray-900"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.2-3.37-1.2-.45-1.13-1.1-1.43-1.1-1.43-.9-.62.07-.61.07-.61 1 .07 1.54 1.04 1.54 1.04.89 1.53 2.33 1.09 2.9.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0112 6.8c.85 0 1.7.12 2.5.34 1.9-1.3 2.74-1.03 2.74-1.03.56 1.38.21 2.4.11 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.33-.01 2.41-.01 2.74 0 .27.18.58.69.48A10 10 0 0012 2z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Columns (links unchanged) */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 tracking-tight mb-4">
                    Students
                  </h4>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <Link
                        href="/mentors"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Find Mentors
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/how-it-works"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        How It Works
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/pricing"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Pricing
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 tracking-tight mb-4">
                    Mentors
                  </h4>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <Link
                        href="/become-mentor"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Become a Mentor
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/mentor-resources"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Resources
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/mentor-community"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Community
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 tracking-tight mb-4">
                    Support
                  </h4>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <Link
                        href="/help"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Help Center
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/privacy"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/terms"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Divider + legal row */}
            <div className="border-t border-gray-200 px-8 md:px-12 py-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <p className="text-xs text-gray-500">
                  © {new Date().getFullYear()} Mentrify. All rights reserved.
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
                  <Link
                    href="/privacy"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Watermark behind the card */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden rounded-[28px] mb-2"
          >
            <span className="select-none pb-6 md:pb-8 text-[120px] md:text-[200px] font-semibold tracking-tight leading-none bg-gradient-to-b from-black/5 to-white/5 bg-clip-text text-transparent">
              Mentrify
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
