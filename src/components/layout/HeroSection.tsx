import React from 'react';
import SearchBar from '../props/SearchBar';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  overlayColor?: string;
  searchPlaceholder?: string;
  onSearch?: (term: string) => void;
  searchValue?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  overlayColor = 'bg-amber-700',
  searchPlaceholder = 'Search...',
  onSearch,
  searchValue = ''
}) => {
  return (
    <div className="relative bg-amber-600">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src={backgroundImage}
          alt={title}
        />
        <div className={`absolute inset-0 ${overlayColor} opacity-70`}></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-amber-100">
          {subtitle}
        </p>

        {onSearch && (
          <div className="mt-8 max-w-xl mx-auto">
            <SearchBar
              value={searchValue}
              onChange={onSearch}
              placeholder={searchPlaceholder}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;