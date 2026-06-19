import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "crm_auth_user";

// Konto testowe wbudowane w panel logowania.
const ADMIN_ACCOUNT = {
  username: "admin",
  password: "admin123",
  name: "Administrator",
  role: "Administrator",
  email: "admin@crm.pl",
  avatar: "AD",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const login = (username, password) => {
    const normalized = username.trim().toLowerCase();
    if (normalized === ADMIN_ACCOUNT.username && password === ADMIN_ACCOUNT.password) {
      const loggedInUser = {
        username: ADMIN_ACCOUNT.username,
        name: ADMIN_ACCOUNT.name,
        role: ADMIN_ACCOUNT.role,
        email: ADMIN_ACCOUNT.email,
        avatar: ADMIN_ACCOUNT.avatar,
      };
      setUser(loggedInUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser));
      return { success: true };
    }
    return { success: false, error: "Nieprawidłowy login lub hasło." };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateUser = (partial) => {
    setUser((prev) => {
      const updated = { ...prev, ...partial };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth musi być używane wewnątrz AuthProvider");
  return ctx;
};
