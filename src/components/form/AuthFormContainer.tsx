import React from 'react';

interface AuthFormContainerProps {
  children: React.ReactNode;
  title: string;
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({ children, title }) => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-8 rounded-lg shadow-md border border-amber-200">
      <h1 className="text-2xl font-bold text-center text-amber-800 mb-6">{title}</h1>
      {children}
    </div>
  );
};

export default AuthFormContainer;