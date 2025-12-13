"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MapPin, Star, Calendar, Clock, MessageCircle, ChevronLeft, ChevronRight, Check, Lock } from "lucide-react";

const mentors = [
  {
    id: 1,
    name: "Vyom Padalia",
    college: "IIT Delhi",
    course: "Computer Science & Engineering",
    year: "3rd Year",
    rating: 4.9,
    sessions: 45,
    image: "https://media.licdn.com/dms/image/v2/D5603AQFXOknykDex6A/profile-displayphoto-scale_400_400/B56Zl1BCzTJ0Ag-/0/1758604833750?e=1766620800&v=beta&t=O6QGLeJCe9Z9khAZpGbJiO45obUDHvrTkv3Hylgmz0U",
    specialties: ["Engineering", "Coding", "Campus Life", "Placements"],
    location: "Delhi",
    price: 100,
    verified: true,
    bio: "Hey! I'm a 3rd year CSE student at IIT Delhi. I've been through the JEE grind and can help you navigate college admissions, coding interviews, and campus life. Let's chat!",
    languages: ["English", "Hindi"],
    responseTime: "Usually responds within 2 hours",
  },
  {
    id: 2,
    name: "Sneha Patel",
    college: "AIIMS Delhi",
    course: "MBBS",
    year: "4th Year",
    rating: 5,
    sessions: 32,
    image: "https://media.licdn.com/dms/image/v2/D4D03AQFGHyz25GD-1w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1716278455382?e=1766620800&v=beta&t=lRc_LJgXQZeYwoViw-mBiNjN2mvA3jZiWclwcj3w4aU",
    specialties: ["Medical", "NEET", "Study Tips", "Research"],
    location: "Delhi",
    price: 100,
    verified: true,
    bio: "MBBS student at AIIMS Delhi. I cracked NEET with AIR under 100 and can guide you through medical entrance prep, college life, and research opportunities.",
    languages: ["English", "Hindi", "Gujarati"],
    responseTime: "Usually responds within 1 hour",
  },
  {
    id: 3,
    name: "Rohit Sharma",
    college: "SRCC Delhi",
    course: "Economics (Hons)",
    year: "2nd Year",
    rating: 4.7,
    sessions: 28,
    image: "https://images.unsplash.com/photo-1584999734482-0361f5fcf5c6",
    specialties: ["Commerce", "Economics", "DU Life", "Finance"],
    location: "Delhi",
    price: 100,
    verified: true,
    bio: "Economics student at SRCC. Happy to share insights about DU admissions, commerce stream, and career paths in finance and consulting.",
    languages: ["English", "Hindi"],
    responseTime: "Usually responds within 3 hours",
  },
  {
    id: 4,
    name: "Priya Singh",
    college: "NIT Trichy",
    course: "Mechanical Engineering",
    year: "3rd Year",
    rating: 4.9,
    sessions: 38,
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    specialties: ["Engineering", "NIT Life", "Placements", "Research"],
    location: "Tamil Nadu",
    price: 100,
    verified: true,
    bio: "Mechanical Engineering student at NIT Trichy. I can help you with JEE Mains counseling, NIT campus life, and placement preparation.",
    languages: ["English", "Hindi", "Tamil"],
    responseTime: "Usually responds within 2 hours",
  },
  {
    id: 5,
    name: "Karan Mehta",
    college: "IIM Ahmedabad",
    course: "MBA",
    year: "1st Year",
    rating: 4.6,
    sessions: 22,
    image: "https://images.unsplash.com/photo-1589578527966-10c1976020d6",
    specialties: ["MBA", "CAT Prep", "Business", "Consulting"],
    location: "Gujarat",
    price: 100,
    verified: true,
    bio: "MBA student at IIM Ahmedabad. Scored 99.5%ile in CAT. Can guide you through MBA prep, B-school selection, and career in consulting.",
    languages: ["English", "Hindi"],
    responseTime: "Usually responds within 4 hours",
  },
  {
    id: 6,
    name: "Ananya Reddy",
    college: "BITS Pilani",
    course: "Electronics & Communication",
    year: "4th Year",
    rating: 4.8,
    sessions: 41,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
    specialties: ["Engineering", "BITS Life", "Research", "Internships"],
    location: "Rajasthan",
    price: 100,
    verified: true,
    bio: "ECE student at BITS Pilani. I've done internships at top tech companies and can help you with BITSAT prep, college life, and career planning.",
    languages: ["English", "Hindi", "Telugu"],
    responseTime: "Usually responds within 2 hours",
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
    bio: "EE student at IIT Bombay. Passionate about startups and tech. Can guide you through JEE Advanced prep and IIT life.",
    languages: ["English", "Hindi"],
    responseTime: "Usually responds within 3 hours",
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
    bio: "MBBS student at Lady Hardinge. I can help you with NEET preparation, medical college selection, and life as a medical student.",
    languages: ["English", "Hindi"],
    responseTime: "Usually responds within 2 hours",
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
    bio: "PhD scholar at IISc Bangalore. I can guide you through research careers, grad school applications, and life in academia.",
    languages: ["English", "Hindi", "Malayalam"],
    responseTime: "Usually responds within 1 hour",
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
    bio: "Psychology student at DU. Passionate about mental health awareness. Can help with DU admissions and psychology career paths.",
    languages: ["English", "Hindi", "Punjabi"],
    responseTime: "Usually responds within 2 hours",
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
    bio: "Civil Engineering student at NIT Warangal. Can guide you through JEE counseling, GATE preparation, and core engineering careers.",
    languages: ["English", "Hindi", "Telugu"],
    responseTime: "Usually responds within 3 hours",
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
    bio: "Law student at Jamia. I can help you with CLAT prep, law school life, and career options in the legal field.",
    languages: ["English", "Hindi", "Urdu"],
    responseTime: "Usually responds within 2 hours",
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
    bio: "Aerospace Engineering student at IIT Madras. Passionate about space tech. Can guide you through JEE prep and engineering careers.",
    languages: ["English", "Hindi", "Gujarati"],
    responseTime: "Usually responds within 2 hours",
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
    bio: "Architecture student at IIT Roorkee. Can help you with JEE + AAT prep, architecture portfolio, and creative career paths.",
    languages: ["English", "Hindi"],
    responseTime: "Usually responds within 4 hours",
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
    bio: "Mechanical Engineering student at AMU. Can guide you through engineering admissions, campus life, and placement preparation.",
    languages: ["English", "Hindi", "Urdu"],
    responseTime: "Usually responds within 3 hours",
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
    bio: "English Literature student at Jadavpur. Can help with humanities admissions, academic writing, and career in content/media.",
    languages: ["English", "Hindi", "Bengali"],
    responseTime: "Usually responds within 2 hours",
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
    bio: "MBA student at IIM Bangalore. Worked at a Big 4 before MBA. Can guide you through CAT prep and consulting careers.",
    languages: ["English", "Hindi"],
    responseTime: "Usually responds within 1 hour",
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
    bio: "Chemical Engineering student at IIT Kanpur. Can help with JEE counseling, branch selection, and engineering career paths.",
    languages: ["English", "Hindi"],
    responseTime: "Usually responds within 3 hours",
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
    bio: "BBA student at Christ University. Can help you with management admissions, Bangalore college life, and business career paths.",
    languages: ["English", "Hindi", "Kannada"],
    responseTime: "Usually responds within 2 hours",
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
    bio: "AI student at IIT Hyderabad. Passionate about ML and deep learning. Can guide you through JEE prep and tech careers.",
    languages: ["English", "Hindi", "Telugu"],
    responseTime: "Usually responds within 2 hours",
  },
];

// Generate available time slots for demo
const generateTimeSlots = (date: Date) => {
  const slots = [
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: Math.random() > 0.3 },
    { time: "12:00 PM", available: Math.random() > 0.5 },
    { time: "2:00 PM", available: true },
    { time: "3:00 PM", available: Math.random() > 0.4 },
    { time: "4:00 PM", available: true },
    { time: "5:00 PM", available: Math.random() > 0.3 },
    { time: "6:00 PM", available: Math.random() > 0.5 },
    { time: "7:00 PM", available: true },
  ];
  // Use date to seed randomness for consistency
  const seed = date.getDate();
  return slots.map((slot, i) => ({
    ...slot,
    available: (seed + i) % 3 !== 0, // Deterministic availability based on date
  }));
};

// Get next 14 days
const getNextDays = (startDate: Date, count: number) => {
  const days = [];
  for (let i = 0; i < count; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }
  return days;
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
};

const formatDayName = (date: Date) => {
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

const formatDayNumber = (date: Date) => {
  return date.getDate();
};

const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export default function MentorProfilePage() {
  const params = useParams();
  const mentorId = Number(params.id);
  const mentor = mentors.find((m) => m.id === mentorId);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number>(30);
  const [weekOffset, setWeekOffset] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + weekOffset * 7);
  const days = getNextDays(startDate, 7);
  const timeSlots = generateTimeSlots(selectedDate);

  const handleBookSession = () => {
    if (selectedDate && selectedTime) {
      setShowConfirmation(true);
    }
  };

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Mentor not found</h1>
          <p className="text-gray-500 mb-6">The mentor you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/find-mentors"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Find Mentors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <Link
            href="/find-mentors"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-base font-medium">Back to Mentors</span>
          </Link>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-3">
            {/* Main Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Profile Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover"
                    />
                    {mentor.verified && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                      </div>
                    )}
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                          {mentor.name}
                        </h1>
                        <p className="text-lg text-gray-700 mt-1 font-medium">
                          {mentor.college}
                        </p>
                        <p className="text-gray-500 mt-0.5">
                          {mentor.course} • {mentor.year}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold text-gray-900">{mentor.rating}</span>
                        <span className="text-gray-500">rating</span>
                      </div>
                      <div className="w-px h-4 bg-gray-200" />
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-gray-900">{mentor.sessions}</span>
                        <span className="text-gray-500">sessions</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 mt-3 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{mentor.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-2">About</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{mentor.bio}</p>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-2">Can help you with</h2>
              <div className="flex flex-wrap gap-2">
                {mentor.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-2">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {mentor.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-28 relative overflow-hidden">
              {/* Blurred Content */}
              <div className="blur-[6px] pointer-events-none select-none">
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900">₹{mentor.price}</div>
                  <p className="text-gray-500 text-sm">per session</p>
                </div>

                {/* Session Duration */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Session Duration</h3>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-gray-900 text-white"
                    >
                      30 min
                    </button>
                    <button
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-gray-100 text-gray-700"
                    >
                      45 min
                    </button>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-700">Select Date</h3>
                    <div className="flex items-center gap-1">
                      <button className="p-1 rounded-lg">
                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 rounded-lg">
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((date, index) => (
                      <button
                        key={index}
                        className={`flex flex-col items-center py-2 rounded-xl ${
                          index === 0 ? "bg-gray-900 text-white" : "text-gray-700"
                        }`}
                      >
                        <span className={`text-[10px] uppercase ${index === 0 ? "text-gray-300" : "text-gray-500"}`}>
                          {formatDayName(date)}
                        </span>
                        <span className="text-sm font-semibold">
                          {formatDayNumber(date)}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {formatDate(selectedDate)}
                  </p>
                </div>

                {/* Time Slots */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Available Times</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.slice(0, 6).map((slot, index) => (
                      <button
                        key={index}
                        className={`py-2 px-2 rounded-lg text-xs font-medium ${
                          index === 0 ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <button className="w-full py-3.5 rounded-xl font-semibold bg-gray-900 text-white">
                  Confirm Booking
                </button>
              </div>

              {/* Lock Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center mb-4 shadow-lg">
                  <Lock className="w-7 h-7 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
                <p className="text-sm text-gray-500 text-center px-6">
                  Stay tuned for booking sessions with your favorite mentors!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-500 text-sm mb-6">
                Your session with {mentor.name} has been scheduled.
              </p>

              <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{mentor.name}</p>
                    <p className="text-sm text-gray-500">{mentor.college}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{selectedTime} ({selectedDuration} min)</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <Link
                  href="/find-mentors"
                  className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors text-center"
                >
                  Browse More
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
