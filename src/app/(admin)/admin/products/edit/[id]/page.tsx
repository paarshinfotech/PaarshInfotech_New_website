"use client";

import { useParams } from "next/navigation";
import { ProductForm } from "@/components/admin/products/ProductForm";
import type { Product } from "@/lib/productsData";
import { useGetProductByIdQuery, useGetProductsQuery } from "@/services/api";

// Skeleton component for loading state
const ProductFormSkeleton = () => {
    return (
        <div className="p-8 space-y-6">
            <div className="animate-pulse">
                {/* Title skeleton */}
                <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
                
                {/* Form fields skeleton */}
                <div className="space-y-4">
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                    </div>
                    
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                    </div>
                    
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-24 bg-gray-200 rounded w-full"></div>
                    </div>
                    
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                    </div>
                    
                    {/* Button skeleton */}
                    <div className="flex gap-4 mt-6">
                        <div className="h-10 bg-gray-200 rounded w-24"></div>
                        <div className="h-10 bg-gray-200 rounded w-20"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function EditProductPage() {
    const params = useParams();
    const id = params.id;

    const { 
        data: productResponse, 
        isLoading: isProductLoading, 
        error: productError 
    } = useGetProductByIdQuery(id);

    const { data: products } = useGetProductsQuery(undefined);

    // Show skeleton while loading
    if (isProductLoading) {
        return <ProductFormSkeleton />;
    }

    // Handle error state
    if (productError) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <h3 className="text-red-800 font-medium">Error loading product</h3>
                    <p className="text-red-600 mt-1">
                        Failed to load product data. Please try again.
                    </p>
                </div>
            </div>
        );
    }

    // Check if product data exists
    const product: Product | undefined = productResponse?.data;

    // Show loading if product data is not available
    if (!product || Object.keys(product).length === 0) {
        return <ProductFormSkeleton />;
    }

    return <ProductForm product={product} />;
}