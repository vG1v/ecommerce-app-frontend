// filepath: c:\Users\Chivo\Documents\Ecommerce\ecommerce-app\src\components\ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-40 object-cover" 
      />
      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
        <p className="text-sm font-semibold text-gray-700 mt-1">${product.price.toFixed(2)}</p>
        <div className="mt-3">
          <Link 
            to={`/products/${product.id}`} 
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;