"use client";

import { useState, useEffect, useRef } from "react";
import { SimplePagination } from "@/components/ui/pagination";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Verified,
  Star,
  X,
  ChevronDown,
  Users,
  Award,
  BookOpen,
} from "lucide-react";
import Navigation from "../../components/Navigation";

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
    languages: ["Hindi", "English"],
    specialties: ["Engineering", "Coding", "Campus Life", "Placements"],
    location: "Delhi",
    price: 100,
    verified: true,
    bio: "Passionate about helping juniors navigate their engineering journey with practical insights.",
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
    languages: ["English", "Gujarati"],
    specialties: ["Medical", "NEET", "Study Tips", "Research"],
    location: "Delhi",
    price: 100,
    verified: true,
    bio: "Medical student passionate about guiding aspiring doctors through their journey.",
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
    languages: ["Hindi", "English"],
    specialties: ["Commerce", "Economics", "DU Life", "Finance"],
    location: "Delhi",
    price: 100,
    verified: true,
    bio: "Economics enthusiast helping students understand commerce and finance better.",
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
    languages: ["English", "Tamil"],
    specialties: ["Engineering", "NIT Life", "Placements", "Research"],
    location: "Tamil Nadu",
    price: 100,
    verified: true,
    bio: "Mechanical engineering student with expertise in placements and research opportunities.",
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
    languages: ["English", "Hindi"],
    specialties: ["MBA", "CAT Prep", "Business", "Consulting"],
    location: "Gujarat",
    price: 100,
    verified: true,
    bio: "MBA student helping aspirants crack CAT and understand business school life.",
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
    languages: ["English", "Telugu"],
    specialties: ["Engineering", "BITS Life", "Research", "Internships"],
    location: "Rajasthan",
    price: 100,
    verified: true,
    bio: "Final year student with extensive experience in research and internships.",
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
    languages: ["Hindi", "English"],
    specialties: ["Engineering", "Projects", "Startups", "Internships"],
    location: "Mumbai",
    price: 120,
    verified: true,
    bio: "Focused on guiding students about projects, internships, and startup culture.",
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
    languages: ["English", "Hindi"],
    specialties: ["Medical", "NEET", "Clinical Skills", "Campus Life"],
    location: "Delhi",
    price: 110,
    verified: true,
    bio: "Helping future doctors excel in academics and clinical exposure.",
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
    languages: ["English", "Malayalam"],
    specialties: ["Research", "Physics", "Academics", "Higher Studies Abroad"],
    location: "Bangalore",
    price: 150,
    verified: true,
    bio: "Research scholar mentoring students interested in science and higher studies.",
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
    languages: ["English", "Punjabi"],
    specialties: ["Psychology", "Mental Health", "Study Tips", "DU Life"],
    location: "Delhi",
    price: 90,
    verified: true,
    bio: "Passionate about mental health awareness and student well-being.",
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
    languages: ["Telugu", "English", "Hindi"],
    specialties: ["Engineering", "Placements", "Research", "GATE Prep"],
    location: "Telangana",
    price: 100,
    verified: true,
    bio: "Civil engineer guiding peers in placements, projects, and GATE preparation.",
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
    languages: ["English", "Hindi"],
    specialties: ["Law", "Judiciary Prep", "Research", "Internships"],
    location: "Delhi",
    price: 95,
    verified: true,
    bio: "Law student mentoring juniors in legal studies and internships.",
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
    languages: ["Gujarati", "English"],
    specialties: ["Engineering", "Placements", "Projects", "Higher Studies"],
    location: "Chennai",
    price: 130,
    verified: true,
    bio: "Aerospace enthusiast mentoring students for research and placements.",
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
    languages: ["Hindi", "English"],
    specialties: ["Architecture", "Design", "Campus Life", "Creative Careers"],
    location: "Roorkee",
    price: 85,
    verified: true,
    bio: "Architecture student passionate about design and guiding peers.",
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
    languages: ["Urdu", "English", "Hindi"],
    specialties: ["Engineering", "Internships", "Placements", "Projects"],
    location: "Uttar Pradesh",
    price: 100,
    verified: true,
    bio: "Mechanical student mentoring juniors on internships and projects.",
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
    languages: ["English", "Bengali"],
    specialties: ["Literature", "Academics", "Creative Writing", "Campus Life"],
    location: "Kolkata",
    price: 90,
    verified: true,
    bio: "Literature student helping peers in creative writing and academics.",
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
    languages: ["English", "Hindi"],
    specialties: ["MBA", "Case Studies", "Consulting", "Placements"],
    location: "Bangalore",
    price: 140,
    verified: true,
    bio: "MBA student providing insights into consulting and placements.",
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
    languages: ["English", "Hindi"],
    specialties: ["Engineering", "Placements", "Research", "Projects"],
    location: "Kanpur",
    price: 110,
    verified: true,
    bio: "Passionate about chemical engineering and guiding juniors for research.",
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
    languages: ["English", "Kannada"],
    specialties: ["Business", "Management", "Campus Life", "Internships"],
    location: "Bangalore",
    price: 85,
    verified: true,
    bio: "Helping juniors with management studies and campus guidance.",
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
    languages: ["English", "Hindi", "Telugu"],
    specialties: ["AI", "Coding", "Projects", "Research"],
    location: "Hyderabad",
    price: 120,
    verified: true,
    bio: "AI student passionate about coding, projects, and guiding aspirants.",
  },
];

const MENTORS_PER_PAGE = 9;

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("all");
  const [streamFilter, setStreamFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("rating");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const cardsRef = useRef<HTMLDivElement>(null);

  const filteredMentors = mentors
    .filter((mentor) => {
      const search = searchTerm.trim().toLowerCase();
      // If search is empty, always match
      const matchesSearch =
        !search ||
        mentor.name.toLowerCase().includes(search) ||
        mentor.college.toLowerCase().includes(search) ||
        mentor.course.toLowerCase().includes(search);

      const matchesCollege =
        collegeFilter === "all" || mentor.college.includes(collegeFilter);
      const matchesStream =
        streamFilter === "all" ||
        mentor.specialties.some((specialty) =>
          specialty.toLowerCase().includes(streamFilter.toLowerCase())
        );
      const matchesLocation =
        locationFilter === "all" ||
        mentor.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesPrice =
        mentor.price >= priceRange[0] && mentor.price <= priceRange[1];

      return (
        matchesSearch &&
        matchesCollege &&
        matchesStream &&
        matchesLocation &&
        matchesPrice
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "sessions":
          return b.sessions - a.sessions;
        case "price_low":
          return a.price - b.price;
        case "price_high":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  // Reset to first page if filters/search change
  useEffect(() => {
    setPage(1);
  }, [
    searchTerm,
    collegeFilter,
    streamFilter,
    locationFilter,
    priceRange,
    sortBy,
  ]);

  // Animate mentor cards on every render of filteredMentors
  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".mentor-card");
      cards.forEach((card, idx) => {
        card.classList.remove("animate-fade-in-up");
        card.classList.remove("opacity-0");
        setTimeout(() => {
          card.classList.add("animate-fade-in-up");
        }, idx * 100);
      });
    }
  }, [filteredMentors]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setCollegeFilter("all");
    setStreamFilter("all");
    setLocationFilter("all");
    setPriceRange([0, 500]);
    setSortBy("rating");
    // Focus the search input for better UX
    setTimeout(() => {
      const input = document.querySelector(
        'input[placeholder="Search mentors..."]'
      ) as HTMLInputElement;
      if (input) input.focus();
    }, 100);
  };

  const activeFiltersCount =
    (searchTerm ? 1 : 0) +
    (collegeFilter !== "all" ? 1 : 0) +
    (streamFilter !== "all" ? 1 : 0) +
    (locationFilter !== "all" ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0);

  // Pagination logic
  const totalPages = Math.ceil(filteredMentors.length / MENTORS_PER_PAGE);
  const pagedMentors = filteredMentors.slice(
    (page - 1) * MENTORS_PER_PAGE,
    page * MENTORS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <Navigation />

      {/* Hero Banner Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100 mb-6">
                <Verified className="w-4 h-4 mr-2 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">
                  Verified Mentors
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Find Your Perfect{" "}
                <span className="apple-gradient-text">Mentor</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Connect with experienced college seniors for personalized
                guidance on academics, placements, internships, and campus life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-sm font-bold"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-semibold text-gray-900">
                      {mentors.length}+ Mentors
                    </p>
                    <p className="text-gray-500">Ready to help</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-300 to-purple-300 rounded-3xl blur-3xl opacity-20"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-4 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="Search by name or course..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">
                            {filteredMentors.length}
                          </p>
                          <p className="text-xs text-gray-600">Available</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">
                            4.8
                          </p>
                          <p className="text-xs text-gray-600">Avg Rating</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-purple-600">
                            ₹100
                          </p>
                          <p className="text-xs text-gray-600">From</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Results Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Modern Filter Cards */}
          <div className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Sort By Card */}
              <div className="bg-white rounded-2xl p-4 border-2 border-gray-100 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Star className="w-4 h-4 text-blue-600" />
                  </div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Sort By
                  </label>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium appearance-none cursor-pointer hover:border-blue-300 transition-colors"
                >
                  <option value="rating">Highest Rating</option>
                  <option value="sessions">Most Sessions</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>

              {/* College Type Card */}
              <div className="bg-white rounded-2xl p-4 border-2 border-gray-100 hover:border-purple-300 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <Award className="w-4 h-4 text-purple-600" />
                  </div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    College
                  </label>
                </div>
                <select
                  value={collegeFilter}
                  onChange={(e) => setCollegeFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm font-medium appearance-none cursor-pointer hover:border-purple-300 transition-colors"
                >
                  <option value="all">All Colleges</option>
                  {["IIT", "NIT", "AIIMS", "IIM", "BITS"].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stream Card */}
              <div className="bg-white rounded-2xl p-4 border-2 border-gray-100 hover:border-green-300 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <BookOpen className="w-4 h-4 text-green-600" />
                  </div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Stream
                  </label>
                </div>
                <select
                  value={streamFilter}
                  onChange={(e) => setStreamFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm font-medium appearance-none cursor-pointer hover:border-green-300 transition-colors"
                >
                  <option value="all">All Streams</option>
                  {["Engineering", "Medical", "Commerce", "MBA"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-2xl p-4 border-2 border-gray-100 hover:border-red-300 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                    <MapPin className="w-4 h-4 text-red-600" />
                  </div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Location
                  </label>
                </div>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium appearance-none cursor-pointer hover:border-red-300 transition-colors"
                >
                  <option value="all">All Locations</option>
                  {[
                    "Delhi",
                    "Tamil Nadu",
                    "Gujarat",
                    "Rajasthan",
                    "Bangalore",
                    "Mumbai",
                  ].map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Card */}
              <div className="bg-white rounded-2xl p-4 border-2 border-gray-100 hover:border-orange-300 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                    <Calendar className="w-4 h-4 text-orange-600" />
                  </div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Max Price
                  </label>
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                  <div className="text-center">
                    <span className="text-sm font-bold text-gray-900">
                      ₹{priceRange[1]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results and Clear Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 bg-white rounded-2xl border-2 border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Found</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredMentors.length}
                  <span className="text-sm font-semibold text-gray-600 ml-2">
                    mentors
                  </span>
                </p>
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-700 font-semibold rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 group"
              >
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                Clear Filters
              </button>
            )}
          </div>

          {/* Mentors Grid */}
          {filteredMentors.length > 0 ? (
            <>
              <div
                ref={cardsRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
              >
                {pagedMentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="mentor-card opacity-0 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 hover:border-gray-300 transition-all duration-300 group cursor-pointer transform hover:-translate-y-2 flex flex-col hover:bg-gradient-to-b hover:from-white hover:to-gray-50"
                  >
                    {/* Header with animated gradient background */}
                    <div className="relative h-28 bg-gradient-to-135 from-blue-500 via-blue-400 to-purple-500 overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></div>
                      <div className="absolute -top-2 -right-2 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="px-6 pb-6 flex-1 flex flex-col">
                      {/* Profile Section */}
                      <div className="flex items-start gap-4 -mt-16 mb-5 relative z-10">
                        <div className="relative">
                          <Image
                            src={mentor.image || "/placeholder.svg"}
                            alt={mentor.name}
                            width={90}
                            height={90}
                            className="rounded-2xl border-4 border-white shadow-lg object-cover group-hover:shadow-xl transition-shadow duration-300"
                          />
                          {mentor.verified && (
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center border-3 border-white shadow-md animate-pulse">
                              <Verified className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 pt-2">
                          <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                            {mentor.name}
                          </h3>
                          <p className="text-sm text-gray-600 font-medium mt-0.5">
                            {mentor.college}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                            <p className="text-xs text-blue-600 font-semibold">
                              {mentor.course.split(" ")[0]} • {mentor.year}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Stats with enhanced design */}
                      <div className="grid grid-cols-3 gap-3 mb-5 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 group-hover:from-blue-50 group-hover:to-purple-50 group-hover:border-blue-200 transition-all duration-300">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1.5 group-hover:scale-110 transition-transform duration-200">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="font-bold text-gray-900 text-sm">
                              {mentor.rating}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 font-medium">
                            Rating
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900 mb-1.5 text-sm flex items-center justify-center">
                            <Users className="h-4 w-4 text-purple-500 mr-1" />
                            {mentor.sessions}
                          </div>
                          <p className="text-xs text-gray-600 font-medium">
                            Sessions
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900 mb-1.5 text-sm flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-red-500" />
                            <span className="ml-0.5">
                              {mentor.location.split(" ")[0]}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 font-medium">
                            Location
                          </p>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2 flex-1 group-hover:text-gray-700 transition-colors">
                        {mentor.bio}
                      </p>

                      {/* Specialties with enhanced styling */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {mentor.specialties
                            .slice(0, 2)
                            .map((specialty, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200 group-hover:bg-blue-100 group-hover:border-blue-300 transition-all duration-200"
                              >
                                {specialty}
                              </span>
                            ))}
                          {mentor.specialties.length > 2 && (
                            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold border border-gray-300 group-hover:bg-gray-200 transition-all duration-200">
                              +{mentor.specialties.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="mb-6 flex gap-2 flex-wrap">
                        {mentor.languages.map((language, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg border border-gray-300 group-hover:bg-gray-200 group-hover:border-gray-400 transition-all duration-200"
                          >
                            {language}
                          </span>
                        ))}
                      </div>

                      {/* CTA Footer with enhanced design */}
                      <div className="border-t border-gray-200 pt-5 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            ₹{mentor.price}
                          </span>
                          <span className="text-gray-500 text-xs font-medium">
                            per session
                          </span>
                        </div>
                        <Link href={`/booking/${mentor.id}`}>
                          <button className="apple-button px-6 py-2.5 text-sm font-semibold group-hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg">
                            Book Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <SimplePagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                No mentors found
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Try adjusting your filters or search criteria to find more
                mentors that match your needs.
              </p>
              <button
                onClick={clearAllFilters}
                className="apple-button px-8 py-3 text-base font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
