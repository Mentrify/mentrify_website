import { create } from 'zustand';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  username?: string;
  role: "mentor" | "user";
  total_sessions?: number;
  rating?: number;
  session_cost?: number;
  brief?: string;
  expertise?: string[];
  linkedin?: string;
}

interface AuthStore {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
