'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('access');
    console.log('Stored user:', storedUser);
    console.log('Stored access token:', token);

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = async (email, password) => {
    try {
      console.log('Sending signup request:', { email, password });

      const res = await fetch('https://online-store-production-b3b2.up.railway.app/auth/signup/',  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log('Signup response:', data);

      if (!res.ok) throw new Error(data.error || 'Signup failed');

      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      router.push('/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('Sending login request:', { email, password });

      const res = await fetch('https://online-store-production-b3b2.up.railway.app/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log('Login response:', data);

      if (!res.ok) throw new Error(data.error || 'Login failed');

      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const logout = () => {
    console.log('Logging out...');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
