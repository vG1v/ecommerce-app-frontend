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
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ userName, userEmail, menuItems }) => {
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

  return (
    <div ref={dropdownRef} className="relative">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="sr-only">Open user menu</span>
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
            {userName?.charAt(0).toUpperCase() || 'U'}
          </div>
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
          {menuItems.map((item, index) => (
            item.type === 'button' ? (
              <button
                key={index}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={index}
                to={item.to || '#'}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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