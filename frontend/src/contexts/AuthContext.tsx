import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../services/api";

interface User {
  id: number;
  email: string;
  name?: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Tenta carregar usuário atual ao montar o contexto (exemplo: com refresh token)
  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  // Função para login
  async function login(email: string, password: string) {
    const response = await api.post("/auth/login", { email, password });
    const { accessToken, user } = response.data;

    localStorage.setItem("accessToken", accessToken);
    setUser(user);
  }

  // Função para logout
  function logout() {
    localStorage.removeItem("accessToken");
    setUser(null);
    // Também pode chamar api.post('/auth/logout') para limpar refresh token cookie
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
