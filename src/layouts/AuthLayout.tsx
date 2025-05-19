import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-full max-w-md m-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">E-Commerce App</h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;