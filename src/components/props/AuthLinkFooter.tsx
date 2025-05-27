import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLinkFooterProps {
  promptText: string;
  linkText: string;
  linkTo: string;
}

const AuthLinkFooter: React.FC<AuthLinkFooterProps> = ({ promptText, linkText, linkTo }) => {
  return (
    <div className="mt-6 text-center">
      <p className="text-amber-700">
        {promptText}
        <Link to={linkTo} className="text-amber-600 hover:text-amber-800 font-medium ml-1">
          {linkText}
        </Link>
      </p>
      <div className="mt-4">
        <Link to="/" className="text-amber-600 hover:text-amber-800 text-sm flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default AuthLinkFooter;