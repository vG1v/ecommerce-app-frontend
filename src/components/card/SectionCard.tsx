import React, { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  children: ReactNode;
  footerContent?: ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, children, footerContent }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {title}
        </h3>
      </div>
      
      {children}
      
      {footerContent && (
        <div className="bg-gray-50 px-4 py-4 sm:px-6">
          {footerContent}
        </div>
      )}
    </div>
  );
};

export default SectionCard;