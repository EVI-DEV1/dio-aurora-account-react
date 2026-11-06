import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { authenticate, type Profile } from "./services/auth";
import {
  clearSession,
  readSession,
  saveSession,
  SESSION_KEY,
} from "./services/session";
type Auth = {
  user: Profile | null;
  warning: string;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};
const AuthContext = createContext<Auth | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(() => {
    try {
      return readSession(window.localStorage);
    } catch {
      return null;
    }
  });
  const [warning, setWarning] = useState("");
  useEffect(() => {
    function sync(event: StorageEvent) {
      if (event.key === SESSION_KEY || event.key === null) {
        try {
          setUser(readSession(window.localStorage));
        } catch {
          setUser(null);
        }
      }
    }
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  function login(email: string, password: string) {
    const profile = authenticate(email, password);
    if (!profile) return false;
    let saved = false;
    try {
      saved = saveSession(window.localStorage, profile);
    } catch {}
    setWarning(
      saved
        ? ""
        : "Seu navegador bloqueou o armazenamento. O acesso ficará ativo somente nesta aba.",
    );
    setUser(profile);
    return true;
  }
  function logout() {
    let cleared = false;
    try {
      cleared = clearSession(window.localStorage);
    } catch {}
    setUser(null);
    setWarning(
      cleared
        ? ""
        : "Não foi possível limpar o armazenamento. Para encerrar também o acesso salvo, limpe os dados deste site no navegador.",
    );
  }
  return (
    <AuthContext.Provider value={{ user, warning, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthProvider ausente");
  return auth;
}
