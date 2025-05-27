import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/APIService";
import { useAuth } from "../contexts/AuthContext";
import ProductCard from "../components/card/ProductCard";
import Navbar from "../components/layout/Navbar";

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface Category {
  id: number;
  name: string;
}

const Homepage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
        ]);
        
        setProducts(productsRes.data);
        setFilteredProducts(productsRes.data);
        setCategories(categoriesRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch cart item count
  useEffect(() => {
    if (user) {
      api.getCart()
        .then(res => setCartItemCount(res.data.items.length))
        .catch(err => console.error("Failed to fetch cart", err));
    }
  }, [user]);

  // Filter products by search term and category
  useEffect(() => {
    let result = products;
    
    // Filter by category
    if (selectedCategory) {
      const categoryName = categories.find(cat => cat.id === selectedCategory)?.name;
      if (categoryName) {
        result = result.filter(product => product.category === categoryName);
      }
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is handled in useEffect
  };

  const handleAddToCart = (productId: number) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }
    
    // Add to cart logic
  };

  // Mock categories and featured products for initial display
  const mockCategories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Fashion" },
    { id: 3, name: "Home & Kitchen" },
    { id: 4, name: "Beauty" },
    { id: 5, name: "Sports" },
    { id: 6, name: "Books" },
    { id: 7, name: "Toys" },
    { id: 8, name: "Health" },
  ];

  const mockProducts = [
    { id: 1, name: "Wireless Earbuds", price: 29.99, image: "https://placehold.co/300x300?text=Earbuds", category: "Electronics" },
    { id: 2, name: "Smart Watch", price: 89.99, image: "https://placehold.co/300x300?text=Watch", category: "Electronics" },
    { id: 3, name: "Summer T-Shirt", price: 19.99, image: "https://placehold.co/300x300?text=T-Shirt", category: "Fashion" },
    { id: 4, name: "Kitchen Blender", price: 49.99, image: "https://placehold.co/300x300?text=Blender", category: "Home & Kitchen" },
    { id: 5, name: "Bluetooth Speaker", price: 39.99, image: "https://placehold.co/300x300?text=Speaker", category: "Electronics" },
    { id: 6, name: "Running Shoes", price: 59.99, image: "https://placehold.co/300x300?text=Shoes", category: "Fashion" },
    { id: 7, name: "Coffee Maker", price: 69.99, image: "https://placehold.co/300x300?text=Coffee", category: "Home & Kitchen" },
    { id: 8, name: "Yoga Mat", price: 24.99, image: "https://placehold.co/300x300?text=Yoga", category: "Sports" },
  ];

  // Use mock data until API is implemented
  const displayCategories = categories.length ? categories : mockCategories;
  const displayProducts = loading ? mockProducts : filteredProducts;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar with yellow theme */}
      <Navbar cartItemsCount={cartItemCount} theme="yellow" />

      {/* Hero section with search */}
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Shop Smart, Shop Easy</span>
              <span className="block text-yellow-900">Everything You Need, All in One Place</span>
            </h1>
            
            {/* Search Bar */}
            <form 
              onSubmit={handleSearch}
              className="mt-8 max-w-3xl mx-auto flex rounded-full shadow-lg overflow-hidden"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products..."
                className="flex-grow px-6 py-4 text-lg focus:outline-none"
              />
              <button 
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 px-8 text-white font-semibold"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Category Menu */}
      <div className="bg-amber-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-3 space-x-6 no-scrollbar">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-medium text-sm ${
                selectedCategory === null
                  ? "bg-amber-600 text-white"
                  : "bg-amber-200 text-amber-800 hover:bg-amber-300"
              }`}
            >
              All Categories
            </button>    
            {displayCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-medium text-sm ${
                  selectedCategory === category.id
                    ? "bg-amber-600 text-white"
                    : "bg-amber-200 text-amber-800 hover:bg-amber-300"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Flash Deals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Flash Deals
            </h2>
            <button className="text-amber-900 bg-yellow-300 hover:bg-yellow-400 px-4 py-1 rounded-full font-medium">
              See All
            </button>
          </div>
          
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mockProducts.slice(0, 6).map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-200">
                <img src={product.image} alt={product.name} className="w-full h-24 object-cover" />
                <div className="p-2">
                  <div className="text-amber-700 font-bold">${product.price.toFixed(2)}</div>
                  <div className="text-xs text-red-600 font-semibold">50% OFF</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Products For You</h2>
        
        {loading ? (
          <div className="animate-pulse">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                theme="yellow"
                onClick={() => navigate(`/products/${product.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;

