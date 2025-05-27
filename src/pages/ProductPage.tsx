import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import ProductCard from "../components/card/ProductCard";
import api from "../services/APIService";

// Mock categories for filter sidebar
const categories = [
  { id: 1, name: "Electronics", count: 42 },
  { id: 2, name: "Fashion", count: 38 },
  { id: 3, name: "Home & Kitchen", count: 24 },
  { id: 4, name: "Beauty", count: 16 },
  { id: 5, name: "Sports", count: 19 },
  { id: 6, name: "Books", count: 31 },
];

// Mock products
const mockProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    sale_price: 149.99,
    on_sale: true,
    image: "https://placehold.co/300x300?text=Headphones",
    average_rating: 4.8,
    category: "Electronics"
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 89.99,
    sale_price: null,
    on_sale: false,
    image: "https://placehold.co/300x300?text=Earbuds",
    average_rating: 4.6,
    category: "Electronics"
  },
  // Add more mock products here
];

const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    searchParams.get("category") ? parseInt(searchParams.get("category") as string) : null
  );
  const [sortBy, setSortBy] = useState("newest");
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Simulate API call to fetch products
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
    
    // In a real implementation, you would call your API:
    // api.getProducts({ category: selectedCategory, sort: sortBy })
    //   .then(response => {
    //     setProducts(response.data);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     console.error("Failed to fetch products", error);
    //     setLoading(false);
    //   });
  }, [selectedCategory, sortBy]);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar theme="yellow" cartItemsCount={cartItemCount} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Category sidebar */}
          <div className="w-full md:w-64 mb-6 md:mb-0">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-200">
              <h2 className="text-lg font-medium text-amber-800 mb-4">Categories</h2>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-2 py-1 rounded-md ${
                      selectedCategory === null
                        ? "bg-amber-100 text-amber-800"
                        : "text-gray-600 hover:bg-amber-50"
                    }`}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left px-2 py-1 rounded-md flex justify-between items-center ${
                        selectedCategory === category.id
                          ? "bg-amber-100 text-amber-800"
                          : "text-gray-600 hover:bg-amber-50"
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 border-t border-gray-200 pt-4">
                <h2 className="text-lg font-medium text-amber-800 mb-4">Price Range</h2>
                <div className="flex flex-col space-y-2">
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox text-amber-600" />
                    <span className="ml-2">Under $50</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox text-amber-600" />
                    <span className="ml-2">$50 - $100</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox text-amber-600" />
                    <span className="ml-2">$100 - $200</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox text-amber-600" />
                    <span className="ml-2">Over $200</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="md:ml-8 flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-amber-200">
              <div className="mb-4 sm:mb-0">
                <span className="text-gray-600">
                  Showing {products.length} products
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="newest">Newest</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>
            
            {/* Products */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="bg-white p-4 rounded-lg animate-pulse h-80">
                    <div className="bg-gray-200 h-48 rounded-md mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded-md mb-2 w-3/4"></div>
                    <div className="bg-gray-200 h-4 rounded-md mb-4 w-1/2"></div>
                    <div className="bg-gray-200 h-8 rounded-md w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
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
      </div>
    </div>
  );
};

export default ProductPage;