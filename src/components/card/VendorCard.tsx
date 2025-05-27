import React from 'react';
import StarRating from '../props/StarRating';

interface VendorCardProps {
    vendor: {
        id: number;
        name: string;
        slug: string;
        logo: string;
        coverImage: string;
        shortDescription: string;
        productCount: number;
        rating: number;
        reviewCount: number;
        verified: boolean;
        featured: boolean;
        location: string;
    };
    onClick: (slug: string) => void;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor, onClick }) => {
    return (
        <div
            onClick={() => onClick(vendor.slug)}
            className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
        >
            {/* Cover Image */}
            <div className="h-32 bg-amber-600 relative">
                <img
                    src={vendor.coverImage}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                />
                {vendor.featured && (
                    <div className="absolute top-2 left-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500 text-white">
                            <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            Featured
                        </span>
                    </div>
                )}
            </div>

            <div className="p-4">
                {/* Vendor Logo */}
                <div className="relative -mt-12 flex justify-center">
                    <div className="h-16 w-16 rounded-lg bg-white shadow overflow-hidden border-2 border-white">
                        <img
                            src={vendor.logo}
                            alt={vendor.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                <div className="mt-2 text-center">
                    {/* Vendor Name */}
                    <div className="flex items-center justify-center">
                        <h3 className="text-lg font-semibold text-amber-900">{vendor.name}</h3>
                        {vendor.verified && (
                            <span className="ml-1.5" title="Verified Vendor">
                                <svg className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </span>
                        )}
                    </div>

                    {/* Short Description */}
                    <p className="mt-1 text-gray-600 text-sm h-10 overflow-hidden">
                        {vendor.shortDescription}
                    </p>

                    {/* Rating and Products */}
                    <div className="mt-3 flex justify-between items-center">
                        <div className="flex items-center">
                            <StarRating rating={vendor.rating} showCount={true} reviewCount={vendor.reviewCount} size="sm" />
                        </div>
                        <span className="text-xs font-medium text-amber-800">
                            {vendor.productCount} Products
                        </span>
                    </div>

                    {/* Location */}
                    <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                        <span className="flex items-center justify-center">
                            <svg className="h-3 w-3 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {vendor.location}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorCard;