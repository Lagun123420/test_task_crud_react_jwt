import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  axios.defaults.baseURL = "http://54.93.213.129/api";

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      refreshAccessToken(refreshToken);
    } else {
      setLoading(false);
    }
  }, []);

  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await axios.post("/auth/jwt/refresh/", {
        refresh: refreshToken,
      });
      localStorage.setItem("token", response.data.access);
      setLoading(false);
    } catch (error) {
      console.error("Can't refresh access token", error);
      logout();
    }
  };

  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await axios.post("/auth/jwt/create/", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      const user = { username };
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
    } catch (error) {
      return (
        error.response?.data?.detail ||
        "Login failed. Please check your name and password."
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const signup = async (username, email, password) => {
    setLoading(true);
    try {
      await axios.post("/auth/users/", { username, email, password });

      setLoading(false);
    } catch (error) {
      console.error("Signup failed", error);
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    signup,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {loading}
    </AuthContext.Provider>
  );
};
