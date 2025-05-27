import React from 'react';
import StarRating from '../props/StarRating';

interface FilterCategory {
  id: number;
  name: string;
  count: number;
}

interface FilterSidebarProps {
  categories: FilterCategory[];
  selectedCategory: number | null;
  onCategoryChange: (id: number) => void;
  showVerifiedOnly?: boolean;
  onVerifiedChange?: (value: boolean) => void;
  minRating?: number;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  showVerifiedOnly = false,
  onVerifiedChange,
  minRating,
  onRatingChange,
  className = ""
}) => {
  return (
    <div className={`w-full lg:w-64 mb-6 lg:mb-0 ${className}`}>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-200">
        <h2 className="text-lg font-medium text-amber-800 mb-4">Filters</h2>
        
        {/* Category Filters */}
        <div className="mb-6">
          <h3 className="font-medium text-sm text-gray-700 mb-2">Categories</h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => onCategoryChange(-1)}
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
                  onClick={() => onCategoryChange(category.id)}
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
        </div>
        
        {/* Verified Filter */}
        {onVerifiedChange && (
          <div className="mb-6">
            <h3 className="font-medium text-sm text-gray-700 mb-2">Verification</h3>
            <div className="flex items-center">
              <input
                id="verified-only"
                type="checkbox"
                checked={showVerifiedOnly}
                onChange={() => onVerifiedChange(!showVerifiedOnly)}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label htmlFor="verified-only" className="ml-2 text-sm text-gray-700">
                Verified only
              </label>
            </div>
          </div>
        )}
        
        {/* Ratings Filter */}
        {onRatingChange && (
          <div>
            <h3 className="font-medium text-sm text-gray-700 mb-2">Rating</h3>
            <div className="space-y-1">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center">
                  <input
                    id={`rating-${rating}`}
                    type="radio"
                    name="rating"
                    checked={minRating === rating}
                    onChange={() => onRatingChange(rating)}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                  />
                  <label htmlFor={`rating-${rating}`} className="ml-2 flex items-center text-sm text-gray-700">
                    <StarRating rating={rating} />
                    <span className="ml-1">& up</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;