import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/layout/HeroSection";
import FilterSidebar from "../components/props/FilterSidebar";
import VendorCard from "../components/card/VendorCard";
import EmptyState from "../components/layout/EmptyState";
import SortToolbar from "../components/props/SortToolbar";

// Mock data imports
const vendorCategories = [
    { id: 1, name: "Electronics", count: 18 },
    { id: 2, name: "Fashion", count: 24 },
    { id: 3, name: "Home & Kitchen", count: 15 },
    { id: 4, name: "Beauty & Personal Care", count: 12 },
    { id: 5, name: "Food & Grocery", count: 9 },
    { id: 6, name: "Sports & Outdoors", count: 7 },
];

// Mock vendors data
const mockVendors = [
    {
        id: 1,
        name: "Golden Tech Marketplace",
        slug: "golden-tech",
        logo: "https://placehold.co/200x200?text=GT",
        coverImage: "https://placehold.co/400x100?text=GoldenTech",
        shortDescription: "Premium electronics and tech accessories",
        productCount: 67,
        rating: 4.7,
        reviewCount: 128,
        verified: true,
        featured: true,
        categories: ["Electronics", "Accessories"],
        location: "San Francisco, CA",
        joinedDate: "2020-05-15"
    },
    {
        id: 2,
        name: "Fashion Forward",
        slug: "fashion-forward",
        logo: "https://placehold.co/200x200?text=FF",
        coverImage: "https://placehold.co/400x100?text=FashionForward",
        shortDescription: "Trendy clothing and accessories for all seasons",
        productCount: 124,
        rating: 4.5,
        reviewCount: 215,
        verified: true,
        featured: true,
        categories: ["Fashion", "Accessories"],
        location: "New York, NY",
        joinedDate: "2019-11-23"
    },
    {
        id: 3,
        name: "Home Essentials",
        slug: "home-essentials",
        logo: "https://placehold.co/200x200?text=HE",
        coverImage: "https://placehold.co/400x100?text=HomeEssentials",
        shortDescription: "Everything you need for modern living",
        productCount: 85,
        rating: 4.3,
        reviewCount: 92,
        verified: true,
        featured: false,
        categories: ["Home & Kitchen", "Furniture"],
        location: "Chicago, IL",
        joinedDate: "2021-02-08"
    },
    {
        id: 4,
        name: "Beauty Haven",
        slug: "beauty-haven",
        logo: "https://placehold.co/200x200?text=BH",
        coverImage: "https://placehold.co/400x100?text=BeautyHaven",
        shortDescription: "Premium skincare and beauty products",
        productCount: 56,
        rating: 4.8,
        reviewCount: 143,
        verified: true,
        featured: false,
        categories: ["Beauty & Personal Care"],
        location: "Los Angeles, CA",
        joinedDate: "2020-08-19"
    },
    {
        id: 5,
        name: "Outdoor Adventures",
        slug: "outdoor-adventures",
        logo: "https://placehold.co/200x200?text=OA",
        coverImage: "https://placehold.co/400x100?text=OutdoorAdventures",
        shortDescription: "Gear for camping, hiking, and outdoor activities",
        productCount: 42,
        rating: 4.6,
        reviewCount: 78,
        verified: true,
        featured: false,
        categories: ["Sports & Outdoors"],
        location: "Denver, CO",
        joinedDate: "2021-04-12"
    },
    {
        id: 6,
        name: "Gourmet Delights",
        slug: "gourmet-delights",
        logo: "https://placehold.co/200x200?text=GD",
        coverImage: "https://placehold.co/400x100?text=GourmetDelights",
        shortDescription: "Artisanal foods and specialty ingredients",
        productCount: 37,
        rating: 4.9,
        reviewCount: 64,
        verified: true,
        featured: false,
        categories: ["Food & Grocery"],
        location: "Portland, OR",
        joinedDate: "2020-11-05"
    },
    {
        id: 7,
        name: "Tech Innovation",
        slug: "tech-innovation",
        logo: "https://placehold.co/200x200?text=TI",
        coverImage: "https://placehold.co/400x100?text=TechInnovation",
        shortDescription: "Cutting-edge gadgets and smart home solutions",
        productCount: 29,
        rating: 4.4,
        reviewCount: 51,
        verified: true,
        featured: false,
        categories: ["Electronics", "Smart Home"],
        location: "Seattle, WA",
        joinedDate: "2021-01-30"
    },
    {
        id: 8,
        name: "Kids Wonderland",
        slug: "kids-wonderland",
        logo: "https://placehold.co/200x200?text=KW",
        coverImage: "https://placehold.co/400x100?text=KidsWonderland",
        shortDescription: "Toys, games, and educational products for children",
        productCount: 68,
        rating: 4.7,
        reviewCount: 89,
        verified: true,
        featured: false,
        categories: ["Toys & Games", "Education"],
        location: "Austin, TX",
        joinedDate: "2020-07-24"
    }
];

const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "rating", label: "Top Rated" },
    { value: "products", label: "Most Products" },
    { value: "newest", label: "Newest" },
    { value: "name_asc", label: "Name (A-Z)" }
];

const VendorPage: React.FC = () => {
    const navigate = useNavigate();
    const [vendors, setVendors] = useState(mockVendors);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState("featured");
    const [filteredVendors, setFilteredVendors] = useState(mockVendors);
    const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

    useEffect(() => {
        // Simulate loading data
        setLoading(true);
        setTimeout(() => {
            setVendors(mockVendors);
            setLoading(false);
        }, 800);

        // In a real app, you would fetch vendors from API:
        // api.getVendors().then(response => {
        //   setVendors(response.data);
        //   setLoading(false);
        // });
    }, []);

    useEffect(() => {
        // Apply filters and sorting
        let results = [...vendors];

        // Filter by search term
        if (searchTerm) {
            results = results.filter(vendor =>
                vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vendor.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory !== null) {
            const categoryName = vendorCategories.find(cat => cat.id === selectedCategory)?.name;
            if (categoryName) {
                results = results.filter(vendor =>
                    vendor.categories.includes(categoryName)
                );
            }
        }

        // Filter by verified
        if (showVerifiedOnly) {
            results = results.filter(vendor => vendor.verified);
        }

        // Apply sorting
        switch (sortBy) {
            case "featured":
                results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
            case "rating":
                results.sort((a, b) => b.rating - a.rating);
                break;
            case "products":
                results.sort((a, b) => b.productCount - a.productCount);
                break;
            case "newest":
                results.sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime());
                break;
            case "name_asc":
                results.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        setFilteredVendors(results);
    }, [vendors, searchTerm, selectedCategory, sortBy, showVerifiedOnly]);

    const handleCategoryChange = (categoryId: number) => {
        setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    };

    const handleVendorClick = (slug: string) => {
        navigate(`/vendors/${slug}`);
    };

    const handleClearFilters = () => {
        setSearchTerm("");
        setSelectedCategory(null);
        setShowVerifiedOnly(false);
        setSortBy("featured");
    };

    // Skeleton loading placeholder
    const VendorCardSkeleton = () => (
        <div className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden animate-pulse">
            <div className="h-32 bg-gray-200"></div>
            <div className="p-4">
                <div className="relative -mt-12 flex justify-center">
                    <div className="h-16 w-16 rounded-lg bg-gray-200 border-2 border-white"></div>
                </div>
                <div className="mt-2">
                    <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="flex justify-between items-center">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-amber-50">
            <Navbar theme="yellow" />

            <HeroSection
                title="Discover Amazing Vendors"
                subtitle="Shop from our curated selection of premium vendors offering quality products"
                backgroundImage="https://placehold.co/1600x400?text=Discover+Amazing+Vendors"
                searchPlaceholder="Search for vendors..."
                onSearch={setSearchTerm}
                searchValue={searchTerm}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row">
                    <FilterSidebar
                        categories={vendorCategories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                        showVerifiedOnly={showVerifiedOnly}
                        onVerifiedChange={setShowVerifiedOnly}
                    />

                    <div className="lg:ml-8 flex-1">
                        <SortToolbar
                            count={filteredVendors.length}
                            itemName="vendor"
                            sortOptions={sortOptions}
                            currentSort={sortBy}
                            onSortChange={setSortBy}
                        />

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <VendorCardSkeleton key={i} />
                                ))}
                            </div>
                        ) : (
                            filteredVendors.length === 0 ? (
                                <EmptyState
                                    title="No vendors found"
                                    message="Try changing your search criteria or filters"
                                    actionText="Clear all filters"
                                    onAction={handleClearFilters}
                                />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredVendors.map((vendor) => (
                                        <VendorCard
                                            key={vendor.id}
                                            vendor={vendor}
                                            onClick={handleVendorClick}
                                        />
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Call to Action - Become a Seller */}
            <section className="bg-amber-600 mt-12">
                <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Ready to start selling?</span>
                        <span className="block text-amber-200">Join our marketplace today.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <a
                                href="/vendor-application"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-amber-600 bg-white hover:bg-amber-50"
                            >
                                Apply Now
                            </a>
                        </div>
                        <div className="ml-3 inline-flex rounded-md shadow">
                            <a
                                href="/vendor-benefits"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-700 hover:bg-amber-800"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VendorPage;