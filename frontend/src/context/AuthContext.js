import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data

  // Check if user is stored in localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Set user in context and localStorage
  const setAuthUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Remove user from context and localStorage (logout)
  const logoutUser = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setAuthUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
