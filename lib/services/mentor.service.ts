import api from "@/lib/api";
import { API_GET_MENTORS } from "@/lib/api";

export interface Mentor {
  id: number;
  name: string;
  college: string;
  course: string;
  year: string;
  rating: number;
  sessions: number;
  price: number;
  location: string;
  specialties: string[];
  verified: boolean;
  image?: string | null;
}

export const getMentors = async (): Promise<Mentor[]> => {
  try {
    const response = await api.get(API_GET_MENTORS, { params: { status: 'active', page_size: 100 } });

    const payload = response.data?.data ?? response.data ?? response;
    let results: any[] = [];
    if (Array.isArray(payload)) {
      results = payload;
    } else if (Array.isArray(payload?.results)) {
      results = payload.results;
    } else if (Array.isArray(payload?.data)) {
      results = payload.data;
    } else if (Array.isArray(response.data)) {
      results = response.data;
    }

    const mappedMentors: Mentor[] = results.map((mentor: any) => ({
      id: mentor.mentor_id,

      name: `${mentor.first_name ?? ""} ${mentor.last_name ?? ""}`.trim(),

      college: mentor.organization ?? mentor.affiliation ?? "Not specified",

      course: mentor.current_role ?? "Not specified",

      year: mentor.year_of_study
        ? `Year ${mentor.year_of_study}`
        : "Not specified",

      rating: typeof mentor.rating === "number" ? mentor.rating : 4.5,

      sessions: typeof mentor.sessions === "number" ? mentor.sessions : 0,

      price: mentor.session_cost ?? 0,

      location: mentor.organization ?? mentor.affiliation ?? "India",

      specialties: mentor.skills ?? [],

      verified: mentor.status === "active",

      image: mentor.image ?? null,
    }));

    return mappedMentors;
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return [];
  }
};
