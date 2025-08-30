import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("/api/profile")
        .then((res) => {
          setUser(res.data.data);
          const currentPath = window.location.pathname;
          if (["/login", "/register"].includes(currentPath)) {
            router.visit("/");
          }
        })
        .catch(() => setUser(null));
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await axios.post("/api/login", { email, password });
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    router.visit("/");
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await axios.post("/api/register", { name, email, password });
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    router.visit("/");
  };

  const logout = async () => {
    await axios.post("/api/logout");
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    router.visit("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
