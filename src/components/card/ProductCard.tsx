// filepath: c:\Users\Chivo\Documents\Ecommerce\ecommerce-app\src\components\ProductCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface ProductCardProps {
  product: Product;
  theme?: 'default' | 'yellow';
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, theme = 'default', onClick }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Choose styles based on theme
  const cardStyles = theme === 'yellow' 
    ? 'border border-amber-200 hover:border-amber-400 hover:shadow-lg'
    : 'border hover:shadow-lg';

  const priceStyles = theme === 'yellow'
    ? 'text-amber-700 font-bold'
    : 'text-gray-900 font-semibold';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: window.location.pathname } } });
      return;
    }
    
    // Add to cart logic here
    // api.addToCart(product.id, 1)...
  };

  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden ${cardStyles} transition-all duration-200`}
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-40 object-cover" 
        />
        {theme === 'yellow' && (
          <div className="absolute bottom-0 left-0 bg-amber-100 px-2 py-1 text-xs text-amber-800 font-medium">
            {product.category || 'General'}
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-2 h-10">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <p className={priceStyles}>${product.price.toFixed(2)}</p>
          {theme === 'yellow' && (
            <button 
              className="text-xs bg-amber-500 hover:bg-amber-600 text-white px-2 py-1 rounded"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
        {theme === 'yellow' && (
          <div className="mt-1 text-xs text-gray-500">
            Sales: 2.5k+ | ⭐⭐⭐⭐½
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;