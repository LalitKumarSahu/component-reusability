import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// .env se API URL lo, warna default localhost
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // App khulte hi check karo — kya pehle se logged in tha?
  useEffect(() => {
    const token = localStorage.getItem('reuseit_token');
    if (token) {
      // Token hai to axios mein set karo
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Server se user ki info lo
      axios.get(`${API}/api/auth/me`)
        .then(res => setUser(res.data.user))
        .catch(() => localStorage.removeItem('reuseit_token')) // Token expire tha
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Register function
  const register = async (name, email, password, phone, city) => {
    const res = await axios.post(`${API}/api/auth/register`, {
      name, email, password, phone, city
    });
    localStorage.setItem('reuseit_token', res.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    setUser(res.data.user);
    return res.data;
  };

  // Login function
  const login = async (email, password) => {
    const res = await axios.post(`${API}/api/auth/login`, { email, password });
    localStorage.setItem('reuseit_token', res.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    setUser(res.data.user);
    return res.data;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('reuseit_token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — components mein aise use karo:
// const { user, login, logout } = useAuth();
export const useAuth = () => useContext(AuthContext);