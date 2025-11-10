import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

/**
 * Generate a simple JWT-like token (frontend only, no backend validation)
 * Format: base64(header).base64(payload).signature
 */
const generateToken = (username) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const payload = {
    username: username,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
  };

  // Simple base64 encoding (frontend only, not secure)
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = btoa(`${encodedHeader}.${encodedPayload}.secret`);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

/**
 * Decode token to get username (simple frontend decoding)
 */
const decodeToken = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    
    // Check if token is expired
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.username) {
        setUser({ username: decoded.username });
      } else {
        // Token is invalid or expired, remove it
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    if (!username || !password) {
      return { success: false, error: 'Username and password are required' };
    }

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username);

    if (!user) {
      return { success: false, error: 'Username not found. Please sign up first.' };
    }

    if (user.password !== password) {
      return { success: false, error: 'Incorrect password' };
    }

    // Generate token
    const token = generateToken(username);
    
    // Store token
    localStorage.setItem('token', token);
    
    // Set user state
    setUser({ username });
    
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

