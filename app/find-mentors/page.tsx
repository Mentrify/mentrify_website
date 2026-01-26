// "use client";

// import { useState, useEffect, useRef } from "react";
// import { createPortal } from "react-dom";
// import Link from "next/link";
// import Image from "next/image";
// import { Search, X, ChevronDown, CheckCircle2 } from "lucide-react";
// import mentorsData from "@/data/mentors.json";

// const mentors = mentorsData;

// const MENTORS_PER_PAGE = 9;

// // Simple Pagination Component
// function SimplePagination({
//   page,
//   totalPages,
//   onPageChange,
// }: {
//   page: number;
//   totalPages: number;
//   onPageChange: (p: number) => void;
// }) {
//   return (
//     <div className="flex items-center gap-2">
//       <button
//         onClick={() => onPageChange(Math.max(1, page - 1))}
//         disabled={page === 1}
//         className="px-4 py-2 rounded-lg bg-white border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
//       >
//         Previous
//       </button>
//       <span className="px-4 py-2 text-sm text-slate-600">
//         Page {page} of {totalPages}
//       </span>
//       <button
//         onClick={() => onPageChange(Math.min(totalPages, page + 1))}
//         disabled={page === totalPages}
//         className="px-4 py-2 rounded-lg bg-white border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
//       >
//         Next
//       </button>
//     </div>
//   );
// }

// // Premium Filter Chip Component
// function FilterChip({
//   label,
//   value,
//   options,
//   onChange,
//   isOpen,
//   onToggle,
// }: {
//   label: string;
//   value: string;
//   options: { value: string; label: string }[];
//   onChange: (v: string) => void;
//   isOpen: boolean;
//   onToggle: () => void;
// }) {
//   const dropdownRef = useRef<HTMLDivElement | null>(null);
//   const buttonRef = useRef<HTMLButtonElement | null>(null);
//   const menuRef = useRef<HTMLDivElement | null>(null);
//   const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as Node | null;
//       // if click is outside both the button and the menu, close
//       if (
//         isOpen &&
//         target &&
//         !buttonRef.current?.contains(target as Node) &&
//         !menuRef.current?.contains(target as Node)
//       ) {
//         onToggle();
//       }
//     };

//     const updatePosition = () => {
//       const btn = buttonRef.current;
//       if (!btn) return;
//       const rect = btn.getBoundingClientRect();

//       // prefer the button width, but allow shrinking to fit the viewport
//       const preferredW = Math.max(180, rect.width);
//       const maxViewportW = Math.max(180, window.innerWidth - 32);
//       const menuWidth = Math.min(preferredW, maxViewportW);

//       // anchor to the button's left by default, but shift if it would overflow
//       let left = rect.left;
//       const minLeft = 16; // keep 16px gutter on both sides
//       const maxLeft = Math.max(minLeft, window.innerWidth - menuWidth - 16);

//       if (left > maxLeft) left = maxLeft;
//       if (left < minLeft) left = minLeft;

//       setMenuStyle({
//         position: "fixed",
//         top: rect.bottom + 8,
//         left,
//         width: menuWidth,
//         zIndex: 9999,
//       });
//     };

//     const handleScroll = () => {
//       if (isOpen) onToggle();
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     window.addEventListener("resize", updatePosition);
//     window.addEventListener("scroll", handleScroll, true);
//     // update once when open
//     if (isOpen) updatePosition();

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       window.removeEventListener("resize", updatePosition);
//       window.removeEventListener("scroll", handleScroll, true);
//     };
//   }, [isOpen, onToggle]);

//   const selectedOption = options.find((o) => o.value === value);
//   const isActive = value !== "all" && value !== "rating";
//   const displayText = isActive ? selectedOption?.label : label;

//   return (
//     <div ref={dropdownRef} className="relative flex-shrink-0">
//       <button
//         ref={buttonRef}
//         type="button"
//         onClick={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           onToggle();
//         }}
//         className={`
//           inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium
//           transition-all duration-200 ease-out whitespace-nowrap cursor-pointer
//           ${
//             isOpen
//               ? "border-2 border-black bg-white text-slate-900"
//               : isActive
//               ? "bg-slate-900 text-white"
//               : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:shadow-sm"
//           }
//         `}
//       >
//         {/* show text on medium+ screens, icon only on small screens */}
//         <span className="hidden sm:inline">{displayText}</span>
//         <span className="inline sm:hidden">
//           {label === "College" ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-4 h-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M12 2l8 4-8 4-8-4 8-4z"
//               />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M4 10v6a8 8 0 008 8 8 8 0 008-8v-6"
//               />
//             </svg>
//           ) : label === "Stream" ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-4 h-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M3 7v10a1 1 0 001 1h16a1 1 0 001-1V7"
//               />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M7 7v-2a2 2 0 012-2h6a2 2 0 012 2v2"
//               />
//             </svg>
//           ) : label === "Location" ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-4 h-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1118 0z"
//               />
//               <circle cx="12" cy="10" r="3" strokeWidth={1.5} />
//             </svg>
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-4 h-4"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M4 6h16M4 12h10M4 18h7"
//               />
//             </svg>
//           )}
//         </span>
//         <ChevronDown
//           className={`w-3.5 h-3.5 transition-transform duration-200 ${
//             isOpen ? "rotate-180" : ""
//           } ${isActive ? "text-slate-300" : "text-slate-400"}`}
//         />
//       </button>

//       {isOpen &&
//         createPortal(
//           <div
//             ref={menuRef}
//             style={menuStyle}
//             className="bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-[9999] overflow-hidden"
//           >
//             {options.map((option) => (
//               <button
//                 type="button"
//                 key={option.value}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   onChange(option.value);
//                   onToggle();
//                 }}
//                 className={`
//                   w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer
//                   ${
//                     value === option.value
//                       ? "bg-slate-100 text-slate-900 font-medium"
//                       : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                   }
//                 `}
//               >
//                 {option.label}
//               </button>
//             ))}
//           </div>,
//           document.body
//         )}
//     </div>
//   );
// }

// function MentorCard({ mentor }: { mentor: any }) {
//   return (
//     <div className="group cursor-pointer">
//       <div
//         className="
//         relative rounded-[24px] overflow-hidden
//         bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]
//         transition-all duration-500
//         hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:scale-[1.01]
//         border border-gray-100
//       "
//       >
//         {/* Image */}
//         <div className="relative h-[280px] overflow-hidden">
//           {mentor.image ? (
//             <Image
//               src={mentor.image}
//               alt={mentor.name}
//               fill
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               className={`object-cover transition-all duration-700 group-hover:scale-[1.04] ${
//                 mentor.imagePosition === "top" ? "object-top" : ""
//               }`}
//               loading="lazy"
//             />
//           ) : (
//             <div className="w-full h-full bg-gradient-to-br from-primary-900 via-violet-500 to-pink-400 flex items-center justify-center">
//               <span className="text-6xl font-bold text-white">
//                 {mentor.name
//                   .split(" ")
//                   .map((n: string) => n[0])
//                   .join("")
//                   .toUpperCase()
//                   .slice(0, 2)}
//               </span>
//             </div>
//           )}
//           <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

//           {/* Verified Badge */}
//           {mentor.verified && (
//             <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-primary-900 via-violet-500 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
//               <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
//             </div>
//           )}

//           {/* Location Badge */}
//           <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
//             <svg
//               className="w-3.5 h-3.5 text-gray-500"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//               />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//               />
//             </svg>
//             <span className="text-xs font-medium text-gray-700">
//               {mentor.location}
//             </span>
//           </div>
//         </div>

//         {/* Info */}
//         <div className="px-6 pt-5 pb-6">
//           {/* Name */}
//           <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
//             {mentor.name}
//           </h3>

//           {/* College Info */}
//           <p className="text-[15px] text-gray-700 mt-1 font-medium">
//             {mentor.college}
//           </p>

//           {/* Course + Year */}
//           <p className="text-sm text-gray-500 mt-0.5">
//             {mentor.course} • {mentor.year}
//           </p>

//           {/* Stats Pills */}
//           <div className="flex items-center gap-2 mt-4">
//             <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-full">
//               <svg
//                 className="w-3.5 h-3.5 text-amber-500"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//               <span className="text-xs font-semibold text-amber-700">
//                 {mentor.rating}
//               </span>
//             </div>

//             <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full">
//               <svg
//                 className="w-3.5 h-3.5 text-blue-500"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//               </svg>
//               <span className="text-xs font-semibold text-blue-700">
//                 {mentor.sessions}
//               </span>
//             </div>
//           </div>

//           {/* CTA */}
//           <Link
//             href={`/mentor/${mentor.id}`}
//             className="
//               block w-full mt-5 py-3 rounded-xl text-center
//               bg-gray-900 text-white text-[15px]
//               font-semibold
//               transition-all duration-300
//               hover:bg-black
//             "
//           >
//             Schedule Session
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function FindMentorsPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [collegeFilter, setCollegeFilter] = useState("all");
//   const [streamFilter, setStreamFilter] = useState("all");
//   const [locationFilter, setLocationFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("rating");
//   const [page, setPage] = useState(1);
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // Fixed filtering logic
//   const filteredMentors = mentors
//     .filter((mentor) => {
//       const search = searchTerm.trim().toLowerCase();
//       const matchesSearch =
//         !search ||
//         mentor.name.toLowerCase().includes(search) ||
//         mentor.college.toLowerCase().includes(search) ||
//         mentor.course.toLowerCase().includes(search);

//       // Fixed college filter - check if mentor's college contains the filter value
//       const matchesCollege =
//         collegeFilter === "all" ||
//         mentor.college.toLowerCase().includes(collegeFilter.toLowerCase());

//       // Fixed stream filter - check specialties array
//       const matchesStream =
//         streamFilter === "all" ||
//         mentor.specialties.some((specialty) =>
//           specialty.toLowerCase().includes(streamFilter.toLowerCase())
//         );

//       // Fixed location filter
//       const matchesLocation =
//         locationFilter === "all" ||
//         mentor.location.toLowerCase().includes(locationFilter.toLowerCase());

//       return (
//         matchesSearch && matchesCollege && matchesStream && matchesLocation
//       );
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case "rating":
//           return b.rating - a.rating;
//         case "sessions":
//           return b.sessions - a.sessions;
//         case "price_low":
//           return a.price - b.price;
//         case "price_high":
//           return b.price - a.price;
//         default:
//           return 0;
//       }
//     });

//   useEffect(() => {
//     setPage(1);
//   }, [searchTerm, collegeFilter, streamFilter, locationFilter, sortBy]);

//   const clearAllFilters = () => {
//     setSearchTerm("");
//     setCollegeFilter("all");
//     setStreamFilter("all");
//     setLocationFilter("all");
//     setSortBy("rating");
//   };

//   const activeFiltersCount =
//     (collegeFilter !== "all" ? 1 : 0) +
//     (streamFilter !== "all" ? 1 : 0) +
//     (locationFilter !== "all" ? 1 : 0);

//   const totalPages = Math.ceil(filteredMentors.length / MENTORS_PER_PAGE);
//   const pagedMentors = filteredMentors.slice(
//     (page - 1) * MENTORS_PER_PAGE,
//     page * MENTORS_PER_PAGE
//   );

//   const collegeOptions = [
//     { value: "all", label: "All Colleges" },
//     { value: "IIT", label: "IIT" },
//     { value: "NIT", label: "NIT" },
//     { value: "IIIT", label: "IIIT" },
//     { value: "NID", label: "NID" },
//     { value: "Nirma", label: "Nirma" },
//     { value: "Dhirubhai Ambani", label: "DA-IICT" },
//     { value: "Charusat", label: "Charusat" },
//     { value: "VIT", label: "VIT" },
//     { value: "MIT", label: "MIT" },
//   ];

//   const streamOptions = [
//     { value: "all", label: "All Streams" },
//     { value: "Engineering", label: "Engineering" },
//     { value: "Design", label: "Design" },
//     { value: "Medical", label: "Medical" },
//     { value: "Business", label: "Business" },
//     { value: "AI/ML", label: "AI/ML" },
//     { value: "Research", label: "Research" },
//   ];

//   const locationOptions = [
//     { value: "all", label: "All Locations" },
//     { value: "Gujarat", label: "Gujarat" },
//     { value: "Maharashtra", label: "Maharashtra" },
//     { value: "Chhattisgarh", label: "Chhattisgarh" },
//     { value: "West Bengal", label: "West Bengal" },
//     { value: "Tamil Nadu", label: "Tamil Nadu" },
//     { value: "Assam", label: "Assam" },
//   ];

//   const sortOptions = [
//     { value: "rating", label: "Highest Rated" },
//     { value: "sessions", label: "Most Sessions" },
//     //   { value: "price_low", label: "Price: Low → High" },
//     //   { value: "price_high", label: "Price: High → Low" },
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Floating Header with Glassmorphism */}
//       <header className="fixed top-20 left-0 right-0 z-40 flex justify-center px-4 pt-4">
//         <div
//           className={`w-full max-w-6xl transition-all duration-700 ease-out rounded-3xl ${
//             isScrolled
//               ? "backdrop-blur-3xl bg-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] border border-white/50"
//               : "backdrop-blur-2xl bg-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/60"
//           }`}
//           style={{
//             backdropFilter: "blur(24px) saturate(200%)",
//             WebkitBackdropFilter: "blur(24px) saturate(200%)",
//           }}
//         >
//           <div className="px-6 lg:px-8 py-6">
//             {/* Title Row */}
//             <div className="mb-0">
//               {/* <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
//                 Find a{" "}
//                 <span className="bg-gradient-to-r from-blue-600 via-violet-500 to-pink-500 bg-clip-text text-transparent">
//                   Mentor
//                 </span>
//               </h1> */}
//               {/* <p className="text-slate-600 mt-2 text-sm">
//                 {filteredMentors.length} mentors available
//               </p> */}
//             </div>

//             {/* Filter Bar with Search - single line on desktop, stacked on mobile */}
//             <div className="flex flex-col sm:flex-row items-center justify-center">
//               <div className="w-full flex flex-col sm:flex-row items-center gap-4">
//                 {/* Filters (compact on small screens) */}
//                 <div className="flex items-center gap-3 flex-shrink-0 overflow-x-auto sm:overflow-visible pb-2 -mb-2 sm:pb-0 sm:mb-0">
//                   <FilterChip
//                     label="College"
//                     value={collegeFilter}
//                     options={collegeOptions}
//                     onChange={setCollegeFilter}
//                     isOpen={openDropdown === "college"}
//                     onToggle={() =>
//                       setOpenDropdown(
//                         openDropdown === "college" ? null : "college"
//                       )
//                     }
//                   />
//                   <FilterChip
//                     label="Stream"
//                     value={streamFilter}
//                     options={streamOptions}
//                     onChange={setStreamFilter}
//                     isOpen={openDropdown === "stream"}
//                     onToggle={() =>
//                       setOpenDropdown(
//                         openDropdown === "stream" ? null : "stream"
//                       )
//                     }
//                   />
//                   <FilterChip
//                     label="Location"
//                     value={locationFilter}
//                     options={locationOptions}
//                     onChange={setLocationFilter}
//                     isOpen={openDropdown === "location"}
//                     onToggle={() =>
//                       setOpenDropdown(
//                         openDropdown === "location" ? null : "location"
//                       )
//                     }
//                   />

//                   <div className="h-5 w-px bg-slate-300/50 mx-1 flex-shrink-0" />

//                   <FilterChip
//                     label="Sort"
//                     value={sortBy}
//                     options={sortOptions}
//                     onChange={setSortBy}
//                     isOpen={openDropdown === "sort"}
//                     onToggle={() =>
//                       setOpenDropdown(openDropdown === "sort" ? null : "sort")
//                     }
//                   />

//                   {activeFiltersCount > 0 && (
//                     <button
//                       onClick={clearAllFilters}
//                       className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white/70 rounded-full transition-colors whitespace-nowrap flex-shrink-0"
//                     >
//                       <X className="w-3.5 h-3.5" />
//                       <span className="hidden sm:inline">Clear all</span>
//                     </button>
//                   )}
//                 </div>

//                 {/* Search - on mobile it sits below filters; on sm+ it stays to the right */}
//                 <div className="flex-1 min-w-0 mt-3 sm:mt-0">
//                   <div className="relative w-full sm:max-w-md">
//                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
//                     <input
//                       type="text"
//                       placeholder="Search mentors..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pl-11 pr-10 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
//                       style={{
//                         backdropFilter: "blur(12px)",
//                         WebkitBackdropFilter: "blur(12px)",
//                       }}
//                     />
//                     {searchTerm && (
//                       <button
//                         onClick={() => setSearchTerm("")}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white/70 transition-colors"
//                       >
//                         <X className="h-4 w-4" />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Grid with top padding for fixed header */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-80 sm:pt-60 pb-12">
//         {filteredMentors.length > 0 ? (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {pagedMentors.map((mentor) => (
//                 <MentorCard key={mentor.id} mentor={mentor} />
//               ))}
//             </div>

//             {totalPages > 1 && (
//               <div className="mt-12 flex justify-center">
//                 <SimplePagination
//                   page={page}
//                   totalPages={totalPages}
//                   onPageChange={setPage}
//                 />
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="text-center py-20">
//             <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//               <Search className="h-8 w-8 text-slate-400" />
//             </div>
//             <h3 className="text-lg font-semibold text-slate-900 mb-2">
//               No mentors found
//             </h3>
//             <p className="text-slate-500 mb-6 text-sm max-w-sm mx-auto">
//               Try adjusting your search or filters to find what you're looking
//               for.
//             </p>
//             <button
//               onClick={clearAllFilters}
//               className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors"
//             >
//               Clear all filters
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }



"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ChevronDown, CheckCircle2 } from "lucide-react";
import { getMentors, Mentor } from "@/lib/services/mentor.service";

const MENTORS_PER_PAGE = 9;

/* ==================== FILTER CHIP ==================== */

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
  onChange: (v: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        isOpen &&
        target &&
        !buttonRef.current?.contains(target as Node) &&
        !menuRef.current?.contains(target as Node)
      ) {
        onToggle();
      }
    };

    const updatePosition = () => {
      const btn = buttonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const preferredW = Math.max(180, rect.width);
      const maxViewportW = Math.max(180, window.innerWidth - 32);
      const menuWidth = Math.min(preferredW, maxViewportW);

      let left = rect.left;
      const minLeft = 16;
      const maxLeft = Math.max(minLeft, window.innerWidth - menuWidth - 16);

      if (left > maxLeft) left = maxLeft;
      if (left < minLeft) left = minLeft;

      setMenuStyle({
        position: "fixed",
        top: rect.bottom + 8,
        left,
        width: menuWidth,
        zIndex: 9999,
      });
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", updatePosition);
      updatePosition();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, onToggle]);

  const selectedOption = options.find((o) => o.value === value);
  const isActive = value !== "all";
  const displayText = isActive ? selectedOption?.label : label;

  return (
    <div className="relative flex-shrink-0">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => onToggle()}
        className={`
          inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium
          transition-all duration-200 ease-out whitespace-nowrap cursor-pointer
          ${
            isOpen
              ? "border-2 border-black bg-white text-slate-900"
              : isActive
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:shadow-sm"
          }
        `}
      >
        <span className="hidden sm:inline">{displayText}</span>
        <span className="inline sm:hidden text-xs">
          {label === "College" ? "🏫" : label === "Stream" ? "📚" : "⭐"}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          } ${isActive ? "text-slate-300" : "text-slate-400"}`}
        />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            style={menuStyle}
            className="bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-[9999] overflow-hidden"
          >
            {options.map((option) => (
              <button
                type="button"
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  onToggle();
                }}
                className={`
                  w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer
                  ${
                    value === option.value
                      ? "bg-slate-100 text-slate-900 font-medium"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}

/* ==================== PAGINATION ==================== */

function SimplePagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-4 py-2 rounded-lg bg-white border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
      >
        Previous
      </button>
      <span className="px-4 py-2 text-sm text-slate-600">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-lg bg-white border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
      >
        Next
      </button>
    </div>
  );
}

/* ==================== MENTOR CARD ==================== */

function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <div className="group cursor-pointer">
      <div
        className="
        relative rounded-[24px] overflow-hidden
        bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]
        transition-all duration-500
        hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:scale-[1.01]
        border border-gray-100
      "
      >
        {/* Image */}
        <div className="relative h-[280px] overflow-hidden">
          {mentor.image ? (
            <Image
              src={mentor.image}
              alt={mentor.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-900 via-violet-500 to-pink-400 flex items-center justify-center">
              <span className="text-6xl font-bold text-white">
                {mentor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

          {/* Verified Badge */}
          {mentor.verified && (
            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-primary-900 via-violet-500 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
          )}

          {/* Location Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
            <svg
              className="w-3.5 h-3.5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-xs font-medium text-gray-700">
              {mentor.location}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="px-6 pt-5 pb-6">
          <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
            {mentor.name}
          </h3>

          <p className="text-[15px] text-gray-700 mt-1 font-medium">
            {mentor.college}
          </p>

          <p className="text-sm text-gray-500 mt-0.5">
            {mentor.course} • {mentor.year}
          </p>

          {/* Stats Pills */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-full">
              <svg
                className="w-3.5 h-3.5 text-amber-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-semibold text-amber-700">
                {mentor.rating}
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full">
              <svg
                className="w-3.5 h-3.5 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-xs font-semibold text-blue-700">
                {mentor.sessions}
              </span>
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/mentor/${mentor.id}`}
            className="
              block w-full mt-5 py-3 rounded-xl text-center
              bg-gray-900 text-white text-[15px]
              font-semibold
              transition-all duration-300
              hover:bg-black
            "
          >
            Schedule Session
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ==================== MAIN PAGE ==================== */

export default function FindMentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [page, setPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const data = await getMentors();
        setMentors(data);
      } catch (err) {
        setError("Failed to load mentors");
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Generate dynamic filter options from mentors data
  const collegeOptions = [
    { value: "all", label: "All Colleges" },
    ...Array.from(
      new Set(mentors.map((m) => m.college).filter((c) => c !== "Not specified"))
    )
      .sort()
      .map((college) => ({ value: college, label: college })),
  ];

  const specialtyOptions = [
    { value: "all", label: "All Specialties" },
    ...Array.from(
      new Set(mentors.flatMap((m) => m.specialties).filter((s) => s))
    )
      .sort()
      .map((specialty) => ({ value: specialty, label: specialty })),
  ];

  const sortOptions = [
    { value: "rating", label: "Highest Rated" },
    { value: "sessions", label: "Most Sessions" },
    { value: "price_low", label: "Price: Low → High" },
    { value: "price_high", label: "Price: High → Low" },
  ];

  // Filter and sort mentors
  const filteredMentors = mentors
    .filter((mentor) => {
      const search = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !search ||
        mentor.name.toLowerCase().includes(search) ||
        mentor.college.toLowerCase().includes(search) ||
        mentor.course.toLowerCase().includes(search);

      const matchesCollege =
        collegeFilter === "all" ||
        mentor.college.toLowerCase().includes(collegeFilter.toLowerCase());

      const matchesSpecialty =
        specialtyFilter === "all" ||
        mentor.specialties.some((specialty) =>
          specialty.toLowerCase().includes(specialtyFilter.toLowerCase())
        );

      return matchesSearch && matchesCollege && matchesSpecialty;
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
  }, [searchTerm, collegeFilter, specialtyFilter, sortBy]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setCollegeFilter("all");
    setSpecialtyFilter("all");
    setSortBy("rating");
  };

  const activeFiltersCount =
    (collegeFilter !== "all" ? 1 : 0) + (specialtyFilter !== "all" ? 1 : 0);

  const totalPages = Math.ceil(filteredMentors.length / MENTORS_PER_PAGE);
  const pagedMentors = filteredMentors.slice(
    (page - 1) * MENTORS_PER_PAGE,
    page * MENTORS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Header with Glassmorphism */}
       <header className="fixed top-20 left-0 right-0 z-40 flex justify-center px-4 pt-4">
            <div
              className={`w-full max-w-6xl transition-all duration-700 ease-out rounded-3xl ${
                isScrolled
                  ? "backdrop-blur-3xl bg-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] border border-white/50"
                  : "backdrop-blur-2xl bg-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/60"
              }`}
              style={{
                backdropFilter: "blur(24px) saturate(200%)",
                WebkitBackdropFilter: "blur(24px) saturate(200%)",
              }}
            >
              <div className="px-6 lg:px-8 py-6">
                {/* Title Row */}
                <div className="mb-0">
                  {/* <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                    Find a{" "}
                    <span className="bg-gradient-to-r from-blue-600 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                      Mentor
                    </span>
                  </h1> */}
                  {/* <p className="text-slate-600 mt-2 text-sm">
                    {filteredMentors.length} mentors available
                  </p> */}
                </div>
    
                {/* Filter Bar with Search - single line on desktop, stacked on mobile */}
                <div className="flex flex-col sm:flex-row items-center justify-center">
                  <div className="w-full flex flex-col sm:flex-row items-center gap-4">
                    {/* Filters (compact on small screens) */}
                    <div className="flex items-center gap-3 flex-shrink-0 overflow-x-auto sm:overflow-visible pb-2 -mb-2 sm:pb-0 sm:mb-0">
                      <FilterChip
                        label="College"
                        value={collegeFilter}
                        options={collegeOptions}
                        onChange={setCollegeFilter}
                        isOpen={openDropdown === "college"}
                        onToggle={() =>
                          setOpenDropdown(
                            openDropdown === "college" ? null : "college"
                          )
                        }
                      />
                      <FilterChip
                        label="Stream"
                        value={specialtyFilter}
                        options={specialtyOptions}
                        onChange={setSpecialtyFilter}
                        isOpen={openDropdown === "specialty"}
                        onToggle={() =>
                          setOpenDropdown(
                            openDropdown === "specialty" ? null : "specialty"
                          )
                        }
                      />

                      <div className="h-5 w-px bg-slate-300/50 mx-1 flex-shrink-0" />

                      <FilterChip
                        label="Sort"
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
                          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white/70 rounded-full transition-colors whitespace-nowrap flex-shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Clear all</span>
                        </button>
                      )}
                    </div>
    
                    {/* Search - on mobile it sits below filters; on sm+ it stays to the right */}
                    <div className="flex-1 min-w-0 mt-3 sm:mt-0">
                      <div className="relative w-full sm:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                          type="text"
                          placeholder="Search mentors..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-11 pr-10 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                          style={{
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                          }}
                        />
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white/70 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-64 sm:pt-56 pb-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse" />
            <p className="text-slate-500 text-sm">Loading mentors...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        ) : filteredMentors.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {pagedMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
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
              Try adjusting your search or filters to find what you're looking
              for.
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
