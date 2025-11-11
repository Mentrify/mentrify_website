// Authentication utilities

export interface User {
  id: string;
  name: string;
  email: string;
  role: "mentor" | "user";
  total_sessions?: number;
  rating?: number;
  session_cost?: number;
}

// This is a stub implementation
// In production, this would connect to your actual auth system

let currentUser: User | null = null;

export function getUser(): User | null {
  return currentUser;
}

export function setUser(user: User | null): void {
  currentUser = user;
}

export function isAuthenticated(): boolean {
  return currentUser !== null;
}

export function logout(): void {
  currentUser = null;
}
