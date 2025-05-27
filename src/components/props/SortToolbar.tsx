import React from 'react';

interface SortOption {
  value: string;
  label: string;
}

interface SortToolbarProps {
  count: number;
  itemName: string;
  sortOptions: SortOption[];
  currentSort: string;
  onSortChange: (value: string) => void;
}

const SortToolbar: React.FC<SortToolbarProps> = ({
  count,
  itemName,
  sortOptions,
  currentSort,
  onSortChange
}) => {
  return (
    <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-amber-200">
      <div className="text-sm text-gray-600">
        {count} {count === 1 ? itemName : `${itemName}s`} found
      </div>
      <div className="flex items-center">
        <span className="mr-2 text-sm text-gray-600">Sort by:</span>
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortToolbar;