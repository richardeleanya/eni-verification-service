import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AuthUser = {
  id: number;
  username: string;
  // Add more fields as needed
};

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  fetchAuth: typeof fetch;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
  fetchAuth: fetch,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (username: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error('Invalid credentials');
    const data = await res.json();
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Authenticated fetch
  const fetchAuth: typeof fetch = (input, init = {}) => {
    const headers = new Headers((init && init.headers) || {});
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return fetch(input, { ...init, headers });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, fetchAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);