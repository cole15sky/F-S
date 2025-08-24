import React, { createContext, useState, useEffect, useContext } from "react";
import authService from "../service/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on mount
  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser?.user || null); // safe access
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkCurrentUser();
  }, []);

  const login = async ({ email, password }) => {
    const data = await authService.login(email, password);
    setUser(data.user || null);
    return data;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const signup = async (userData) => {
    const data = await authService.signup(userData);
    setUser(data.user || null);
    return data;
  };

  const value = { user, login, logout, signup, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
