import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import ProductCard from "../components/card/ProductCard";

// Mock vendor data
const mockVendor = {
  id: 1,
  name: "Golden Tech Marketplace",
  slug: "golden-tech",
  logo: "https://placehold.co/200x200?text=GT",
  coverImage: "https://placehold.co/1200x300?text=GoldenTech",
  description: "Premium electronics and accessories for all your tech needs. Specializing in high-quality headphones, smart devices, and computer peripherals.",
  shortDescription: "Premium electronics and accessories",
  rating: 4.7,
  reviewCount: 128,
  productCount: 67,
  followerCount: 521,
  joinedDate: "2020-05-15",
  location: "San Francisco, CA",
  verified: true,
  featured: true,
  categories: ["Electronics", "Audio", "Accessories", "Smart Home"],
  contactEmail: "support@goldentech.example.com",
  contactPhone: "+1 (555) 123-4567",
  website: "https://goldentech.example.com",
  socialMedia: {
    facebook: "https://facebook.com/goldentechstore",
    instagram: "https://instagram.com/goldentechstore",
    twitter: "https://twitter.com/goldentechstore"
  }
};

// Mock products for this vendor
const mockProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    sale_price: 149.99,
    on_sale: true,
    image: "https://placehold.co/300x300?text=Headphones",
    average_rating: 4.8,
    category: "Audio"
  },
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    price: 129.99,
    sale_price: null,
    on_sale: false,
    image: "https://placehold.co/300x300?text=Earbuds",
    average_rating: 4.6,
    category: "Audio"
  },
  {
    id: 3,
    name: "Smart Home Hub",
    price: 189.99,
    sale_price: 159.99,
    on_sale: true,
    image: "https://placehold.co/300x300?text=Hub",
    average_rating: 4.5,
    category: "Smart Home"
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 79.99,
    sale_price: null,
    on_sale: false,
    image: "https://placehold.co/300x300?text=Speaker",
    average_rating: 4.7,
    category: "Audio"
  },
  {
    id: 5,
    name: "Laptop Cooling Pad",
    price: 35.99,
    sale_price: 29.99,
    on_sale: true,
    image: "https://placehold.co/300x300?text=Cooling+Pad",
    average_rating: 4.3,
    category: "Accessories"
  },
  {
    id: 6,
    name: "4K Webcam",
    price: 89.99,
    sale_price: null,
    on_sale: false,
    image: "https://placehold.co/300x300?text=Webcam",
    average_rating: 4.4,
    category: "Accessories"
  }
];

const VendorDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [vendor, setVendor] = useState(mockVendor);
  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("popular");
  
  useEffect(() => {
    // In a real application, you would fetch the vendor data here
    // api.getVendorBySlug(slug).then(data => setVendor(data))
    
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [slug]);
  
  // Filter products based on selected category
  const filteredProducts = activeCategory 
    ? products.filter(product => product.category === activeCategory)
    : products;
    
  // Sort products based on selection
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case "price_low":
        return a.sale_price || a.price - (b.sale_price || b.price);
      case "price_high":
        return (b.sale_price || b.price) - (a.sale_price || a.price);
      case "rating":
        return b.average_rating - a.average_rating;
      default: // "popular"
        return 0; // In a real app, you'd sort by popularity metrics
    }
  });

  // Calculate unique categories from products
  const categories = Array.from(new Set(products.map(product => product.category)));

  // Helper function to render star ratings
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-${i}`} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half-star" className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-gradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-star-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar theme="yellow" />
      
      {loading ? (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="rounded-lg bg-gray-200 h-64 w-full mb-6"></div>
            <div className="rounded-full bg-gray-200 h-20 w-20 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-md w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-md w-3/5 mb-6"></div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="h-10 bg-gray-200 rounded-md"></div>
              <div className="h-10 bg-gray-200 rounded-md"></div>
              <div className="h-10 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Vendor Cover Image */}
          <div className="relative h-64 overflow-hidden">
            <img 
              src={vendor.coverImage} 
              alt={`${vendor.name} cover`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40"></div>
          </div>
          
          {/* Vendor Info Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative -mt-16">
              <div className="flex flex-col md:flex-row md:items-end">
                {/* Vendor Logo */}
                <div className="flex-shrink-0 rounded-lg bg-white shadow-md border-4 border-white overflow-hidden h-32 w-32">
                  <img 
                    src={vendor.logo} 
                    alt={vendor.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-6 pb-4">
                  {/* Vendor Name & Verification Badge */}
                  <div className="flex items-center">
                    <h1 className="text-3xl font-bold text-amber-900">{vendor.name}</h1>
                    {vendor.verified && (
                      <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        <svg className="h-4 w-4 text-amber-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified Seller
                      </span>
                    )}
                    
                    {vendor.featured && (
                      <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500 text-white">
                        <svg className="h-4 w-4 text-white mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        Featured
                      </span>
                    )}
                  </div>
                  
                  {/* Vendor Rating */}
                  <div className="mt-2 flex items-center">
                    <div className="flex mr-2">
                      {renderRatingStars(vendor.rating)}
                    </div>
                    <span className="text-amber-900 font-medium">
                      {vendor.rating.toFixed(1)} ({vendor.reviewCount} reviews)
                    </span>
                  </div>
                  
                  {/* Location & Joined Date */}
                  <div className="mt-2 text-sm text-gray-600">
                    <span className="flex items-center">
                      <svg className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {vendor.location} • Joined {new Date(vendor.joinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </span>
                  </div>
                </div>
                
                {/* Follow Button & Contact */}
                <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-auto">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Follow Store
                  </button>
                  
                  <a href={`mailto:${vendor.contactEmail}`} className="ml-3 inline-flex items-center px-4 py-2 border border-amber-300 shadow-sm text-sm font-medium rounded-md text-amber-700 bg-amber-50 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact
                  </a>
                </div>
              </div>
            </div>
            
            {/* Vendor Stats & Description */}
            <div className="mt-6">
              {/* Stats Bar */}
              <div className="bg-white rounded-lg shadow-sm border border-amber-200 p-4 mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-2 border-r border-gray-200">
                    <div className="text-2xl font-bold text-amber-900">{vendor.productCount}</div>
                    <div className="text-sm text-gray-500">Products</div>
                  </div>
                  <div className="p-2 border-r border-gray-200">
                    <div className="text-2xl font-bold text-amber-900">{vendor.followerCount}</div>
                    <div className="text-sm text-gray-500">Followers</div>
                  </div>
                  <div className="p-2 border-r border-gray-200">
                    <div className="text-2xl font-bold text-amber-900">{vendor.rating.toFixed(1)}</div>
                    <div className="text-sm text-gray-500">Rating</div>
                  </div>
                  <div className="p-2">
                    <div className="text-2xl font-bold text-amber-900">{vendor.reviewCount}</div>
                    <div className="text-sm text-gray-500">Reviews</div>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="bg-white rounded-lg shadow-sm border border-amber-200 p-6 mb-6">
                <h2 className="text-lg font-medium text-amber-900 mb-2">About {vendor.name}</h2>
                <p className="text-gray-700">{vendor.description}</p>
                
                {/* Categories */}
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Specializes in:</h3>
                  <div className="flex flex-wrap gap-2">
                    {vendor.categories.map((category) => (
                      <span key={category} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Contact Information */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information:</h3>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${vendor.contactEmail}`} className="text-amber-600 hover:text-amber-800">{vendor.contactEmail}</a>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${vendor.contactPhone}`} className="text-amber-600 hover:text-amber-800">{vendor.contactPhone}</a>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">{vendor.website}</a>
                    </div>
                  </div>
                  
                  {/* Social Media */}
                  <div className="mt-4 flex space-x-4">
                    <a href={vendor.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-600">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                      </svg>
                    </a>
                    <a href={vendor.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-600">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.54 10.54 0 01-3.123 1.193 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a href={vendor.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-600">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products Section */}
            <div className="mt-6 mb-12">
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Products by {vendor.name}</h2>
              
              {/* Category Filter & Sort Options */}
              <div className="bg-white rounded-lg shadow-sm border border-amber-200 p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setActiveCategory(null)} 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      activeCategory === null 
                        ? 'bg-amber-600 text-white' 
                        : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    }`}
                  >
                    All
                  </button>
                  
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        activeCategory === category 
                          ? 'bg-amber-600 text-white' 
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-500">Sort by:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md text-sm focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="popular">Popular</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
              
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts.length > 0 ? (
                  sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} theme="yellow" />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <svg className="mx-auto h-12 w-12 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 12H4M8.5 8l-3-3m0 0L2 8.5M5.5 5l4 4M8.5 16l-3 3m0 0L2 16m3.5 3l4-4M16 8.5l3-3m0 0L22 8.5M19 5.5l-4 4M16 15.5l3 3m0 0L22 15.5m-3.5 3l-4-4" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-amber-900">No products found</h3>
                    <p className="mt-1 text-gray-500">Try changing your filter or check back later.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VendorDetailPage;