import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usuarioApi } from "./api";

export type User = { id?: number; name: string; email: string; isAdmin?: boolean };

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin";

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const SESSION_KEY = "calmavera:session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (u: User) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setUser(u);
  };

  const register: AuthContextValue["register"] = async (name, email, password) => {
    try {
      const created = await usuarioApi.criar({ nome: name, email, senha: password });
      persist({ id: created.id, name: created.nome ?? name, email: created.email ?? email });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
  };

  const login: AuthContextValue["login"] = async (email, password) => {
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      persist({ id: 0, name: "Administrador", email: ADMIN_EMAIL, isAdmin: true });
      return { ok: true };
    }
    try {
      const res = await usuarioApi.login({ email, senha: password });
      persist({ id: res.id, name: res.nome, email: res.email });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}