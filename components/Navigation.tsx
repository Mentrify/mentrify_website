"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div
        className={`w-full max-w-6xl transition-all duration-700 ease-out rounded-full ${
          isScrolled
            ? "backdrop-blur-3xl bg-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] border border-white/40"
            : "backdrop-blur-2xl bg-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/50"
        }`}
        style={{
          backdropFilter: "blur(24px) saturate(200%)",
          WebkitBackdropFilter: "blur(24px) saturate(200%)",
        }}
      >
        <div className="px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src="/6-removebg-preview.png"
                alt="Mentrify"
                width={40}
                height={40}
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                Mentrify
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { href: "/find-mentors", label: "Find Mentors" },
                { href: "/become-mentor", label: "Become a Mentor" },
                { href: "/about", label: "About" },
                { href: "/pricing", label: "Pricing" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 group ${
                    isActive(item.href)
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                      : "text-gray-900 hover:text-blue-600"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 ${
                      isActive(item.href)
                        ? "w-full bg-gradient-to-r from-blue-600 to-purple-600"
                        : "w-0 group-hover:w-full bg-gradient-to-r from-blue-600 to-purple-600"
                    }`}
                  />
                </Link>
              ))}

              {/* Sign In button - commented out
              <span className="mx-2 text-gray-300">|</span>

              <Link
                href="/signin"
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 group ${
                  isActive("/signin")
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                    : "text-gray-900 hover:text-blue-600"
                }`}
              >
                <span>Sign In</span>
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 ${
                    isActive("/signin")
                      ? "w-full bg-gradient-to-r from-blue-600 to-purple-600"
                      : "w-0 group-hover:w-full bg-gradient-to-r from-blue-600 to-purple-600"
                  }`}
                />
              </Link>
              */}

              <Link  href="https://app.mentrify.com/signin">
                <button className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium hover:opacity-90 transition-all duration-300 shadow-sm">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/50 transition-all duration-300 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-5 w-5 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="absolute top-20 left-4 right-4 backdrop-blur-3xl bg-white/70 border border-white/40 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] md:hidden overflow-hidden"
          style={{
            backdropFilter: "blur(24px) saturate(200%)",
            WebkitBackdropFilter: "blur(24px) saturate(200%)",
          }}
        >
          <div className="px-6 py-6 space-y-2">
            {[
              { href: "/find-mentors", label: "Find Mentors" },
              { href: "/become-mentor", label: "Become a Mentor" },
              { href: "/about", label: "About" },
              { href: "/pricing", label: "Pricing" },
              // { href: "/signin", label: "Sign In" }, // Sign In - commented out
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative block px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                    : "text-gray-900 hover:bg-white/50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="https://app.mentrify.com/signin" onClick={() => setIsOpen(false)}>
              <button className="w-full px-4 py-3 rounded-2xl bg-black text-white font-medium hover:opacity-90 transition-all duration-300 shadow-sm">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
