import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

function safeDecode(token) {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

function normalizeRoles(decoded) {
  const roles = decoded?.roles;
  if (Array.isArray(roles)) return roles;
  if (typeof roles === "string") return [roles];
  return [];
}

function isExpired(decoded) {
  // exp est en secondes dans JWT
  if (!decoded?.exp) return false;
  return decoded.exp * 1000 < Date.now();
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const [user, setUser] = useState(() => {
    const t = localStorage.getItem("token");
    if (!t) return null;
    const decoded = safeDecode(t);
    if (!decoded || isExpired(decoded)) return null;
    return { ...decoded, roles: normalizeRoles(decoded) };
  });

  useEffect(() => {
    const t = token || localStorage.getItem("token");

    if (!t) {
      localStorage.removeItem("token");
      setUser(null);
      return;
    }

    localStorage.setItem("token", t);

    const decoded = safeDecode(t);
    if (!decoded || isExpired(decoded)) {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      return;
    }

    setUser({ ...decoded, roles: normalizeRoles(decoded) });
  }, [token]);

  const login = (newToken) => {
    if (!newToken) return;
    localStorage.setItem("token", newToken); // ✅ stock direct
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const hasRole = (role) => {
    const roles = user?.roles || [];
    return roles.includes(role);
  };

  // ✅ ICI la correction : dépendances [token, user] (PAS _toggle)
  const value = useMemo(
    () => ({
      token: token || localStorage.getItem("token"),
      user,
      login,
      logout,
      hasRole,
      isAuthenticated: !!(token || localStorage.getItem("token")),
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
