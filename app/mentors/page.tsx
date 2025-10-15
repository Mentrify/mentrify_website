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
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import RazorpayButton from "../razorpay/razorpaybutton";
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
    <div className="min-h-screen bg-white">
      <div className="flex mt-20">
        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          fixed lg:sticky top-0 left-0 h-screen w-80 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${
            isMobileSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Find Mentors</h2>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search mentors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Active Filters Badge */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center justify-between mb-6 p-3 bg-blue-50 rounded-xl">
                <span className="text-blue-700 font-medium">
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""}{" "}
                  active
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          <div className="p-6 space-y-8">
            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Sort By
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="rating">Highest Rating</option>
                  <option value="sessions">Most Sessions</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* College Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                College Type
              </label>
              <div className="space-y-2">
                {["all", "IIT", "NIT", "AIIMS", "IIM", "BITS"].map(
                  (college) => (
                    <label
                      key={college}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="college"
                        value={college}
                        checked={collegeFilter === college}
                        onChange={(e) => setCollegeFilter(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">
                        {college === "all" ? "All Colleges" : college}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Stream Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Stream
              </label>
              <div className="space-y-2">
                {["all", "Engineering", "Medical", "Commerce", "MBA"].map(
                  (stream) => (
                    <label
                      key={stream}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="stream"
                        value={stream}
                        checked={streamFilter === stream}
                        onChange={(e) => setStreamFilter(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">
                        {stream === "all" ? "All Streams" : stream}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Location
              </label>
              <div className="space-y-2">
                {["all", "Delhi", "Tamil Nadu", "Gujarat", "Rajasthan"].map(
                  (location) => (
                    <label
                      key={location}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="location"
                        value={location}
                        checked={locationFilter === location}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">
                        {location === "all" ? "All Locations" : location}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>₹0</span>
                  <span>₹500+</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-900">
                    {filteredMentors.length}
                  </div>
                  <div className="text-xs text-blue-600">Available</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Award className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-900">4.8</div>
                  <div className="text-xs text-green-600">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white border-b border-gray-200 p-4 sticky top-0 z-30">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <Filter className="h-5 w-5 mr-2" />
                <span className="font-medium">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              <div className="text-gray-600">
                <span className="font-semibold text-gray-900">
                  {filteredMentors.length}
                </span>{" "}
                mentors
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <section className="pt-5 pb-8 bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full text-green-700 text-sm font-medium mb-6 glass">
                  <Verified className="w-4 h-4 mr-2 text-green-600" />
                  All Mentors Verified
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Connect with{" "}
                  <span className="apple-gradient-text">Expert Mentors</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl lg:mx-0 mx-auto">
                  Get personalized guidance from verified college seniors who
                  understand your journey.
                </p>
              </div>

              {/* Desktop Results Info */}
              <div className="hidden lg:flex items-center justify-between mt-8 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-semibold text-gray-900">
                      {filteredMentors.length}
                    </span>
                    <span className="text-gray-600 ml-1">mentors found</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-gray-600">
                      Instant booking available
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Sorted by {sortBy.replace("_", " ")}
                </div>
              </div>
            </div>
          </section>

          {/* Mentors Grid */}
          <section className="py-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-6">
              {filteredMentors.length > 0 ? (
                <>
                  <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {pagedMentors.map((mentor, index) => (
                      <div
                        key={mentor.id}
                        className="mentor-card opacity-0 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="relative">
                              <Image
                                src={mentor.image || "/placeholder.svg"}
                                alt={mentor.name}
                                width={56}
                                height={56}
                                className="rounded-2xl"
                              />
                              {mentor.verified && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                  <Verified className="h-3 w-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="ml-3">
                              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {mentor.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {mentor.college}
                              </p>
                              <p className="text-sm text-blue-600 font-medium">
                                {mentor.course.split(" ")[0]} • {mentor.year}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-semibold text-gray-900">
                              {mentor.rating}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{mentor.sessions}</span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="truncate max-w-16">
                              {mentor.location}
                            </span>
                          </div>
                        </div>

                        {/* Bio */}
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                          {mentor.bio}
                        </p>

                        {/* Specialties */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {mentor.specialties
                              .slice(0, 3)
                              .map((specialty, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium"
                                >
                                  {specialty}
                                </span>
                              ))}
                            {mentor.specialties.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                                +{mentor.specialties.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Languages */}
                        <div className="mb-6">
                          <div className="flex gap-1">
                            {mentor.languages.map((language, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
                              >
                                {language}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xl font-bold text-gray-900">
                                ₹{mentor.price}
                              </span>
                              <span className="text-gray-500 text-sm ml-1">
                                /session
                              </span>
                            </div>
                            <Link href={`/booking/${mentor.id}`}>
                              <button className="apple-button px-4 py-2 text-sm group-hover:scale-105 transition-transform">
                                Book Now
                              </button>
                            </Link>
                          </div>
                          {/* Razorpay Payment Button */}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <SimplePagination
                      page={page}
                      totalPages={totalPages}
                      onPageChange={setPage}
                    />
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    No mentors found
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Try adjusting your filters to find more mentors.
                  </p>
                  <button onClick={clearAllFilters} className="apple-button">
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
