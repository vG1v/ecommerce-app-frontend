import React from 'react';

interface FormErrorProps {
  error: string;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 border border-red-100">
      {error}
    </div>
  );
};

export default FormError;