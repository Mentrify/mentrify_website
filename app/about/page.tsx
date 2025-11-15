"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Eye, Target, Users, Heart, Unlock, Globe, Sparkles, GraduationCap, BookOpen, Lightbulb } from "lucide-react";

export default function AboutPage() {
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

        .apple-gradient-text {
          background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
            <span className="text-sm font-semibold text-gray-800">Built by students, for students</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 mb-6 leading-[0.95]">
            About <span className="bg-gradient-to-r from-primary-900 via-violet-500 to-pink-400 bg-clip-text text-transparent">Mentrify</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We're <span className="font-semibold text-gray-900">revolutionizing mentorship</span> by connecting students with <span className="font-semibold text-gray-900">seniors</span> who truly understand their journey
          </p>
        </section>

        {/* Main Bento Grid */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="opacity-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 mb-4">
            {/* Vision Card - Large */}
            <div className="md:col-span-6 lg:col-span-7 bento-card liquid-glass-strong rounded-[2rem] p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <Eye className="h-10 w-10 text-gray-700 shrink-0" strokeWidth={1.5} />
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Vision</h2>
                  <p className="text-gray-600 font-medium">Making mentorship universal</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                At Mentrify, our vision is to make mentorship a part of every student's journey. We aim to empower young learners with the right guidance, helping them make informed choices, build confidence, and unlock opportunities for a brighter future.
              </p>
            </div>

            {/* Mission Card */}
            <div className="md:col-span-6 lg:col-span-5 bento-card liquid-glass-accent rounded-[2rem] p-8 md:p-10">
              <Target className="h-10 w-10 text-gray-700 mb-6" strokeWidth={1.5} />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is to connect students with mentors who understand their challenges and aspirations. By creating a platform where knowledge, experiences, and guidance are shared, we bridge the gap between academics and real-world decisions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 mb-4">
            {/* Team Story Card */}
            <div className="md:col-span-6 lg:col-span-5 bento-card liquid-glass-strong rounded-[2rem] p-8 md:p-10">
              <Users className="h-10 w-10 text-gray-700 mb-6" strokeWidth={1.5} />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">About Our Team</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Mentrify is built by a passionate team of <span className="font-semibold text-gray-900">graduating students</span> who know firsthand the challenges that come with academic transitions and career choices.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Having recently gone through the same journey, we understand the struggles, doubts, and aspirations of 12th-grade students.
              </p>
            </div>

            {/* What We Do Grid */}
            <div className="md:col-span-6 lg:col-span-7 bento-card liquid-glass-accent rounded-[2rem] p-8 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">What We Do</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="liquid-glass rounded-2xl p-6 text-center bento-card">
                  <GraduationCap className="h-10 w-10 text-gray-700 mx-auto mb-4" strokeWidth={1.5} />
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">Direct Mentorship</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">Access to relatable, real-world insights from students who have recently navigated the same stage</p>
                </div>
                <div className="liquid-glass rounded-2xl p-6 text-center bento-card">
                  <BookOpen className="h-10 w-10 text-gray-700 mx-auto mb-4" strokeWidth={1.5} />
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">Resource Sharing</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">Comprehensive resources and guidance materials to support your academic and career decisions</p>
                </div>
                <div className="liquid-glass rounded-2xl p-6 text-center bento-card">
                  <Heart className="h-10 w-10 text-gray-700 mx-auto mb-4" strokeWidth={1.5} />
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">Community Support</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">Join a network of learners and mentors who grow, share, and succeed together</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values Card */}
          <div className="grid grid-cols-1 mb-4">
            <div className="bento-card liquid-glass-accent rounded-[2rem] p-8 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[
                  {
                    icon: Globe,
                    title: "Accessibility",
                    desc: "Making mentorship easy to access for every student, regardless of background",
                  },
                  {
                    icon: Heart,
                    title: "Relatability",
                    desc: "Ensuring guidance comes from mentors who truly understand the student experience",
                  },
                  {
                    icon: Target,
                    title: "Impact",
                    desc: "Focusing on creating meaningful change in students' academic and career journeys",
                  },
                  {
                    icon: Users,
                    title: "Community",
                    desc: "Building a network of learners and mentors who grow together",
                  },
                  {
                    icon: Unlock,
                    title: "Empowerment",
                    desc: "Giving students the tools, clarity, and confidence to make informed choices",
                  },
                ].map((value, i) => (
                  <div
                    key={i}
                    className="liquid-glass rounded-2xl p-6 text-center bento-card"
                  >
                    <value.icon className="h-10 w-10 text-gray-700 mx-auto mb-4" strokeWidth={1.5} />
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Card */}
          {/* <div className="grid grid-cols-1">
            <div className="bento-card liquid-glass-strong rounded-[2rem] p-12 md:p-16 text-center">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 leading-[0.95]">
                Join the Future of <br /><span className="apple-gradient-text">Mentorship</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Thousands of students are already discovering clarity with Mentrify. Whether you want to learn or guide, there's a place for you here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/mentors">
                  <button className="px-10 py-5 rounded-2xl bg-gray-900 text-white text-lg font-semibold shadow-2xl hover:bg-gray-800 transform hover:scale-105 transition-all duration-300">
                    Find a Mentor
                  </button>
                </Link>
                <Link href="/become-mentor">
                  <button className="px-10 py-5 rounded-2xl liquid-glass-accent text-gray-900 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-gray-300">
                    Become a Mentor
                  </button>
                </Link>
              </div>
            </div>
          </div> */}
        </section>
      </div>
    </div>
  );
}