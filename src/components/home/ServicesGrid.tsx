"use client";

import { Service } from "@/lib/servicesData";
import { motion } from "framer-motion";
import { useGetServicesQuery } from "@/services/api";
import Link from "next/link";
import { LuArrowRight, LuCheck, LuTriangleAlert } from "react-icons/lu";
import { IconType } from "react-icons";
import {
  FaCode,
  FaUsers,
  FaGem,
  FaBolt,
  FaAward,
  FaPen,
  FaSearch,
  FaRocket,
  FaLifeRing,
  FaCheckCircle,
  FaServer,
  FaShoppingCart
} from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import { LuBrainCircuit } from "react-icons/lu";
import { Button } from "../ui/button";

// Extended Service interface to handle API data where Icon might be a string
interface ApiService extends Omit<Service, 'Icon'> {
  Icon: string | IconType;
}

// Map icon names to React icon components
const iconMap: Record<string, IconType> = {
  Code: FaCode,
  Users: FaUsers,
  Gem: FaGem,
  Zap: FaBolt,
  Award: FaAward,
  PenTool: FaPen,
  Search: FaSearch,
  Rocket: FaRocket,
  LifeBuoy: FaLifeRing,
  CheckCircle: FaCheckCircle,
  Server: FaServer,
  ShoppingCart: FaShoppingCart,
  Smartphone: FiSmartphone,
  BrainCircuit: LuBrainCircuit,
  // Add fallback mappings for common icon names
  FaCode: FaCode,
  FaServer: FaServer,
  FiSmartphone: FiSmartphone,
  FaShoppingCart: FaShoppingCart,
  LuBrainCircuit: LuBrainCircuit,
  FiPenTool: FaPen,
};

// Skeleton component for loading state
const ServicesGridSkeleton = () => {
  return (
    <div className="container max-w-7xl">
      <div className="text-center mb-12 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse flex flex-col h-full bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gray-200 rounded-lg w-12 h-12 mr-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-full mt-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ServicesGrid() {
  const { data: servicesData, isLoading, isError, error, refetch } = useGetServicesQuery(undefined);

  // Handle loading state
  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-background">
        <ServicesGridSkeleton />
      </section>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <section className="py-12 md:py-16 bg-background">
        <div className="container max-w-7xl">
          <div className="border border-destructive/50 bg-destructive/5 text-center p-6 rounded-xl">
            <div className="flex justify-center mb-3">
                <LuTriangleAlert className="w-10 h-10 text-destructive" />
            </div>
            <h3 className="text-lg font-bold text-destructive">Oops! Something went wrong.</h3>
            <p className="text-destructive/80 mt-1 mb-4 text-sm">
              We couldn't load our services right now. Please try again in a few moments.
            </p>
            <Button onClick={() => refetch()} variant="destructive" size="sm">
                Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Ensure servicesData.data is an array, fallback to empty array if undefined
  const publishedServices = servicesData?.data?.filter((s: ApiService) => s.published) || [];

  return (
    <section className="py-12 md:pb-16 pt-5 bg-background">
      <div className="container max-w-7xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
        </motion.div>
        {publishedServices.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>No published services available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedServices.map((service: ApiService, index: number) => {
              // Get the icon from the service data, fallback to Code icon
              // Handle both string icon names (from API) and IconType components (from local data)
              let ServiceIcon;
              if (typeof service.Icon === 'string') {
                // If Icon is a string, use it as a key in iconMap
                ServiceIcon = iconMap[service.Icon] || iconMap.Code;
              } else if (service.Icon && typeof service.Icon === 'function') {
                // If Icon is already an IconType component, use it directly
                ServiceIcon = service.Icon;
              } else {
                // Fallback to Code icon
                ServiceIcon = iconMap.Code;
              }
              
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Link
                    href={`/services/${service._id}`}
                    className="block h-full"
                  >
                    <div className="relative h-full">
                      {/* Glow effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
                      
                      {/* Main card with gradient background */}
                      <div className="relative h-full flex flex-col bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-transparent p-6">
                        <div className="flex items-start mb-5">
                          {/* Icon container with gradient background */}
                          <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl mr-4 shadow-md">
                            <ServiceIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                              {service.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {service.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          {service.offerings.slice(0, 2).map((offering, idx) => (
                            <motion.div 
                              key={offering.title} 
                              className="flex items-center gap-3"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: idx * 0.1 }}
                            >
                              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                <LuCheck className="w-3 h-3 text-blue-600" />
                              </div>
                              <span className="text-sm text-gray-700">{offering.title}</span>
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="mt-auto">
                          <div className="inline-flex items-center font-semibold text-blue-600 group-hover:text-blue-700 transition-colors duration-300 overflow-hidden py-2 px-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100">
                            <span className="relative z-10 flex items-center text-sm">
                              Learn More
                              <LuArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
