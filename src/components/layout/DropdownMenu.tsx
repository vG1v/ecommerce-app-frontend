import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface MenuItem {
  label: string;
  to?: string;
  onClick?: () => void;
  type?: 'link' | 'button';
}

interface DropdownMenuProps {
  userName: string;
  userEmail?: string;
  menuItems: MenuItem[];
  theme?: 'default' | 'yellow';
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
  userName, 
  userEmail, 
  menuItems,
  theme = 'default'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Theme-specific styles
  const avatarBgColor = theme === 'yellow' ? 'bg-amber-200' : 'bg-gray-200';
  const avatarTextColor = theme === 'yellow' ? 'text-amber-800' : 'text-gray-600';
  const menuBgColor = theme === 'yellow' ? 'bg-amber-50' : 'bg-white';
  const menuItemHover = theme === 'yellow' ? 'hover:bg-amber-100' : 'hover:bg-gray-100';
  const menuItemText = theme === 'yellow' ? 'text-amber-800' : 'text-gray-700';
  const ringFocus = theme === 'yellow' ? 'focus:ring-amber-500' : 'focus:ring-blue-500';

  return (
    <div ref={dropdownRef} className="relative">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${ringFocus}`}
        >
          <span className="sr-only">Open user menu</span>
          <div className={`h-8 w-8 rounded-full ${avatarBgColor} flex items-center justify-center ${avatarTextColor}`}>
            {userName?.charAt(0).toUpperCase() || 'U'}
          </div>
        </button>
      </div>
      {isOpen && (
        <div className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${menuBgColor} ring-1 ring-black ring-opacity-5 z-10`}>
          {userEmail && (
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500 truncate">{userEmail}</p>
            </div>
          )}
          
          {menuItems.map((item, index) => (
            item.type === 'button' ? (
              <button
                key={index}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${menuItemText} ${menuItemHover}`}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={index}
                to={item.to || '#'}
                className={`block px-4 py-2 text-sm ${menuItemText} ${menuItemHover}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;