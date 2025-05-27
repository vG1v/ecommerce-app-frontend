import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { useAuth } from '../../contexts/AuthContext';
import DropdownMenu from './DropdownMenu';

interface NavbarProps {
  cartItemsCount?: number;
  theme?: 'default' | 'yellow';
}

const Navbar: React.FC<NavbarProps> = ({ cartItemsCount = 0, theme = 'default' }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get current location

  const handleLogout = async () => {
    await logout();
  };

  // Function to check if a link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { label: 'Your Profile', to: '/profile' },
    { label: 'Your Orders', to: '/orders' },
    { label: 'Wishlist', to: '/wishlist' },
    { label: 'Settings', to: '/settings' },
    {
      label: 'Sign out',
      onClick: handleLogout,
      type: 'button' as const
    }
  ];

  // Theme-specific styles
  const navBgColor = theme === 'yellow' ? 'bg-yellow-500' : 'bg-white';
  const textColor = theme === 'yellow' ? 'text-amber-900' : 'text-gray-900';
  const hoverColor = theme === 'yellow' ? 'hover:text-amber-800' : 'hover:text-gray-700';
  const activeLink = theme === 'yellow' ? 'border-amber-800 text-amber-900' : 'border-blue-500 text-gray-900';
  const inactiveLink = theme === 'yellow'
    ? 'border-transparent text-amber-900 hover:text-amber-800 hover:border-amber-300'
    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';

  return (
    <nav className={`${navBgColor} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className={`text-xl font-bold ${theme === 'yellow' ? 'text-amber-900' : 'text-blue-600'}`}>
                E-Shop
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className={`border-b-2 ${isActive('/') ? activeLink : inactiveLink} px-3 py-5 text-sm font-medium`}>
                Home
              </Link>
              <Link to="/products" className={`border-b-2 ${isActive('/products') ? activeLink : inactiveLink} px-3 py-5 text-sm font-medium`}>
                Products
              </Link>
              <Link to="/vendors" className={`border-b-2 ${isActive('/vendors') ? activeLink : inactiveLink} px-3 py-5 text-sm font-medium`}>
                Vendors
              </Link>
              <Link to="/deals" className={`border-b-2 ${isActive('/deals') ? activeLink : inactiveLink} px-3 py-5 text-sm font-medium`}>
                Deals
              </Link>
              <Link to="/dashboard" className={`border-b-2 ${isActive('/dashboard') ? activeLink : inactiveLink} px-3 py-5 text-sm font-medium`}>
                Dashboard
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
              {user ? (
                <>
                  <Link to="/wishlist" className={`p-1 rounded-full ${textColor} ${hoverColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 relative mx-2`}>
                    <span className="sr-only">View wishlist</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </Link>
                  <Link to="/cart" className={`p-1 rounded-full ${textColor} ${hoverColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 relative mx-2`}>
                    <span className="sr-only">View cart</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartItemsCount > 0 && (
                      <span className={`absolute -top-1 -right-1 ${theme === 'yellow' ? 'bg-red-600' : 'bg-red-500'} text-white rounded-full w-4 h-4 flex items-center justify-center text-xs`}>
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                  <div className="ml-3 relative">
                    <DropdownMenu
                      userName={user?.name || ''}
                      userEmail={user?.email || ''}
                      menuItems={menuItems}
                      theme={theme}
                    />
                  </div>
                </>
              ) : (
                <div className="flex space-x-4">
                  <Link to="/login" className={`${theme === 'yellow' ? 'bg-amber-800 hover:bg-amber-900 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} px-4 py-2 rounded-md text-sm font-medium`}>
                    Login
                  </Link>
                  <Link to="/register" className={`${theme === 'yellow' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} px-4 py-2 rounded-md text-sm font-medium`}>
                    Register
                  </Link>
                </div>
              )}
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${theme === 'yellow' ? 'text-amber-800' : 'text-gray-400'} ${theme === 'yellow' ? 'hover:text-amber-900 hover:bg-amber-100' : 'hover:text-gray-500 hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500`}
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className={`${isActive('/') 
              ? (theme === 'yellow' ? 'bg-amber-100 border-l-4 border-amber-500 text-amber-900' : 'bg-blue-50 border-l-4 border-blue-500 text-blue-700')
              : (theme === 'yellow' ? 'text-amber-800 hover:bg-amber-50 hover:border-amber-300' : 'text-gray-500 hover:bg-gray-50 hover:border-gray-300')
            } block pl-3 pr-4 py-2 text-base font-medium ${!isActive('/') ? 'border-transparent border-l-4' : ''}`}>
              Home
            </Link>
            <Link to="/products" className={`${isActive('/products') 
              ? (theme === 'yellow' ? 'bg-amber-100 border-l-4 border-amber-500 text-amber-900' : 'bg-blue-50 border-l-4 border-blue-500 text-blue-700')
              : (theme === 'yellow' ? 'text-amber-800 hover:bg-amber-50 hover:border-amber-300' : 'text-gray-500 hover:bg-gray-50 hover:border-gray-300')
            } block pl-3 pr-4 py-2 text-base font-medium ${!isActive('/products') ? 'border-transparent border-l-4' : ''}`}>
              Products
            </Link>
            <Link to="/vendors" className={`${isActive('/vendors') 
              ? (theme === 'yellow' ? 'bg-amber-100 border-l-4 border-amber-500 text-amber-900' : 'bg-blue-50 border-l-4 border-blue-500 text-blue-700')
              : (theme === 'yellow' ? 'text-amber-800 hover:bg-amber-50 hover:border-amber-300' : 'text-gray-500 hover:bg-gray-50 hover:border-gray-300')
            } block pl-3 pr-4 py-2 text-base font-medium ${!isActive('/vendors') ? 'border-transparent border-l-4' : ''}`}>
              Vendors
            </Link>
            <Link to="/deals" className={`${isActive('/deals') 
              ? (theme === 'yellow' ? 'bg-amber-100 border-l-4 border-amber-500 text-amber-900' : 'bg-blue-50 border-l-4 border-blue-500 text-blue-700')
              : (theme === 'yellow' ? 'text-amber-800 hover:bg-amber-50 hover:border-amber-300' : 'text-gray-500 hover:bg-gray-50 hover:border-gray-300')
            } block pl-3 pr-4 py-2 text-base font-medium ${!isActive('/deals') ? 'border-transparent border-l-4' : ''}`}>
              Deals
            </Link>
            <Link to="/dashboard" className={`${isActive('/dashboard') 
              ? (theme === 'yellow' ? 'bg-amber-100 border-l-4 border-amber-500 text-amber-900' : 'bg-blue-50 border-l-4 border-blue-500 text-blue-700')
              : (theme === 'yellow' ? 'text-amber-800 hover:bg-amber-50 hover:border-amber-300' : 'text-gray-500 hover:bg-gray-50 hover:border-gray-300')
            } block pl-3 pr-4 py-2 text-base font-medium ${!isActive('/dashboard') ? 'border-transparent border-l-4' : ''}`}>
              Dashboard
            </Link>
          </div>

          {user ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className={`h-10 w-10 rounded-full ${theme === 'yellow' ? 'bg-amber-200' : 'bg-gray-200'} flex items-center justify-center ${theme === 'yellow' ? 'text-amber-800' : 'text-gray-600'}`}>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </div>
                <div className="ml-3">
                  <div className={`text-base font-medium ${theme === 'yellow' ? 'text-amber-900' : 'text-gray-800'}`}>{user?.name}</div>
                  <div className={`text-sm font-medium ${theme === 'yellow' ? 'text-amber-700' : 'text-gray-500'}`}>{user?.email}</div>
                </div>
                <Link to="/cart" className={`ml-auto p-1 rounded-full ${theme === 'yellow' ? 'text-amber-800 hover:text-amber-900' : 'text-gray-500 hover:text-gray-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 relative`}>
                  <span className="sr-only">View cart</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartItemsCount > 0 && (
                    <span className={`absolute -top-1 -right-1 ${theme === 'yellow' ? 'bg-red-600' : 'bg-red-500'} text-white rounded-full w-4 h-4 flex items-center justify-center text-xs`}>
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </div>
              <div className="mt-3 space-y-1">
                {menuItems.map((item, index) => (
                  item.type === 'button' ? (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className={`block w-full text-left px-4 py-2 text-base font-medium ${theme === 'yellow' ? 'text-amber-700 hover:text-amber-900 hover:bg-amber-50' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={index}
                      to={item.to || '#'}
                      className={`block px-4 py-2 text-base font-medium ${theme === 'yellow' ? 'text-amber-700 hover:text-amber-900 hover:bg-amber-50' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200 px-4 flex flex-col space-y-2">
              <Link to="/login" className={`${theme === 'yellow' ? 'bg-amber-800 hover:bg-amber-900 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} px-4 py-2 rounded-md text-base font-medium text-center`}>
                Login
              </Link>
              <Link to="/register" className={`${theme === 'yellow' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} px-4 py-2 rounded-md text-base font-medium text-center`}>
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;