import React from 'react';
import { Link } from 'react-router-dom';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  linkText: string;
  linkUrl: string;
  bgColor?: string;
  theme?: 'default' | 'yellow';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  linkText, 
  linkUrl, 
  bgColor = 'bg-blue-500',
  theme = 'default'
}) => {
  // Determine colors based on theme
  const footerBg = theme === 'yellow' ? 'bg-amber-50' : 'bg-gray-50';
  const linkColor = theme === 'yellow' ? 'text-amber-600 hover:text-amber-700' : 'text-blue-600 hover:text-blue-500';
  const valueBgColor = theme === 'yellow' ? 'bg-gradient-to-r from-amber-50 to-yellow-50' : '';
  const valueTextColor = theme === 'yellow' ? 'text-amber-900' : 'text-gray-900';
  const titleColor = theme === 'yellow' ? 'text-amber-700' : 'text-gray-500';
  const borderColor = theme === 'yellow' ? 'border-amber-200' : 'border-gray-200';

  return (
    <div className={`bg-white overflow-hidden shadow-md rounded-lg border ${borderColor} transition-all duration-300 hover:shadow-lg`}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${bgColor} rounded-md p-3 transform transition-transform duration-300 hover:scale-105`}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className={`text-sm font-medium ${titleColor} truncate`}>{title}</dt>
              <dd className="flex items-baseline mt-1">
                <div className={`text-2xl font-semibold ${valueTextColor} ${valueBgColor} rounded-md py-1 px-2`}>
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className={`${footerBg} px-4 py-4 sm:px-6 border-t ${borderColor}`}>
        <div className="text-sm">
          <Link 
            to={linkUrl} 
            className={`font-medium ${linkColor} flex items-center transition-all duration-200 hover:translate-x-1`}
          >
            {linkText}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StatCard;