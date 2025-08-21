import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await apiClient.get('/users/me'); // A Devise route to get current user
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiClient.post('/users/sign_in', { user: credentials });
      setUser(response.data.user); // Assuming your Devise controller returns user data
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.delete('/users/sign_out');
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const signup = async (userData) => {
    try {
      const response = await apiClient.post('/users', { user: userData });
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);