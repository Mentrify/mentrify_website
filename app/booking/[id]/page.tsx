"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  BadgeCheck,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Users,
} from "lucide-react";
import Navigation from "../../../components/Navigation";

// Same mentor data - in production this would come from an API/database
const mentors = [
  {
    id: 1,
    name: "Vyom Padalia",
    college: "IIT Delhi",
    course: "Computer Science & Engineering",
    year: "3rd Year",
    rating: 4.9,
    sessions: 45,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["Engineering", "Coding", "Campus Life", "Placements"],
    location: "Delhi",
    price: 100,
    verified: true,
    bio: "Passionate about helping students navigate their engineering journey. I specialize in coding interviews, campus placements, and making the most of college life at IIT.",
  },
  {
    id: 2,
    name: "Sneha Patel",
    college: "AIIMS Delhi",
    course: "MBBS",
    year: "4th Year",
    rating: 4.8,
    sessions: 32,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["Medical", "NEET", "Study Tips", "Research"],
    location: "Delhi",
    price: 100,
    verified: true,
    bio: "Medical student at AIIMS with a passion for teaching. I help aspiring doctors prepare for NEET and guide them through the medical school journey.",
  },
  {
    id: 3,
    name: "Rohit Sharma",
    college: "SRCC Delhi",
    course: "Economics (Hons)",
    year: "2nd Year",
    rating: 4.7,
    sessions: 28,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["Commerce", "Economics", "DU Life", "Finance"],
    location: "Delhi",
    price: 100,
    verified: true,
    bio: "Economics enthusiast at SRCC. I guide students on cracking DU admissions, understanding economics, and exploring career paths in finance.",
  },
  {
    id: 4,
    name: "Priya Singh",
    college: "NIT Trichy",
    course: "Mechanical Engineering",
    year: "3rd Year",
    rating: 4.9,
    sessions: 38,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["Engineering", "NIT Life", "Placements", "Research"],
    location: "Tamil Nadu",
    price: 100,
    verified: true,
    bio: "Mechanical engineering student passionate about research and innovation. I help students with NIT preparations and campus life guidance.",
  },
  {
    id: 5,
    name: "Karan Mehta",
    college: "IIM Ahmedabad",
    course: "MBA",
    year: "1st Year",
    rating: 4.6,
    sessions: 22,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["MBA", "CAT Prep", "Business", "Consulting"],
    location: "Gujarat",
    price: 100,
    verified: true,
    bio: "First-year MBA student at IIM-A. I specialize in CAT preparation strategies and help aspirants understand the B-school journey.",
  },
  {
    id: 6,
    name: "Ananya Reddy",
    college: "BITS Pilani",
    course: "Electronics & Communication",
    year: "4th Year",
    rating: 4.8,
    sessions: 41,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["Engineering", "BITS Life", "Research", "Internships"],
    location: "Rajasthan",
    price: 100,
    verified: true,
    bio: "ECE student at BITS with internship experience at top tech companies. I guide students on securing internships and research opportunities.",
  },
  {
    id: 7,
    name: "Mehul Jain",
    college: "IIT Bombay",
    course: "Electrical Engineering",
    year: "2nd Year",
    rating: 4.7,
    sessions: 30,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["Engineering", "Projects", "Startups", "Internships"],
    location: "Mumbai",
    price: 120,
    verified: true,
    bio: "Electrical engineering student with a startup mindset. I help students with technical projects and entrepreneurship guidance.",
  },
  {
    id: 8,
    name: "Neha Verma",
    college: "Lady Hardinge Medical College",
    course: "MBBS",
    year: "3rd Year",
    rating: 4.8,
    sessions: 36,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["Medical", "NEET", "Clinical Skills", "Campus Life"],
    location: "Delhi",
    price: 110,
    verified: true,
    bio: "Medical student focused on clinical excellence. I provide guidance on NEET preparation and help students develop essential clinical skills.",
  },
  {
    id: 9,
    name: "Arjun Nair",
    college: "IISc Bangalore",
    course: "Physics (Research)",
    year: "PhD Scholar",
    rating: 4.9,
    sessions: 50,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["Research", "Physics", "Academics", "Higher Studies Abroad"],
    location: "Bangalore",
    price: 150,
    verified: true,
    bio: "PhD scholar at IISc specializing in theoretical physics. I mentor students aspiring for research careers and higher studies abroad.",
  },
  {
    id: 10,
    name: "Simran Kaur",
    college: "Delhi University",
    course: "Psychology (Hons)",
    year: "3rd Year",
    rating: 4.6,
    sessions: 20,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["Psychology", "Mental Health", "Study Tips", "DU Life"],
    location: "Delhi",
    price: 90,
    verified: true,
    bio: "Psychology student passionate about mental health awareness. I help students with study strategies and navigating college life.",
  },
  {
    id: 11,
    name: "Ravi Kumar",
    college: "NIT Warangal",
    course: "Civil Engineering",
    year: "4th Year",
    rating: 4.8,
    sessions: 44,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["Engineering", "Placements", "Research", "GATE Prep"],
    location: "Telangana",
    price: 100,
    verified: true,
    bio: "Civil engineering student with expertise in GATE preparation. I guide students through NIT life and placement preparations.",
  },
  {
    id: 12,
    name: "Shivani Gupta",
    college: "Jamia Millia Islamia",
    course: "Law (LLB)",
    year: "2nd Year",
    rating: 4.7,
    sessions: 18,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["Law", "Judiciary Prep", "Research", "Internships"],
    location: "Delhi",
    price: 95,
    verified: true,
    bio: "Law student aspiring for judiciary. I help students with law entrance preparations and understanding the legal profession.",
  },
  {
    id: 13,
    name: "Harsh Desai",
    college: "IIT Madras",
    course: "Aerospace Engineering",
    year: "3rd Year",
    rating: 4.9,
    sessions: 40,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["Engineering", "Placements", "Projects", "Higher Studies"],
    location: "Chennai",
    price: 130,
    verified: true,
    bio: "Aerospace engineering student with a passion for space technology. I mentor students on technical projects and higher study applications.",
  },
  {
    id: 14,
    name: "Pooja Sharma",
    college: "IIT Roorkee",
    course: "Architecture",
    year: "2nd Year",
    rating: 4.5,
    sessions: 16,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["Architecture", "Design", "Campus Life", "Creative Careers"],
    location: "Roorkee",
    price: 85,
    verified: true,
    bio: "Architecture student with a creative approach to design. I help aspiring architects with portfolio development and college guidance.",
  },
  {
    id: 15,
    name: "Farhan Ali",
    college: "AMU Aligarh",
    course: "Mechanical Engineering",
    year: "4th Year",
    rating: 4.7,
    sessions: 34,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["Engineering", "Internships", "Placements", "Projects"],
    location: "Uttar Pradesh",
    price: 100,
    verified: true,
    bio: "Mechanical engineering student focused on practical applications. I guide students on internships and project development.",
  },
  {
    id: 16,
    name: "Ishita Roy",
    college: "Jadavpur University",
    course: "English Literature",
    year: "3rd Year",
    rating: 4.8,
    sessions: 25,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["Literature", "Academics", "Creative Writing", "Campus Life"],
    location: "Kolkata",
    price: 90,
    verified: true,
    bio: "Literature enthusiast with a love for creative writing. I mentor students in academic writing and exploring humanities careers.",
  },
  {
    id: 17,
    name: "Aditya Prakash",
    college: "IIM Bangalore",
    course: "MBA",
    year: "2nd Year",
    rating: 4.9,
    sessions: 39,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["MBA", "Case Studies", "Consulting", "Placements"],
    location: "Bangalore",
    price: 140,
    verified: true,
    bio: "MBA student with consulting experience. I specialize in case study preparation and B-school placement guidance.",
  },
  {
    id: 18,
    name: "Ritika Sharma",
    college: "IIT Kanpur",
    course: "Chemical Engineering",
    year: "3rd Year",
    rating: 4.6,
    sessions: 27,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["Engineering", "Placements", "Research", "Projects"],
    location: "Kanpur",
    price: 110,
    verified: true,
    bio: "Chemical engineering student with research experience. I help students with academic projects and research methodologies.",
  },
  {
    id: 19,
    name: "Sanjana Iyer",
    college: "Christ University",
    course: "BBA",
    year: "2nd Year",
    rating: 4.5,
    sessions: 15,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["Business", "Management", "Campus Life", "Internships"],
    location: "Bangalore",
    price: 85,
    verified: true,
    bio: "BBA student exploring the world of business management. I guide students on college selections and career paths in management.",
  },
  {
    id: 20,
    name: "Mohammed Yusuf",
    college: "IIT Hyderabad",
    course: "Artificial Intelligence",
    year: "1st Year",
    rating: 4.7,
    sessions: 19,
    image: "/placeholder.svg?height=120&width=120",
    specialties: ["AI", "Coding", "Projects", "Research"],
    location: "Hyderabad",
    price: 120,
    verified: true,
    bio: "AI enthusiast exploring the frontiers of machine learning. I help students with coding skills and AI/ML project guidance.",
  },
];

// Helper function to generate avatar URL
function getAvatarUrl(name: string) {
  const colors = [
    "6366f1",
    "8b5cf6",
    "ec4899",
    "f43f5e",
    "f97316",
    "14b8a6",
    "06b6d4",
    "3b82f6",
  ];
  const colorIndex =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${colors[colorIndex]}&color=fff&size=200&bold=true`;
}

// Generate time slots
function generateTimeSlots() {
  const slots = [];
  for (let hour = 9; hour <= 20; hour++) {
    const time = `${hour.toString().padStart(2, "0")}:00`;
    const displayTime =
      hour < 12
        ? `${hour}:00 AM`
        : hour === 12
          ? `12:00 PM`
          : `${hour - 12}:00 PM`;
    slots.push({ time, displayTime, available: Math.random() > 0.3 });
  }
  return slots;
}

// Generate dates for the next 14 days
function generateDates() {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      date: date,
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      full: date.toISOString().split("T")[0],
    });
  }
  return dates;
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const mentorId = parseInt(params.id as string);
  const mentor = mentors.find((m) => m.id === mentorId);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [dateStartIndex, setDateStartIndex] = useState(0);

  const dates = generateDates();
  const timeSlots = generateTimeSlots();
  const visibleDates = dates.slice(dateStartIndex, dateStartIndex + 7);

  if (!mentor) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="pt-32 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Mentor not found
          </h1>
          <Link
            href="/find-mentors"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            Back to Find Mentors
          </Link>
        </div>
      </div>
    );
  }

  const avatarUrl = getAvatarUrl(mentor.name);

  const handlePayNow = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time slot");
      return;
    }
    // In production, this would redirect to payment gateway
    alert(
      `Proceeding to payment for session with ${mentor.name} on ${selectedDate} at ${selectedTime}`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/find-mentors"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Mentors</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Mentor Profile */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <Image
                        src={avatarUrl}
                        alt={mentor.name}
                        width={120}
                        height={120}
                        className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover ring-4 ring-slate-100"
                        unoptimized
                      />
                      {mentor.verified && (
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center ring-4 ring-white">
                          <BadgeCheck className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">
                      {mentor.name}
                    </h1>
                    <p className="text-slate-600 mb-3">{mentor.college}</p>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
                      <span className="inline-flex items-center gap-1.5">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        <span className="font-semibold text-slate-900">
                          {mentor.rating}
                        </span>
                        <span>rating</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span className="font-semibold text-slate-900">
                          {mentor.sessions}
                        </span>
                        <span>sessions</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span>{mentor.location}</span>
                      </span>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2">
                      {mentor.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">
                  About
                </h2>
                <p className="text-slate-600 leading-relaxed">{mentor.bio}</p>
              </div>

              {/* Education & Details */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Education
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">
                        {mentor.college}
                      </p>
                      <p className="text-sm text-slate-500">{mentor.course}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{mentor.year}</p>
                      <p className="text-sm text-slate-500">Current Year</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-28">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-3xl font-bold text-slate-900">
                      ₹{mentor.price}
                    </span>
                    <span className="text-slate-500 ml-1">/session</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span>30 min</span>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Select Date
                    </h3>
                    <div className="flex gap-1">
                      <button
                        onClick={() =>
                          setDateStartIndex(Math.max(0, dateStartIndex - 7))
                        }
                        disabled={dateStartIndex === 0}
                        className="p-1 rounded-md hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setDateStartIndex(
                            Math.min(dates.length - 7, dateStartIndex + 7)
                          )
                        }
                        disabled={dateStartIndex >= dates.length - 7}
                        className="p-1 rounded-md hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {visibleDates.map((d) => (
                      <button
                        key={d.full}
                        onClick={() => setSelectedDate(d.full)}
                        className={`p-2 rounded-xl text-center transition-all ${
                          selectedDate === d.full
                            ? "bg-slate-900 text-white"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        <div className="text-[10px] font-medium uppercase opacity-70">
                          {d.day}
                        </div>
                        <div className="text-sm font-bold">{d.dayNum}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4" />
                    Select Time
                  </h3>
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() =>
                          slot.available && setSelectedTime(slot.displayTime)
                        }
                        disabled={!slot.available}
                        className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                          selectedTime === slot.displayTime
                            ? "bg-slate-900 text-white"
                            : slot.available
                              ? "bg-slate-50 hover:bg-slate-100 text-slate-700"
                              : "bg-slate-50 text-slate-300 cursor-not-allowed line-through"
                        }`}
                      >
                        {slot.displayTime}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                {selectedDate && selectedTime && (
                  <div className="bg-slate-50 rounded-xl p-4 mb-6">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">
                      Booking Summary
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Date</span>
                        <span className="font-medium text-slate-900">
                          {new Date(selectedDate).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Time</span>
                        <span className="font-medium text-slate-900">
                          {selectedTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Duration</span>
                        <span className="font-medium text-slate-900">
                          30 minutes
                        </span>
                      </div>
                      <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between">
                        <span className="font-semibold text-slate-900">
                          Total
                        </span>
                        <span className="font-bold text-slate-900">
                          ₹{mentor.price}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pay Now Button */}
                <button
                  onClick={handlePayNow}
                  disabled={!selectedDate || !selectedTime}
                  className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all ${
                    selectedDate && selectedTime
                      ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25"
                      : "bg-slate-300 cursor-not-allowed"
                  }`}
                >
                  Pay Now - ₹{mentor.price}
                </button>

                <p className="text-xs text-slate-500 text-center mt-3">
                  Free cancellation up to 24 hours before the session
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
