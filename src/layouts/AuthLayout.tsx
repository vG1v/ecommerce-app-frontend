import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-amber-100 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-amber-500" />
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-amber-300 opacity-20 transform rotate-45" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-yellow-300 opacity-20" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-amber-400 opacity-20 transform rotate-12" />
      
      <div className="w-full max-w-md relative">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-amber-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-amber-800">Welcome</h2>
            <p className="mt-1 text-sm text-amber-600">Your premier shopping destination</p>
          </Link>
        </div>

        {/* Auth card with subtle shadow */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Golden accent bar at top of card */}
          <div className="h-2 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
          
          <div className="p-6 sm:p-8">
            {children}
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-6 text-center text-sm text-amber-700">
          <p>© {new Date().getFullYear()} Shop Gold. All rights reserved Vorn.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;