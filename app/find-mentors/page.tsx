"use client";

import { useState, useEffect, useRef } from "react";
import { SimplePagination } from "@/components/ui/pagination";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Star, X, ChevronDown, BadgeCheck } from "lucide-react";
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
    specialties: ["Engineering", "Coding", "Campus Life", "Placements"],
    location: "Delhi",
    price: 100,
    verified: true,
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
  },
];

const MENTORS_PER_PAGE = 12;

// Premium Filter Chip Component
function FilterChip({
  label,
  value,
  options,
  onChange,
  isOpen,
  onToggle,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpen) onToggle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  const selectedOption = options.find((o) => o.value === value);
  const isActive = value !== "all" && value !== "rating";
  const displayText = isActive ? selectedOption?.label : label;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={onToggle}
        className={`
          inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
          transition-all duration-200 ease-out whitespace-nowrap
          ${
            isActive
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:shadow-sm"
          }
        `}
      >
        <span>{displayText}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${isActive ? "text-slate-300" : "text-slate-400"}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 min-w-[180px] z-50 overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                onToggle();
              }}
              className={`
                w-full text-left px-4 py-2.5 text-sm transition-colors
                ${
                  value === option.value
                    ? "bg-slate-50 text-slate-900 font-medium"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Premium Mentor Card Component
function MentorCard({ mentor }: { mentor: (typeof mentors)[0] }) {
  return (
    <Link href={`/booking/${mentor.id}`}>
      <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200 hover:-translate-y-1 h-full flex flex-col">
        {/* Subtle gradient header */}
        <div className="h-14 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        </div>

        {/* Content */}
        <div className="px-5 pb-5 flex-1 flex flex-col -mt-7">
          {/* Profile section */}
          <div className="flex items-start gap-3 mb-4">
            <div className="relative flex-shrink-0">
              <Image
                src={mentor.image}
                alt={mentor.name}
                width={52}
                height={52}
                className="rounded-xl object-cover ring-2 ring-white shadow-md"
              />
              {mentor.verified && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 bg-blue-500 rounded-full flex items-center justify-center ring-2 ring-white">
                  <BadgeCheck className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <h3 className="font-semibold text-slate-900 text-[15px] truncate group-hover:text-blue-600 transition-colors">
                {mentor.name}
              </h3>
              <p className="text-[13px] text-slate-500 truncate">
                {mentor.college}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 text-[13px] text-slate-500 mb-4">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              <span className="font-medium text-slate-700">{mentor.rating}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>{mentor.sessions} sessions</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="inline-flex items-center gap-0.5">
              <MapPin className="h-3 w-3" />
              {mentor.location.split(" ")[0]}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
            {mentor.specialties.slice(0, 2).map((specialty, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium"
              >
                {specialty}
              </span>
            ))}
            {mentor.specialties.length > 2 && (
              <span className="px-2 py-1 text-slate-400 text-xs">
                +{mentor.specialties.length - 2}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div>
              <span className="text-lg font-semibold text-slate-900">
                ₹{mentor.price}
              </span>
              <span className="text-slate-400 text-sm ml-1">/session</span>
            </div>
            <span className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg group-hover:bg-blue-600 transition-colors">
              Book
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function FindMentorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("all");
  const [streamFilter, setStreamFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [page, setPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const filteredMentors = mentors
    .filter((mentor) => {
      const search = searchTerm.trim().toLowerCase();
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

      return (
        matchesSearch && matchesCollege && matchesStream && matchesLocation
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

  useEffect(() => {
    setPage(1);
  }, [searchTerm, collegeFilter, streamFilter, locationFilter, sortBy]);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".mentor-card");
      cards.forEach((card, idx) => {
        card.classList.remove("animate-fade-in-up");
        card.classList.remove("opacity-0");
        setTimeout(() => {
          card.classList.add("animate-fade-in-up");
        }, idx * 40);
      });
    }
  }, [filteredMentors, page]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setCollegeFilter("all");
    setStreamFilter("all");
    setLocationFilter("all");
    setSortBy("rating");
  };

  const activeFiltersCount =
    (collegeFilter !== "all" ? 1 : 0) +
    (streamFilter !== "all" ? 1 : 0) +
    (locationFilter !== "all" ? 1 : 0);

  const totalPages = Math.ceil(filteredMentors.length / MENTORS_PER_PAGE);
  const pagedMentors = filteredMentors.slice(
    (page - 1) * MENTORS_PER_PAGE,
    page * MENTORS_PER_PAGE
  );

  const collegeOptions = [
    { value: "all", label: "All Colleges" },
    { value: "IIT", label: "IIT" },
    { value: "NIT", label: "NIT" },
    { value: "AIIMS", label: "AIIMS" },
    { value: "IIM", label: "IIM" },
    { value: "BITS", label: "BITS" },
  ];

  const streamOptions = [
    { value: "all", label: "All Streams" },
    { value: "Engineering", label: "Engineering" },
    { value: "Medical", label: "Medical" },
    { value: "Commerce", label: "Commerce" },
    { value: "MBA", label: "MBA" },
  ];

  const locationOptions = [
    { value: "all", label: "All Locations" },
    { value: "Delhi", label: "Delhi" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Gujarat", label: "Gujarat" },
  ];

  const sortOptions = [
    { value: "rating", label: "Highest Rated" },
    { value: "sessions", label: "Most Sessions" },
    { value: "price_low", label: "Price: Low → High" },
    { value: "price_high", label: "Price: High → Low" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navigation />

      {/* Header */}
      <header className="pt-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            {/* Title Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                  Find a Mentor
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  {filteredMentors.length} mentors available
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search mentors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center gap-2 pb-1 overflow-x-auto scrollbar-hide">
              <FilterChip
                label="College"
                value={collegeFilter}
                options={collegeOptions}
                onChange={setCollegeFilter}
                isOpen={openDropdown === "college"}
                onToggle={() =>
                  setOpenDropdown(openDropdown === "college" ? null : "college")
                }
              />
              <FilterChip
                label="Stream"
                value={streamFilter}
                options={streamOptions}
                onChange={setStreamFilter}
                isOpen={openDropdown === "stream"}
                onToggle={() =>
                  setOpenDropdown(openDropdown === "stream" ? null : "stream")
                }
              />
              <FilterChip
                label="Location"
                value={locationFilter}
                options={locationOptions}
                onChange={setLocationFilter}
                isOpen={openDropdown === "location"}
                onToggle={() =>
                  setOpenDropdown(
                    openDropdown === "location" ? null : "location"
                  )
                }
              />

              <div className="h-5 w-px bg-slate-200 mx-1" />

              <FilterChip
                label="Sort: Highest Rated"
                value={sortBy}
                options={sortOptions}
                onChange={setSortBy}
                isOpen={openDropdown === "sort"}
                onToggle={() =>
                  setOpenDropdown(openDropdown === "sort" ? null : "sort")
                }
              />

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors whitespace-nowrap"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredMentors.length > 0 ? (
          <>
            <div
              ref={cardsRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              {pagedMentors.map((mentor) => (
                <div key={mentor.id} className="mentor-card opacity-0">
                  <MentorCard mentor={mentor} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <SimplePagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No mentors found
            </h3>
            <p className="text-slate-500 mb-6 text-sm max-w-sm mx-auto">
              Try adjusting your search or filters to find what you&apos;re
              looking for.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
