import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/layout/Navbar";

// Mock product data based on your entity structure
const mockProduct = {
  id: 1,
  vendor_id: 2,
  name: "Premium Wireless Headphones",
  slug: "premium-wireless-headphones",
  short_description: "Experience crystal clear sound with our premium wireless headphones",
  description: `
    <p>Immerse yourself in stunning audio quality with our Premium Wireless Headphones.</p>
    <p>Features include:</p>
    <ul>
      <li>40mm dynamic drivers for rich sound</li>
      <li>Active noise cancellation technology</li>
      <li>Up to 30 hours of battery life</li>
      <li>Ultra-comfortable ear cushions</li>
      <li>Fast USB-C charging - 10 mins charge for 5 hours playback</li>
      <li>Built-in microphone for calls</li>
      <li>Touch controls for easy operation</li>
    </ul>
    <p>Perfect for travel, work, or relaxing at home. These headphones deliver exceptional audio performance in any environment.</p>
  `,
  price: 199.99,
  sale_price: 149.99,
  on_sale: true,
  sku: "WH-1000XM4",
  stock_quantity: 45,
  low_stock_threshold: 10,
  stock_status: "in_stock",
  manage_stock: true,
  main_image_path: "https://placehold.co/600x600?text=Headphones",
  product_images: [
    "https://placehold.co/600x600?text=Headphones+Front",
    "https://placehold.co/600x600?text=Headphones+Side",
    "https://placehold.co/600x600?text=Headphones+Back",
    "https://placehold.co/600x600?text=Headphones+Case",
  ],
  weight: "0.25",
  length: "7.5",
  width: "6.5",
  height: "3.2",
  featured: true,
  is_digital: false,
  is_downloadable: false,
  status: "published",
  average_rating: 4.8,
  review_count: 236,
  categories: ["Electronics", "Audio", "Wireless"],
  colors: ["Black", "Silver", "Blue"],
  related_products: [2, 3, 4, 5]
};

// Related products for display
const relatedProducts = [
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 89.99,
    sale_price: null,
    on_sale: false,
    image: "https://placehold.co/300x300?text=Earbuds",
    average_rating: 4.6,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 129.99,
    sale_price: 99.99,
    on_sale: true,
    image: "https://placehold.co/300x300?text=Speaker",
    average_rating: 4.7,
  },
  {
    id: 4,
    name: "Audio Cable",
    price: 19.99,
    sale_price: null,
    on_sale: false,
    image: "https://placehold.co/300x300?text=Cable",
    average_rating: 4.4,
  },
  {
    id: 5,
    name: "Headphone Stand",
    price: 35.99,
    sale_price: 29.99,
    on_sale: true,
    image: "https://placehold.co/300x300?text=Stand",
    average_rating: 4.9,
  }
];

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(mockProduct);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [cartItemCount, setCartItemCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Fetch product data when component mounts
  useEffect(() => {
    // This would be replaced with an API call to get product by ID
    // api.getProduct(id).then(res => setProduct(res.data));
    
    window.scrollTo(0, 0);
  }, [id]);

  // Helper function to render stars based on rating
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
    
    // Add empty stars to make 5 stars
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

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock_quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: window.location.pathname } } });
      return;
    }
    
    setLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      setAddedToCart(true);
      setCartItemCount(prev => prev + quantity);
      
      // Reset the "Added to cart" message after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }, 800);
    
    // Actual API call would be:
    // api.addToCart(product.id, quantity)
    //   .then(() => {
    //     setLoading(false);
    //     setAddedToCart(true);
    //     setTimeout(() => setAddedToCart(false), 3000);
    //   })
    //   .catch(err => {
    //     setLoading(false);
    //     console.error("Failed to add to cart", err);
    //   });
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar theme="yellow" cartItemsCount={cartItemCount} />
      
      {/* Breadcrumbs */}
      <div className="bg-amber-100">
        <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
          <nav className="flex text-sm">
            <Link to="/" className="text-amber-600 hover:text-amber-800">Home</Link>
            <span className="mx-2 text-amber-400">/</span>
            {product.categories?.map((category, index) => (
              <React.Fragment key={category}>
                <Link to={`/categories/${category.toLowerCase()}`} className="text-amber-600 hover:text-amber-800">
                  {category}
                </Link>
                {index < product.categories.length - 1 && <span className="mx-2 text-amber-400">/</span>}
              </React.Fragment>
            ))}
            <span className="mx-2 text-amber-400">/</span>
            <span className="text-amber-800 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>
      
      {/* Main product section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Product images */}
          <div>
            <div className="overflow-hidden rounded-lg mb-4 border border-amber-200">
              <img 
                src={product.product_images?.[selectedImage] || product.main_image_path} 
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Thumbnail images */}
            {product.product_images && product.product_images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.product_images.map((image, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? 'border-amber-500' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-20 h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            {/* Ratings */}
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderRatingStars(product.average_rating)}
              </div>
              <span className="text-amber-600 font-medium">
                {product.average_rating.toFixed(1)} ({product.review_count} {product.review_count === 1 ? 'review' : 'reviews'})
              </span>
            </div>
            
            {/* SKU */}
            <div className="text-sm text-gray-500 mb-4">
              SKU: {product.sku}
            </div>
            
            {/* Price */}
            <div className="mb-6">
              {product.on_sale && product.sale_price ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-amber-600 mr-3">
                    ${product.sale_price.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="ml-3 px-2 py-1 text-sm font-semibold text-white bg-red-500 rounded-md">
                    SAVE {Math.round(((product.price - product.sale_price) / product.price) * 100)}%
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-amber-600">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Short description */}
            <div className="mb-6 text-gray-600">
              {product.short_description}
            </div>
            
            {/* Stock status */}
            <div className="mb-6">
              {product.stock_status === 'in_stock' ? (
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>In Stock ({product.stock_quantity} available)</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Out of Stock</span>
                </div>
              )}
            </div>
            
            {/* Color options */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm text-gray-700 font-medium mb-2">Colors</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 hover:bg-amber-50"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity selector */}
            {product.stock_status === 'in_stock' && (
              <div className="mb-6">
                <h3 className="text-sm text-gray-700 font-medium mb-2">Quantity</h3>
                <div className="flex">
                  <button 
                    className="px-3 py-1 bg-amber-200 text-amber-800 border border-amber-300 rounded-l-md hover:bg-amber-300"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock_quantity}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 px-2 py-1 text-center border-t border-b border-amber-300 focus:outline-none"
                  />
                  <button 
                    className="px-3 py-1 bg-amber-200 text-amber-800 border border-amber-300 rounded-r-md hover:bg-amber-300"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock_quantity}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            
            {/* Add to cart button */}
            <div className="mb-6">
              <button
                onClick={handleAddToCart}
                disabled={loading || product.stock_status !== 'in_stock'}
                className={`w-full py-3 px-4 flex items-center justify-center rounded-md font-medium ${
                  product.stock_status === 'in_stock'
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-gray-300 cursor-not-allowed text-gray-500'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding to cart...
                  </>
                ) : addedToCart ? (
                  <>
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Added to cart!
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
            </div>
            
            {/* Product specs */}
            <div className="mb-6 border-t border-gray-200 pt-4">
              <h3 className="text-sm text-gray-700 font-medium mb-2">Quick Specs</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                {/* Weight */}
                <div className="border-b border-gray-200 pb-2">
                  <dt className="text-sm font-medium text-gray-500">Weight</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.weight} kg</dd>
                </div>
                
                {/* Dimensions */}
                <div className="border-b border-gray-200 pb-2">
                  <dt className="text-sm font-medium text-gray-500">Dimensions</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.length} × {product.width} × {product.height} cm</dd>
                </div>
                
                {/* Is Downloadable */}
                <div className="border-b border-gray-200 pb-2">
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.is_digital ? 'Digital Product' : 'Physical Product'}</dd>
                </div>
                
                {/* Featured */}
                {product.featured && (
                  <div className="border-b border-gray-200 pb-2">
                    <dt className="text-sm font-medium text-gray-500">Product Status</dt>
                    <dd className="mt-1 text-sm text-amber-600 font-medium">Featured Product</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      
        {/* Product tabs */}
        <div className="mt-12 border-t border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'specifications'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews ({product.review_count})
              </button>
            </nav>
          </div>
          
          <div className="py-6">
            {/* Description tab */}
            {activeTab === 'description' && (
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
            )}
            
            {/* Specifications tab */}
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <h3 className="text-lg font-medium text-amber-800 mb-3">Product Specifications</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 border-b border-amber-200 pb-2">
                      <div className="col-span-1 text-sm font-medium text-amber-700">SKU</div>
                      <div className="col-span-2 text-sm text-gray-600">{product.sku}</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-amber-200 pb-2">
                      <div className="col-span-1 text-sm font-medium text-amber-700">Weight</div>
                      <div className="col-span-2 text-sm text-gray-600">{product.weight} kg</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-amber-200 pb-2">
                      <div className="col-span-1 text-sm font-medium text-amber-700">Dimensions</div>
                      <div className="col-span-2 text-sm text-gray-600">{product.length} × {product.width} × {product.height} cm</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-amber-200 pb-2">
                      <div className="col-span-1 text-sm font-medium text-amber-700">Colors</div>
                      <div className="col-span-2 text-sm text-gray-600">{product.colors?.join(', ')}</div>
                    </div>
                    <div className="grid grid-cols-3 border-b border-amber-200 pb-2">
                      <div className="col-span-1 text-sm font-medium text-amber-700">Stock</div>
                      <div className="col-span-2 text-sm text-gray-600">{product.stock_quantity} units</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Reviews tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Reviews summary */}
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <h3 className="text-lg font-medium text-amber-800 mb-3">Customer Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {renderRatingStars(product.average_rating)}
                    </div>
                    <span className="text-xl font-semibold text-amber-600 mr-2">
                      {product.average_rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      based on {product.review_count} {product.review_count === 1 ? 'review' : 'reviews'}
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <button 
                      onClick={() => {
                        if (!isAuthenticated) {
                          navigate('/login', { state: { from: { pathname: window.location.pathname } } });
                        } else {
                          // Handle writing review
                        }
                      }}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-sm font-medium"
                    >
                      Write a Review
                    </button>
                  </div>
                </div>
                
                {/* Sample reviews - in a real app, these would come from an API */}
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {renderRatingStars(5)}
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        John D. - <span className="text-gray-400">2 weeks ago</span>
                      </span>
                    </div>
                    <h4 className="text-base font-semibold mb-1">Amazing sound quality!</h4>
                    <p className="text-gray-600">
                      These headphones have incredible sound quality. The noise cancellation is also top-notch.
                      Battery life exceeds expectations. Highly recommend to anyone looking for premium wireless headphones.
                    </p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {renderRatingStars(4)}
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        Sarah M. - <span className="text-gray-400">1 month ago</span>
                      </span>
                    </div>
                    <h4 className="text-base font-semibold mb-1">Great but a bit heavy</h4>
                    <p className="text-gray-600">
                      The sound is fantastic and I love the noise cancellation feature. My only complaint is that
                      they get a bit uncomfortable after wearing them for several hours. Still worth it for the quality though.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related products */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-amber-100"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10">{product.name}</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {renderRatingStars(product.average_rating)}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    {product.on_sale && product.sale_price ? (
                      <div>
                        <span className="text-lg font-bold text-amber-600 mr-1">${product.sale_price.toFixed(2)}</span>
                        <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-amber-600">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

