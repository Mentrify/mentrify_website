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
    const response = await api.get(API_GET_MENTORS, { params: { status: 'active'}});

    const results = response.data?.results || [];

    const mappedMentors: Mentor[] = results.map((mentor: any) => ({
      id: mentor.id,

      // combine first + last name
      name: `${mentor.first_name ?? ""} ${mentor.last_name ?? ""}`.trim(),

      college: mentor.organization ?? "Not specified",

      course: mentor.course ?? "Not specified",

      year: mentor.year_of_study
        ? `Year ${mentor.year_of_study}`
        : "Not specified",

      // backend does not provide rating yet → default
      rating: 4.5,

      // backend does not provide sessions → default
      sessions: 0,

      price: mentor.session_cost ?? 0,

      // backend has no location field → default for now
      location: "India",

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
