"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Linkedin,
  Calendar,
  Clock,
  DollarSign,
  Star,
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
  Users,
  Award,
  CheckCircle,
  Video,
  ChevronDown,
  ChevronRight,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  History,
  Eye,
  Download,
  Search,
  Filter,
  ChevronUp,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { /* getUser, saveUser, isAuthenticated */ } from "@/lib/auth";
import { useAuthStore } from '@/lib/useAuthStore'
import api, { API_GET_MENTORS, API_GET_SLOTS } from '@/lib/api'
import { Button } from "@/components/ui/button";

type AvailabilitySlot = {
  id: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  booked: boolean;
};

type BookingHistory = {
  id: string;
  menteeName: string;
  menteeEmail: string;
  menteePhone: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "completed" | "upcoming" | "cancelled";
  amount: number;
  meetingLink?: string;
  notes?: string;
};

interface MentorProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  role: "mentor";
  brief?: string;
  expertise?: string[];
  session_cost?: number;
  total_sessions?: number;
  rating?: number;
  linkedin?: string;
  availability_slots?: AvailabilitySlot[];
  booking_history?: BookingHistory[];
}

// Note: This page uses backend data only for the mentor profile. No sample/demo fallback data or localStorage persistence.

function formatDate(dateString: string): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

function getTimeDuration(startTime: string, endTime: string): string {
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;
  const durationMinutes = endTotalMinutes - startTotalMinutes;

  return `${durationMinutes} minutes`;
}

function getStatusColor(status: BookingHistory["status"]) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "upcoming":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function getStatusIcon(status: BookingHistory["status"]) {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4" />;
    case "upcoming":
      return <Calendar className="h-4 w-4" />;
    case "cancelled":
      return <X className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
}

type ActiveTab = "profile" | "availability" | "history";
type DateFilter = "all" | "today" | "week" | "month" | "year" | "custom";
type StatusFilter = "all" | "completed" | "upcoming" | "cancelled";

interface FilterState {
  date: DateFilter;
  status: StatusFilter;
  customStart: string;
  customEnd: string;
  search: string;
}

export default function MentorProfilePage() {
  const router = useRouter();
  const params = useParams();
  const profileId = params.id as string;

  const [profile, setProfile] = useState<MentorProfile | null>(null);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [bookings, setBookings] = useState<BookingHistory[]>([]);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
  const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>(
    {}
  );

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    date: "all",
    status: "all",
    customStart: "",
    customEnd: "",
    search: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // New slot form state
  const [newSlot, setNewSlot] = useState<Partial<AvailabilitySlot>>({
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "10:00",
    booked: false,
  });

  useEffect(() => {
    // Require auth via zustand store
    const currentUser = useAuthStore.getState().user
    if (!currentUser) {
      router.push('/signin')
      return
    }

    const fetchProfile = async () => {
      try {
        // Prefer authenticated user from zustand for lookup
        const authUser = useAuthStore.getState().user
        const lookupBy = authUser?.username || authUser?.id || profileId

        // try to fetch by username/identifier
        let res = await api.get(API_GET_MENTORS, { params: { username: lookupBy } })
        let data: any = res.data
        // Normalize paginated wrapper
        let payload: any = null
        if (data && Array.isArray(data.results)) payload = data.results.length ? data.results[0] : null
        else if (Array.isArray(data)) payload = data.length ? data[0] : null
        else payload = data

        // If payload is not found, try fetching by mentor_id when lookupBy looks numeric
        if (!payload && !isNaN(Number(lookupBy))) {
          res = await api.get(API_GET_MENTORS, { params: { mentor_id: lookupBy } })
          data = res.data
          if (data && Array.isArray(data.results)) payload = data.results.length ? data.results[0] : null
          else if (Array.isArray(data)) payload = data.length ? data[0] : null
          else payload = data
        }

        if (payload) {
          const profileData: MentorProfile = {
            id: String(payload.mentor_id || payload.id || payload._id || payload.user_id || profileId),
            name: `${payload.first_name || payload.firstName || ''} ${payload.last_name || payload.lastName || ''}`.trim() || payload.username || payload.name || '',
            email: payload.email || payload.user_email || '',
            username: payload.username || payload.user_name || '',
            role: 'mentor',
            brief: payload.brief || payload.bio || '',
            expertise: payload.skills || payload.expertise || [],
            session_cost: payload.session_cost || payload.sessionCost || null,
            total_sessions: payload.total_sessions || payload.totalSessions || 0,
            rating: payload.rating || null,
            linkedin: payload.linkedin || null,
            availability_slots: payload.availability_slots || payload.slots || [],
            booking_history: payload.booking_history || payload.bookings || [],
          }

          setProfile(profileData)
          // Fetch canonical slots from Availability API
          try {
            const slotRes = await api.get(API_GET_SLOTS, { params: { MentorId: Number(profileData.id), offset: 0, limit: 200 } })
            const slotData: any = slotRes.data
            let slotsPayload: any = null
            if (slotData && Array.isArray(slotData.results)) slotsPayload = slotData.results
            else if (slotData && Array.isArray(slotData.data)) slotsPayload = slotData.data
            else if (Array.isArray(slotData)) slotsPayload = slotData
            else slotsPayload = []

            const normalizedSlots: AvailabilitySlot[] = Array.isArray(slotsPayload)
              ? slotsPayload.map((s: any) => ({
                  id: String(s.slot_id || s.SlotId || s.SlotId || s.id || Date.now()),
                  date: s.slot_date || s.SlotDate || s.date || s.slotDate || '',
                  startTime: (s.start_time || s.StartTime || s.startTime || '').slice(0,5),
                  endTime: (s.end_time || s.EndTime || s.endTime || '').slice(0,5),
                  booked: (s.status && String(s.status).toLowerCase() === 'booked') || s.booked === true,
                }))
              : []

            setSlots(normalizedSlots)
          } catch (e) {
            console.error('Failed to fetch availability slots', e)
            setSlots(profileData.availability_slots || [])
          }
          setBookings(profileData.booking_history || [])
        } else {
          // No profile found from backend — show not found
          setProfile(null)
          setSlots([])
          setBookings([])
        }
      } catch (e) {
        // network or mapping error — set not found to avoid showing demo data
        console.error('Failed to fetch mentor profile', e)
        setProfile(null)
        setSlots([])
        setBookings([])
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [profileId, router]);

  // Filter and search bookings
  const filteredBookings = useMemo(() => {
    let result = bookings;

    // Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (booking) =>
          booking.menteeName.toLowerCase().includes(query) ||
          booking.menteeEmail.toLowerCase().includes(query) ||
          booking.menteePhone.includes(query) ||
          (booking.notes && booking.notes.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (filters.status !== "all") {
      result = result.filter((booking) => booking.status === filters.status);
    }

    // Date filter
    const now = new Date();
    switch (filters.date) {
      case "today":
        result = result.filter((booking) => {
          const bookingDate = new Date(booking.date);
          return bookingDate.toDateString() === now.toDateString();
        });
        break;
      case "week":
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        result = result.filter((booking) => new Date(booking.date) >= weekAgo);
        break;
      case "month":
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        result = result.filter((booking) => new Date(booking.date) >= monthAgo);
        break;
      case "year":
        const yearAgo = new Date(now);
        yearAgo.setFullYear(now.getFullYear() - 1);
        result = result.filter((booking) => new Date(booking.date) >= yearAgo);
        break;
      case "custom":
        if (filters.customStart && filters.customEnd) {
          result = result.filter((booking) => {
            const bookingDate = new Date(booking.date);
            const startDate = new Date(filters.customStart);
            const endDate = new Date(filters.customEnd);
            return bookingDate >= startDate && bookingDate <= endDate;
          });
        }
        break;
    }

    return result.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [bookings, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBookings.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBookings, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Toggle date expansion
  const toggleDate = (date: string) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  // Expand all dates
  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    Object.keys(slotsByDate).forEach((date) => {
      allExpanded[date] = true;
    });
    setExpandedDates(allExpanded);
  };

  // Collapse all dates
  const collapseAll = () => {
    setExpandedDates({});
  };

  // Add new slot
  const addSlot = () => {
    if (!newSlot.date || !newSlot.startTime || !newSlot.endTime) return;
    // POST to Availability API to create slot
    (async () => {
      try {
        const authUser = useAuthStore.getState().user
        const mentorId = Number(authUser?.id || profile?.id)
        const params = new URLSearchParams()
        params.append('MentorId', String(mentorId))
        params.append('SlotDate', String(newSlot.date))
        params.append('StartTime', String(newSlot.startTime))
        params.append('EndTime', String(newSlot.endTime))

        const res = await api.post('/Availability/v1/Slots', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        // Try to use server-returned slot, otherwise optimistic insert
        const created = res.data || null
        const newId = created && (created.slot_id || created.SlotId || created.id) ? String(created.slot_id || created.SlotId || created.id) : Date.now().toString()
        const slot: AvailabilitySlot = {
          id: newId,
          date: String(newSlot.date),
          startTime: String(newSlot.startTime),
          endTime: String(newSlot.endTime),
          booked: false,
        }

        setSlots((prev) =>
          [...prev, slot].sort(
            (a, b) =>
              a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime)
          )
        )
        setNewSlot({
          date: new Date().toISOString().split("T")[0],
          startTime: "09:00",
          endTime: "10:00",
          booked: false,
        })
      } catch (e) {
        console.error('Failed to create slot', e)
      }
    })()
  };

  // Remove slot (DELETE)
  const removeSlot = (slotId: string) => {
    (async () => {
      try {
        const params = new URLSearchParams()
        params.append('SlotId', String(slotId))
        await api.delete('/Availability/v1/Slots', { data: params, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        setSlots((prev) => prev.filter((slot) => slot.id !== slotId))
      } catch (e) {
        console.error('Failed to delete slot', e)
      }
    })()
  };

  // Duplicate slot (POST new slot with same times)
  // duplicateSlot removed: mentors should not be able to duplicate slots from UI

  // toggleSlotBooking removed: mentors cannot mark slots booked; booking is performed by mentees via booking flow

  const updateProfileField = (field: keyof MentorProfile, value: any) =>
    setProfile((prev) => (prev ? { ...prev, [field]: value } : null));

  const saveProfile = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      const toSave = {
        ...profile,
        availability_slots: slots,
        booking_history: bookings,
      };
      // Optionally persist to central zustand store (no local demo persistence)
      try {
        useAuthStore.getState().setUser(toSave as any)
      } catch {}
      
      setTimeout(() => {
        setSaving(false);
        setIsEditing(false);
        alert("Profile saved successfully!");
      }, 400);
    } catch (e) {
      setSaving(false);
      alert("Failed to save: " + String(e));
    }
  };

  // resetDemo removed: this page no longer exposes demo reset functionality and uses backend data only.

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center p-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Mentor Profile Not Found
          </h1>
          <Button onClick={() => router.push("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  // Group slots by date
  const slotsByDate = slots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, AvailabilitySlot[]>);

  // Sort dates chronologically
  const sortedDates = Object.keys(slotsByDate).sort();

  // Filter bookings by status
  const upcomingBookings = bookings.filter((b) => b.status === "upcoming");
  const completedBookings = bookings.filter((b) => b.status === "completed");
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled");

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        {/* --- Header Section --- */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 mb-8">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg flex-shrink-0">
            {profile.name?.[0]?.toUpperCase() ?? "M"}
          </div>

          {/* Name, Details & Edit Button */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
                {profile.name}
              </h1>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 flex-shrink-0"
              >
                {isEditing ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Edit2 className="h-4 w-4" />
                )}
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-x-3 gap-y-1 mt-2 flex-wrap">
              <div className="text-sm text-gray-600">@{profile.username}</div>
              <div className="text-sm text-gray-400 hidden sm:block">•</div>
              <div className="text-sm text-gray-700">{profile.email}</div>
              <div className="text-sm text-gray-400 hidden sm:block">•</div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Mentor
              </span>
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 p-1 hover:bg-gray-100 rounded-md"
                >
                  <Linkedin className="h-5 w-5 text-blue-600" />
                </a>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap justify-center sm:justify-start mt-4 sm:mt-0">
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="text-sm"
            >
              Back Home
            </Button>
          </div>
        </div>

        {/* --- Tab Navigation --- */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "profile"
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Profile Details
            </button>
            <button
              onClick={() => setActiveTab("availability")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "availability"
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Availability Slots
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "history"
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Booking History
            </button>
          </nav>
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Only visible on Profile tab */}
          {activeTab === "profile" && (
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  About Me
                </h3>
                {isEditing ? (
                  <textarea
                    value={profile.brief || ""}
                    onChange={(e) =>
                      updateProfileField("brief", e.target.value)
                    }
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Tell mentees about your experience and expertise..."
                  />
                ) : (
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {profile.brief || "No bio provided."}
                  </p>
                )}

                {/* Expertise Tags */}
                {profile.expertise && profile.expertise.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Stats Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Mentorship Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Per session</div>
                      <div className="text-xl font-bold text-gray-900">
                        ₹{profile.session_cost || 0}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        Total sessions
                      </div>
                      <div className="text-xl font-bold text-gray-900">
                        {
                          bookings.filter((b) => b.status === "completed")
                            .length
                        }
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Rating</div>
                      <div className="flex items-center gap-1">
                        <span className="text-xl font-bold text-gray-900">
                          {profile.rating || 0}
                        </span>
                        <span className="text-sm text-gray-500">/ 5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div
            className={
              activeTab === "profile" ? "lg:col-span-2" : "lg:col-span-3"
            }
          >
            {/* Profile Details Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">
                    Profile Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) =>
                            updateProfileField("name", e.target.value)
                          }
                          className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <div className="font-medium text-gray-900">
                          {profile.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <div className="font-medium text-gray-900">
                        {profile.email}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Username</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile.username}
                          onChange={(e) =>
                            updateProfileField("username", e.target.value)
                          }
                          className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <div className="font-medium text-gray-900">
                          @{profile.username}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">
                        Session Cost (₹)
                      </label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={profile.session_cost || ""}
                          onChange={(e) =>
                            updateProfileField(
                              "session_cost",
                              Number(e.target.value)
                            )
                          }
                          className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <div className="font-medium text-gray-900">
                          ₹{profile.session_cost || 0}
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm text-gray-500">
                        LinkedIn Profile URL
                      </label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={profile.linkedin || ""}
                          onChange={(e) =>
                            updateProfileField("linkedin", e.target.value)
                          }
                          placeholder="https://linkedin.com/in/your-profile"
                          className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      ) : profile.linkedin ? (
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          View LinkedIn Profile
                        </a>
                      ) : (
                        <div className="text-gray-500 text-sm">
                          Not provided
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Availability Slots Tab */}
            {activeTab === "availability" && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Availability Slots
                      </h3>
                      <p className="text-gray-600">
                        Manage your available time slots for mentorship sessions
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {sortedDates.length > 0 && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={expandAll}
                          >
                            Expand All
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={collapseAll}
                          >
                            Collapse All
                          </Button>
                        </div>
                      )}
                      {!isEditing && (
                        <Button
                          onClick={() => setIsEditing(true)}
                          className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
                        >
                          <Edit2 className="h-4 w-4" /> Manage Slots
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Add New Slot Form */}
                  {isEditing && (
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl mb-8 border border-purple-100">
                      <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                        Add New Slot
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            Date
                          </label>
                          <input
                            type="date"
                            value={newSlot.date}
                            onChange={(e) =>
                              setNewSlot({ ...newSlot, date: e.target.value })
                            }
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            Start Time
                          </label>
                          <input
                            type="time"
                            value={newSlot.startTime}
                            onChange={(e) =>
                              setNewSlot({
                                ...newSlot,
                                startTime: e.target.value,
                              })
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            End Time
                          </label>
                          <input
                            type="time"
                            value={newSlot.endTime}
                            onChange={(e) =>
                              setNewSlot({
                                ...newSlot,
                                endTime: e.target.value,
                              })
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button
                            onClick={addSlot}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 flex items-center gap-2"
                          >
                            <Plus className="h-4 w-4" /> Add Slot
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Slots Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {slots.length}
                          </div>
                          <div className="text-sm text-gray-600">
                            Total Slots
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {slots.filter((s) => !s.booked).length}
                          </div>
                          <div className="text-sm text-gray-600">Available</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Video className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {slots.filter((s) => s.booked).length}
                          </div>
                          <div className="text-sm text-gray-600">Booked</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Collapsible Slots List */}
                  <div className="space-y-3">
                    {slots.length === 0 ? (
                      <div className="text-center py-16 text-gray-500">
                        <Calendar className="h-20 w-20 mx-auto mb-4 text-gray-300" />
                        <p className="text-xl font-medium mb-2">
                          No availability slots set
                        </p>
                        <p className="mb-6">
                          Add your first availability slot to start accepting
                          bookings
                        </p>
                        {isEditing && (
                          <Button
                            onClick={addSlot}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                            size="lg"
                          >
                            <Plus className="h-5 w-5 mr-2" /> Add Your First
                            Slot
                          </Button>
                        )}
                      </div>
                    ) : (
                      sortedDates.map((date) => (
                        <div
                          key={date}
                          className="border border-gray-200 rounded-xl overflow-hidden"
                        >
                          <button
                            onClick={() => toggleDate(date)}
                            className="w-full bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
                          >
                            <div>
                              <h4 className="font-semibold text-gray-900 text-left">
                                {formatDate(date)}
                              </h4>
                              <p className="text-sm text-gray-600 text-left">
                                {slotsByDate[date].length} slot
                                {slotsByDate[date].length !== 1 ? "s" : ""} •
                                {
                                  slotsByDate[date].filter((s) => s.booked)
                                    .length
                                }{" "}
                                booked
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  slotsByDate[date].every((s) => s.booked)
                                    ? "bg-red-100 text-red-800"
                                    : slotsByDate[date].some((s) => s.booked)
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {slotsByDate[date].every((s) => s.booked)
                                  ? "Fully Booked"
                                  : slotsByDate[date].some((s) => s.booked)
                                  ? "Partially Available"
                                  : "Available"}
                              </span>
                              {expandedDates[date] ? (
                                <ChevronDown className="h-5 w-5 text-gray-600" />
                              ) : (
                                <ChevronRight className="h-5 w-5 text-gray-600" />
                              )}
                            </div>
                          </button>

                          {expandedDates[date] && (
                            <div className="divide-y divide-gray-100">
                              {slotsByDate[date].map((slot) => (
                                <div
                                  key={slot.id}
                                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                  <div className="flex items-center space-x-6">
                                    <div
                                      className={`w-3 h-12 rounded-full ${
                                        slot.booked
                                          ? "bg-green-500"
                                          : "bg-purple-500"
                                      }`}
                                    ></div>
                                    <div className="flex items-center space-x-4">
                                      <div className="text-center">
                                        <div className="text-xl font-bold text-gray-900">
                                          {formatTime(slot.startTime)}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                          to {formatTime(slot.endTime)}
                                        </div>
                                      </div>
                                      <div className="w-px h-8 bg-gray-200"></div>
                                      <div>
                                        <div className="text-sm text-gray-600">
                                          Duration
                                        </div>
                                        <div className="font-medium text-gray-900">
                                          {getTimeDuration(
                                            slot.startTime,
                                            slot.endTime
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    {slot.booked ? (
                                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4" />
                                        Booked
                                      </span>
                                    ) : (
                                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                                        Available
                                      </span>
                                    )}
                                    {isEditing && (
                                      <div className="flex space-x-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => removeSlot(slot.id)}
                                          className="text-red-600 hover:text-red-700"
                                          title="Remove slot"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Booking History Tab */}
            {activeTab === "history" && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                        <History className="h-6 w-6 text-purple-600" />
                        Booking History
                      </h3>
                      <p className="text-gray-600">
                        View and manage your mentorship sessions
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Export Report
                      </Button>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {upcomingBookings.length}
                          </div>
                          <div className="text-sm text-gray-600">Upcoming</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {completedBookings.length}
                          </div>
                          <div className="text-sm text-gray-600">Completed</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <X className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {cancelledBookings.length}
                          </div>
                          <div className="text-sm text-gray-600">Cancelled</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            ₹
                            {bookings
                              .filter((b) => b.status === "completed")
                              .reduce((sum, b) => sum + b.amount, 0)}
                          </div>
                          <div className="text-sm text-gray-600">
                            Total Revenue
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Filters and Search */}
                  <div className="bg-gray-50 p-4 rounded-xl mb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      {/* Search */}
                      <div className="lg:col-span-2">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Search
                        </label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search by name, email, phone, or notes..."
                            value={filters.search}
                            onChange={(e) =>
                              setFilters((prev) => ({
                                ...prev,
                                search: e.target.value,
                              }))
                            }
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Status Filter */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Status
                        </label>
                        <select
                          value={filters.status}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              status: e.target.value as StatusFilter,
                            }))
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="all">All Status</option>
                          <option value="upcoming">Upcoming</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      {/* Date Filter */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Date Range
                        </label>
                        <select
                          value={filters.date}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              date: e.target.value as DateFilter,
                            }))
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="all">All Time</option>
                          <option value="today">Today</option>
                          <option value="week">Last 7 Days</option>
                          <option value="month">Last 30 Days</option>
                          <option value="year">Last Year</option>
                          <option value="custom">Custom Range</option>
                        </select>
                      </div>
                    </div>

                    {/* Custom Date Range */}
                    {filters.date === "custom" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={filters.customStart}
                            onChange={(e) =>
                              setFilters((prev) => ({
                                ...prev,
                                customStart: e.target.value,
                              }))
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            End Date
                          </label>
                          <input
                            type="date"
                            value={filters.customEnd}
                            onChange={(e) =>
                              setFilters((prev) => ({
                                ...prev,
                                customEnd: e.target.value,
                              }))
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button
                            variant="outline"
                            onClick={() =>
                              setFilters((prev) => ({
                                ...prev,
                                customStart: "",
                                customEnd: "",
                              }))
                            }
                            className="w-full"
                          >
                            Clear Dates
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Filter Summary */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-gray-600">
                        Showing {filteredBookings.length} of {bookings.length}{" "}
                        bookings
                        {filters.search && (
                          <span>
                            {" "}
                            for "<strong>{filters.search}</strong>"
                          </span>
                        )}
                      </div>
                      {(filters.search ||
                        filters.status !== "all" ||
                        filters.date !== "all") && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setFilters({
                              date: "all",
                              status: "all",
                              customStart: "",
                              customEnd: "",
                              search: "",
                            })
                          }
                        >
                          Clear All Filters
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Upcoming Sessions */}
                  {upcomingBookings.length > 0 && filters.status === "all" && (
                    <div className="mb-8">
                      <h4 className="font-semibold text-gray-900 mb-4 text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        Upcoming Sessions ({upcomingBookings.length})
                      </h4>
                      <div className="space-y-3">
                        {upcomingBookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="border border-blue-200 rounded-xl p-4 bg-blue-50"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-3 h-12 bg-blue-500 rounded-full"></div>
                                  <div>
                                    <div className="font-semibold text-gray-900">
                                      {booking.menteeName}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {booking.menteeEmail}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {booking.menteePhone}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="font-bold text-gray-900">
                                    {formatDate(booking.date)}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {formatTime(booking.startTime)} -{" "}
                                    {formatTime(booking.endTime)}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  Upcoming
                                </span>
                                {booking.meetingLink && (
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <Video className="h-4 w-4 mr-2" />
                                    Join Meeting
                                  </Button>
                                )}
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Booking History Table */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900 text-lg">
                        Session History{" "}
                        {filteredBookings.length > 0 &&
                          `(${filteredBookings.length})`}
                      </h4>
                      {filteredBookings.length > 0 && (
                        <div className="text-sm text-gray-600">
                          Page {currentPage} of {totalPages}
                        </div>
                      )}
                    </div>

                    {filteredBookings.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <Filter className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium mb-2">
                          No bookings found
                        </p>
                        <p>Try adjusting your filters or search terms</p>
                      </div>
                    ) : (
                      <>
                        {/* Scrollable Table Container */}
                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Mentee
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Date & Time
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Contact
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Status
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Amount
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {paginatedBookings.map((booking) => (
                                  <tr
                                    key={booking.id}
                                    className="hover:bg-gray-50 transition-colors"
                                  >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div>
                                        <div className="font-medium text-gray-900 flex items-center gap-2">
                                          <User className="h-4 w-4 text-gray-400" />
                                          {booking.menteeName}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                          {booking.menteeEmail}
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div>
                                        <div className="text-sm font-medium text-gray-900">
                                          {formatDate(booking.date)}
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                          <Clock className="h-3 w-3" />
                                          {formatTime(booking.startTime)} -{" "}
                                          {formatTime(booking.endTime)}
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-900 flex items-center gap-1">
                                        <Phone className="h-3 w-3" />
                                        {booking.menteePhone}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span
                                        className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(
                                          booking.status
                                        )}`}
                                      >
                                        {getStatusIcon(booking.status)}
                                        {booking.status
                                          .charAt(0)
                                          .toUpperCase() +
                                          booking.status.slice(1)}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm font-medium text-gray-900">
                                        ₹{booking.amount}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="flex items-center gap-2"
                                        >
                                          <Eye className="h-3 w-3" />
                                          View
                                        </Button>
                                        {booking.meetingLink &&
                                          booking.status === "upcoming" && (
                                            <Button
                                              size="sm"
                                              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                                            >
                                              <Video className="h-3 w-3" />
                                              Join
                                            </Button>
                                          )}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                          <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-700">
                              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                              {Math.min(
                                currentPage * itemsPerPage,
                                filteredBookings.length
                              )}{" "}
                              of {filteredBookings.length} entries
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setCurrentPage((prev) =>
                                    Math.max(prev - 1, 1)
                                  )
                                }
                                disabled={currentPage === 1}
                              >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                              </Button>

                              {/* Page Numbers */}
                              <div className="flex items-center gap-1">
                                {Array.from(
                                  { length: Math.min(5, totalPages) },
                                  (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                      pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                      pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                      pageNum = totalPages - 4 + i;
                                    } else {
                                      pageNum = currentPage - 2 + i;
                                    }

                                  return (
                                    <Button
                                      key={pageNum}
                                      variant={currentPage === pageNum ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => setCurrentPage(pageNum)}
                                      className={currentPage === pageNum ? "bg-purple-600 text-white" : ""}
                                    >
                                      {pageNum}
                                    </Button>
                                  );
                                })}
                              </div>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                  )
                                }
                                disabled={currentPage === totalPages}
                              >
                                Next
                                <ChevronRightIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Save Button for Edit Mode */}
            {isEditing && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={saveProfile}
                    disabled={saving}
                    className="bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 text-lg"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="px-8 py-3 text-lg"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
