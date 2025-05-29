import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/APIService";
import { useAuth } from "../contexts/AuthContext";
import ProductCard from "../components/card/ProductCard";
import Navbar from "../components/layout/Navbar";

interface Product {
  id: number;
  name: string;
  slug: string;
  short_description?: string;
  price: number;
  sale_price?: number;
  on_sale?: boolean;
  main_image_path: string;
  stock_status?: string;
  featured?: boolean;
  average_rating?: number;
  review_count?: number;
  vendor_id?: number;
  category?: string;
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
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

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

  const mockProducts: Product[] = [
    { id: 1, name: "Wireless Earbuds", slug: "wireless-earbuds", price: 29.99, main_image_path: "https://placehold.co/300x300?text=Earbuds", category: "Electronics" },
    { id: 2, name: "Smart Watch", slug: "smart-watch", price: 89.99, main_image_path: "https://placehold.co/300x300?text=Watch", category: "Electronics" },
    { id: 3, name: "Summer T-Shirt", slug: "summer-t-shirt", price: 19.99, main_image_path: "https://placehold.co/300x300?text=T-Shirt", category: "Fashion" },
    { id: 4, name: "Kitchen Blender", slug: "kitchen-blender", price: 49.99, main_image_path: "https://placehold.co/300x300?text=Blender", category: "Home & Kitchen" },
    { id: 5, name: "Bluetooth Speaker", slug: "bluetooth-speaker", price: 39.99, main_image_path: "https://placehold.co/300x300?text=Speaker", category: "Electronics" },
    { id: 6, name: "Running Shoes", slug: "running-shoes", price: 59.99, main_image_path: "https://placehold.co/300x300?text=Shoes", category: "Fashion" },
    { id: 7, name: "Coffee Maker", slug: "coffee-maker", price: 69.99, main_image_path: "https://placehold.co/300x300?text=Coffee", category: "Home & Kitchen" },
    { id: 8, name: "Yoga Mat", slug: "yoga-mat", price: 24.99, main_image_path: "https://placehold.co/300x300?text=Yoga", category: "Sports" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const productsRes = await api.getProducts();
        
        let productsArray;
        if (Array.isArray(productsRes.data)) {
          productsArray = productsRes.data;
        } else if (productsRes.data && typeof productsRes.data === 'object') {
          productsArray = productsRes.data.data || productsRes.data.products || [];
        } else {
          productsArray = [];
        }
        
        const formattedProducts: Product[] = productsArray.map((p: any) => ({
          id: p.id,
          name: p.name,
          slug: p.slug || `product-${p.id}`,
          short_description: p.short_description,
          price: Number(p.price || 0),
          sale_price: p.sale_price ? Number(p.sale_price) : undefined,
          on_sale: p.on_sale || false,
          main_image_path: p.main_image_path || "https://placehold.co/300x300?text=No+Image",
          stock_status: p.stock_status || "instock",
          featured: p.featured || false,
          average_rating: p.average_rating ? parseFloat(p.average_rating) : undefined,
          review_count: p.review_count,
          vendor_id: p.vendor_id,
          category: p.category?.name || "Uncategorized" 
        }));
        
        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
        setCategories(mockCategories);
        setLoading(false);
      } catch (error) {
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setCategories(mockCategories);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await api.getFeaturedProducts();
        
        let featuredArray;
        if (Array.isArray(response.data)) {
          featuredArray = response.data;
        } else if (response.data && typeof response.data === 'object') {
          featuredArray = response.data.data || response.data.products || [];
        } else {
          featuredArray = [];
        }
        
        setFeaturedProducts(featuredArray);
      } catch (error) {
        setFeaturedProducts(mockProducts.slice(0, 6));
      }
    };
    
    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    if (user) {
      api.getCart()
        .then(res => setCartItemCount(res.data.items.length))
        .catch(err => {});
    }
  }, [user]);

  useEffect(() => {
    let result = products;
    
    if (selectedCategory) {
      const categoryName = mockCategories.find(cat => cat.id === selectedCategory)?.name;
      if (categoryName) {
        result = result.filter(product => 
          product.category === categoryName ||
          product.category?.includes(categoryName)
        );
      }
    }
    
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
  };

  const handleAddToCart = (productId: number) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }
    
    api.addToCart(productId, 1)
      .then(response => {
        setCartItemCount(prev => prev + 1);
        alert("Product added to cart successfully");
      })
      .catch(error => {
        alert("Failed to add product to cart");
      });
  };

  const displayCategories = categories.length ? categories : mockCategories;
  const displayProducts = loading ? [] : 
                         products.length > 0 ? filteredProducts : 
                         mockProducts;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartItemsCount={cartItemCount} theme="yellow" />

      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Shop Smart, Shop Easy</span>
              <span className="block text-yellow-900">Everything You Need, All in One Place</span>
            </h1>
            
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
            {featuredProducts.length > 0 ? 
              featuredProducts.map(product => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-200"
                  onClick={() => navigate(`/products/${product.slug || product.id}`)}
                >
                  <img 
                    src={product.main_image_path} 
                    alt={product.name} 
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-2">
                    <div className="text-amber-700 font-bold">
                      ${product.sale_price ? Number(product.sale_price).toFixed(2) : Number(product.price).toFixed(2)}
                    </div>
                    {product.on_sale && product.sale_price && (
                      <div className="text-xs text-red-600 font-semibold">
                        {Math.round((1 - Number(product.sale_price) / Number(product.price)) * 100)}% OFF
                      </div>
                    )}
                  </div>
                </div>
              ))
              : 
              mockProducts.slice(0, 6).map(product => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-200"
                  onClick={() => navigate(`/products/${product.slug || product.id}`)}
                >
                  <img 
                    src={product.main_image_path} 
                    alt={product.name} 
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-2">
                    <div className="text-amber-700 font-bold">
                      ${product.sale_price ? Number(product.sale_price).toFixed(2) : Number(product.price).toFixed(2)}
                    </div>
                    {product.on_sale && product.sale_price && (
                      <div className="text-xs text-red-600 font-semibold">
                        {Math.round((1 - Number(product.sale_price) / Number(product.price)) * 100)}% OFF
                      </div>
                    )}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      
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
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={{
                  id: product.id,
                  name: product.name,
                  price: Number(product.price || 0),
                  image: product.main_image_path,
                  category: product.category || "",
                  salePrice: product.sale_price ? Number(product.sale_price) : undefined,
                  onSale: !!product.on_sale,
                  rating: product.average_rating ? Number(product.average_rating) : undefined,
                  reviewCount: product.review_count
                }}
                theme="yellow"
                onClick={() => navigate(`/products/${product.slug || product.id}`)}
                onAddToCart={() => handleAddToCart(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found. Please try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;

