import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import LandingPage from './components/LandingPage';
import Books from './pages/Books';
import DigitalBooksPage from './pages/DigitalBooksPage';
import CategoryBooks from './components/CategoryBooks';
import Login from './components/Login';
import Signup from './components/Signup';

const NotFound = () => {
  return <div className="text-center p-8">404 - Page Not Found</div>;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <LandingPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/books" 
        element={
          <ProtectedRoute>
            <Books />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/digital-books" 
        element={
          <ProtectedRoute>
            <DigitalBooksPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/category/:categoryName" 
        element={
          <ProtectedRoute>
            <CategoryBooks />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
