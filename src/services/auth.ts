export type Profile = {
  id: string;
  name: string;
  email: string;
  joined: string;
};
export const DEMO_EMAIL = "demo@aurora.app";
export const DEMO_PASSWORD = "Aurora2026!";
export const DEMO_PROFILE: Profile = {
  id: "aurora-001",
  name: "Marina Costa",
  email: DEMO_EMAIL,
  joined: "2024-03-18",
};
export function authenticate(email: string, password: string): Profile | null {
  return email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD
    ? { ...DEMO_PROFILE }
    : null;
}
