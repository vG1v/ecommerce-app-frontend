import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import StatCard from '../components/StatCard';
import SectionCard from '../components/SectionCard';
import ProductCard from '../components/ProductCard';

// Mock data for initial display
const recentOrders = [
  { id: 1, date: '2023-05-15', total: 125.99, status: 'Delivered' },
  { id: 2, date: '2023-05-10', total: 89.50, status: 'Processing' },
  { id: 3, date: '2023-05-05', total: 210.75, status: 'Shipped' },
];

const featuredProducts = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, image: 'https://placehold.co/200x150' },
  { id: 2, name: 'Smart Watch', price: 149.99, image: 'https://placehold.co/200x150' },
  { id: 3, name: 'Bluetooth Speaker', price: 59.99, image: 'https://placehold.co/200x150' },
  { id: 4, name: 'Laptop Backpack', price: 45.99, image: 'https://placehold.co/200x150' },
];

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 5,
    totalSpent: 526.24,
    wishlistItems: 8,
    cartItems: 2
  });

  useEffect(() => {
    // You can fetch data here in the future
  }, []);

  // Order status badge component (could also be extracted if needed elsewhere)
  const StatusBadge = ({ status }: { status: string }) => (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
      ${status === 'Delivered' ? 'bg-green-100 text-green-800' : 
        status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
      {status}
    </span>
  );

  // Footer content for sections with "View all" links
  const renderFooterLink = (text: string, url: string) => (
    <div className="text-sm">
      <Link to={url} className="font-medium text-blue-600 hover:text-blue-500">
        {text}<span aria-hidden="true"> &rarr;</span>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartItemsCount={stats.cartItems} />

      {/* Main Content */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {user?.name}!</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Stats Section */}
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* Orders Stat */}
              <StatCard 
                title="Total Orders"
                value={stats.totalOrders}
                icon={
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                }
                linkText="View all orders"
                linkUrl="/orders"
                bgColor="bg-blue-500"
              />

              {/* Spent Stat */}
              <StatCard 
                title="Total Spent"
                value={`$${stats.totalSpent.toFixed(2)}`}
                icon={
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                linkText="View transactions"
                linkUrl="/transactions"
                bgColor="bg-green-500"
              />

              {/* Cart Stat */}
              <StatCard 
                title="Items in Cart"
                value={stats.cartItems}
                icon={
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
                linkText="View cart"
                linkUrl="/cart"
                bgColor="bg-indigo-500"
              />

              {/* Wishlist Stat */}
              <StatCard 
                title="Wishlist Items"
                value={stats.wishlistItems}
                icon={
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                }
                linkText="View wishlist"
                linkUrl="/wishlist"
                bgColor="bg-red-500"
              />
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-8">
            <SectionCard 
              title="Recent Orders" 
              footerContent={renderFooterLink("View all orders", "/orders")}
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                          <Link to={`/orders/${order.id}`}>
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </div>

          {/* Featured Products */}
          <div className="mt-8">
            <SectionCard 
              title="Featured Products" 
              footerContent={renderFooterLink("View all products", "/products")}
            >
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;