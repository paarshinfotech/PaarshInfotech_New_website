'use client';

import { useParams } from "next/navigation";
import { ServiceForm } from "@/components/admin/services/ServiceForm";
import type { Service } from "@/lib/servicesData";
import { useFetchServiceByIdQuery, useGetServicesQuery } from "@/services/api";

// Skeleton component for loading state
const ServiceFormSkeleton = () => {
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
                        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-24 bg-gray-200 rounded w-full"></div>
                    </div>
                    
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
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

export default function EditServicePage() {
    const params = useParams();

    console.log("Params:", params);
    const id = params.id;

    console.log("Service ID:", id);

    const { 
        data: serviceResponse, 
        isLoading: isServiceLoading, 
        error: serviceError 
    } = useFetchServiceByIdQuery(id);

    const { data: servicess } = useGetServicesQuery(undefined);

    console.log("serviceResponse", serviceResponse);

    // Show skeleton while loading
    if (isServiceLoading) {
        return <ServiceFormSkeleton />;
    }

    // Handle error state
    if (serviceError) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <h3 className="text-red-800 font-medium">Error loading service</h3>
                    <p className="text-red-600 mt-1">
                        Failed to load service data. Please try again.
                    </p>
                </div>
            </div>
        );
    }

    // Check if service data exists
    const service: Service | undefined = serviceResponse?.data;
    
    console.log("Service data:", service);

    // Show loading if service data is not available
    if (!service || Object.keys(service).length === 0) {
        return <ServiceFormSkeleton />;
    }

    return <ServiceForm service={service} />;
}