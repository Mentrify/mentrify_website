"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Users,
  Heart,
  Zap,
  Network,
  Lightbulb,
  Sparkles,
} from "lucide-react";

export default function CommunityPage() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .liquid-glass {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(30px) saturate(180%);
          -webkit-backdrop-filter: blur(30px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08),
                      inset 0 1px 0 0 rgba(255, 255, 255, 0.6);
        }

        .liquid-glass-strong {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(40px) saturate(200%);
          -webkit-backdrop-filter: blur(40px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1),
                      inset 0 1px 0 0 rgba(255, 255, 255, 0.8),
                      0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .liquid-glass-accent {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.3) 100%);
          backdrop-filter: blur(35px) saturate(190%);
          -webkit-backdrop-filter: blur(35px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.09),
                      inset 0 2px 4px 0 rgba(255, 255, 255, 0.7);
        }

        .bento-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .bento-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 60px 0 rgba(0, 0, 0, 0.15),
                      inset 0 2px 4px 0 rgba(255, 255, 255, 0.9);
        }

        .discord-gradient {
          background: linear-gradient(135deg, #5865F2 0%, #7289DA 100%);
        }

        .discord-gradient-text {
          background: linear-gradient(to right, #5865F2, #7289DA);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .step-badge {
          background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 pt-[150px]">
        {/* Hero Title Section */}
        <section
          ref={(el) => (sectionsRef.current[0] = el)}
          className="text-center mb-16 opacity-0"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass mb-8">
            <Sparkles className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-semibold text-gray-800">Built on Discord, Driven by Students</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 mb-6 leading-[0.95]">
            Our <span className="discord-gradient-text">Community</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We believe mentorship goes beyond scheduled calls — it's about building a <span className="font-semibold text-gray-900">supportive, collaborative, and inspiring community</span> where every student can thrive
          </p>
        </section>

        {/* Main Bento Grid */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="opacity-0"
        >
          {/* Discord CTA + Mission Statement Row */}
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 mb-4">
            {/* Discord CTA Card */}
            <div className="md:col-span-6 lg:col-span-5 bento-card liquid-glass-strong rounded-[2rem] p-8 md:p-10 flex flex-col justify-between">
              <div>
                <MessageCircle className="h-12 w-12 text-[#5865F2] mb-6" strokeWidth={1.5} />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Discord</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Connect with mentors and fellow students in real-time. Get instant guidance, share experiences, and grow together in our vibrant community.
                </p>
              </div>
              <Link href="https://discord.gg/your-link" target="_blank" rel="noopener noreferrer" className="w-full">
                <button className="w-full px-8 py-4 rounded-2xl discord-gradient text-white text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Join Discord Server
                </button>
              </Link>
            </div>

            {/* Mission Statement Card */}
            <div className="md:col-span-6 lg:col-span-7 bento-card liquid-glass-accent rounded-[2rem] p-8 md:p-10">
              <Lightbulb className="h-10 w-10 text-gray-700 mb-6" strokeWidth={1.5} />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We are building a community <span className="font-semibold text-gray-900">by the students, for the students</span> — a space where curiosity thrives, doubts turn into learning, and mentorship turns into friendship.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                At Mentrify, we're not just guiding students, we're growing with them.
              </p>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-4">
            <div className="bento-card liquid-glass-strong rounded-[2rem] p-8 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="liquid-glass rounded-2xl p-6 bento-card">
                  <div className="step-badge w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white font-bold text-lg shadow-lg">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Open a Support Ticket</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    When a student joins our Discord community, they start by opening a support ticket and answering a few quick questions
                  </p>
                </div>

                <div className="liquid-glass rounded-2xl p-6 bento-card">
                  <div className="step-badge w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white font-bold text-lg shadow-lg">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Get Verified</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    This helps us understand their background, interests, and learning goals. Once verified, they gain full access to the server
                  </p>
                </div>

                <div className="liquid-glass rounded-2xl p-6 bento-card">
                  <div className="step-badge w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white font-bold text-lg shadow-lg">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Unlock Full Access</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Access channels for discussions, mentorship, and networking with verified mentors and fellow students
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Feature 1 */}
            <div className="bento-card liquid-glass-strong rounded-[2rem] p-8">
              <div className="flex items-start gap-4">
                <Zap className="h-10 w-10 text-gray-700 shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Easy Mentorship Access</h3>
                  <p className="text-gray-700 leading-relaxed">
                    For smaller doubts or quick guidance, students can directly ping their mentors on Discord chat without needing to schedule a call. This makes learning instant, personal, and engaging.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bento-card liquid-glass-accent rounded-[2rem] p-8">
              <div className="flex items-start gap-4">
                <Heart className="h-10 w-10 text-gray-700 shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">More Than a Platform</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Mentrify isn't about business, it's about building meaningful relationships and creating impact through peer and mentor support.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bento-card liquid-glass-accent rounded-[2rem] p-8">
              <div className="flex items-start gap-4">
                <Users className="h-10 w-10 text-gray-700 shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Student-to-Student Connections</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our community fosters collaboration among learners, helping them share experiences, grow together, and build lasting friendships.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bento-card liquid-glass-strong rounded-[2rem] p-8">
              <div className="flex items-start gap-4">
                <Network className="h-10 w-10 text-gray-700 shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Mentor Networking</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Mentors can connect among themselves, forming a network of passionate guides dedicated to student success and mutual growth.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="grid grid-cols-1">
            <div className="bento-card liquid-glass-strong rounded-[2rem] p-12 md:p-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Community Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">500+</div>
                  <p className="text-lg text-gray-600">Active Community Members</p>
                </div>
                <div>
                  <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">100+</div>
                  <p className="text-lg text-gray-600">Verified Mentors</p>
                </div>
                <div>
                  <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">24/7</div>
                  <p className="text-lg text-gray-600">Support Available</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}