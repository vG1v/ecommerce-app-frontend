import React from 'react';

interface SubmitButtonProps {
  loading: boolean;
  loadingText: string;
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, loadingText, text }) => {
  return (
    <button 
      type="submit" 
      className={`w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md 
        transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      disabled={loading}
    >
      {loading ? loadingText : text}
    </button>
  );
};

export default SubmitButton;