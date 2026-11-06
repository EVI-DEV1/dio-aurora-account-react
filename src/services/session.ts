import { DEMO_PROFILE, type Profile } from "./auth";
export const SESSION_KEY = "aurora.account.session.v1";
const LIFETIME = 8 * 60 * 60 * 1000;
type Store = Pick<Storage, "getItem" | "setItem" | "removeItem">;
export function readSession(storage: Store, now = Date.now()): Profile | null {
  try {
    const raw = storage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data: unknown = JSON.parse(raw);
    if (typeof data !== "object" || data === null) return null;
    const item = data as Record<string, unknown>;
    if (
      item.version !== 1 ||
      typeof item.expiresAt !== "number" ||
      item.expiresAt <= now ||
      item.expiresAt > now + LIFETIME ||
      typeof item.user !== "object" ||
      item.user === null
    )
      return null;
    const user = item.user as Record<string, unknown>;
    if (
      user.id !== DEMO_PROFILE.id ||
      user.name !== DEMO_PROFILE.name ||
      user.email !== DEMO_PROFILE.email ||
      user.joined !== DEMO_PROFILE.joined
    )
      return null;
    return { ...DEMO_PROFILE };
  } catch {
    return null;
  }
}
export function saveSession(
  storage: Store,
  user: Profile,
  now = Date.now(),
): boolean {
  try {
    storage.setItem(
      SESSION_KEY,
      JSON.stringify({ version: 1, user, expiresAt: now + LIFETIME }),
    );
    return true;
  } catch {
    return false;
  }
}
export function clearSession(storage: Store): boolean {
  try {
    storage.removeItem(SESSION_KEY);
    return true;
  } catch {
    return false;
  }
}
