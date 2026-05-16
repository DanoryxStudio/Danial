import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('danoryx_token');
    if (token) {
      try {
        const response = await authAPI.getProfile();
        setUser(response.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('danoryx_token');
        setUser(null);
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  };

  const login = async (email, password, rememberMe) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;
      
      if (rememberMe) {
        localStorage.setItem('danoryx_token', token);
      } else {
        sessionStorage.setItem('danoryx_token', token);
      }
      
      setUser(user);
      setIsAuthenticated(true);
      toast.success('Welcome back to Danoryx Studio!');
      return { success: true, user };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await authAPI.signup(userData);
      const { token, user } = response.data;
      
      localStorage.setItem('danoryx_token', token);
      setUser(user);
      setIsAuthenticated(true);
      toast.success(`Welcome to Danoryx Studio! Your ID: ${user.userId}`);
      return { success: true, user };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('danoryx_token');
    sessionStorage.removeItem('danoryx_token');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const forgotPassword = async (email) => {
    try {
      await authAPI.forgotPassword({ email });
      toast.success('Password reset instructions sent to your email');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset email');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    forgotPassword,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
