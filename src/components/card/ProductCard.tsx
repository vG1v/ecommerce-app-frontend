import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  salePrice?: number;
  onSale?: boolean;
  rating?: number;
  reviewCount?: number;
}

interface ProductCardProps {
  product: Product;
  theme?: 'default' | 'yellow';
  onClick?: () => void;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  theme = 'default', 
  onClick,
  onAddToCart
}) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Choose styles based on theme
  const cardStyles = theme === 'yellow' 
    ? 'border border-amber-200 hover:border-amber-400 hover:shadow-lg'
    : 'border hover:shadow-lg';

  const priceStyles = theme === 'yellow'
    ? 'text-amber-700 font-bold'
    : 'text-gray-900 font-semibold';

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: window.location.pathname } } });
      return;
    }
    
    if (onAddToCart) {
      onAddToCart();
    }
  };

  // Render stars based on actual rating
  const renderStars = (rating?: number) => {
    if (!rating) return 'No ratings';
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '½';
    stars += '☆'.repeat(5 - Math.ceil(rating));
    
    return stars;
  };

  const formatPrice = (price: any): string => {
    if (price === null || price === undefined) return '0.00';
    
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    if (isNaN(numericPrice)) return '0.00';
    
    return numericPrice.toFixed(2);
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
          <div>
            {product.onSale && product.salePrice ? (
              <>
                <p className={priceStyles}>${formatPrice(product.salePrice)}</p>
                <p className="text-xs text-gray-400 line-through">${formatPrice(product.price)}</p>
              </>
            ) : (
              <p className={priceStyles}>${formatPrice(product.price)}</p>
            )}
          </div>
          
          {theme === 'yellow' && (
            <button 
              className="text-xs bg-amber-500 hover:bg-amber-600 text-white px-2 py-1 rounded"
              onClick={handleAddToCartClick}
            >
              Add to Cart
            </button>
          )}
        </div>
        {theme === 'yellow' && product.rating && (
          <div className="mt-1 text-xs text-gray-500">
            {product.reviewCount ? `${product.reviewCount} reviews | ` : ''}
            {renderStars(product.rating)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;