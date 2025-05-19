// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/LoginPage';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route 
            path="/login" 
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            } 
          />
          
          {/* Protected Routes (add later) */}
          {/* <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          /> */}
          
          {/* Redirect root to login for now */}
          <Route 
            path="/" 
            element={<Navigate to="/login" />} 
          />
          
          {/* 404 page */}
          <Route 
            path="*" 
            element={
              <div className="flex h-screen items-center justify-center">
                <h1 className="text-3xl font-bold text-gray-800">404 | Page Not Found</h1>
              </div>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;