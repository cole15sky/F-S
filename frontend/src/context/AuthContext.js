import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../service/authService';
import apiClient from '../apiClient'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkCurrentUser = async () => {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    checkCurrentUser();
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials.email, credentials.password);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const signup = async (userData) => {
    const data = await authService.signup(userData);
    setUser(data.user);
    return data;
  };

  const value = { user, login, logout, signup, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);