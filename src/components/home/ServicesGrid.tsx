"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Service } from "@/lib/servicesData";
import { useGetServicesQuery } from "@/services/api";
import Link from "next/link";
import { LuArrowRight, LuCheck } from "react-icons/lu";
import { FaCode, FaMobileAlt, FaRobot } from "react-icons/fa";

// Map service titles to icons
const iconMap: Record<string, React.ComponentType> = {
  "Web Development": FaCode,
  "Mobile Development": FaMobileAlt,
  "AI Solutions": FaRobot,
};

// Skeleton component for loading state
const ServicesGridSkeleton = () => {
  return (
    <div className="container max-w-7xl">
      <div className="text-center mb-16 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="animate-pulse flex flex-col h-full">
            <CardHeader className="items-center text-center">
              <div className="p-4 bg-gray-200 rounded-full w-16 h-16 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mt-2"></div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4 pt-4">
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default function ServicesGrid() {
  const { data: servicesData, isLoading, isError, error } = useGetServicesQuery(undefined);

  console.log("servicesData", servicesData);

  // Handle loading state
  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <ServicesGridSkeleton />
      </section>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
            <h3 className="text-red-800 font-medium">Error loading services</h3>
            <p className="text-red-600 mt-1">
              {"Failed to load services. Please try again."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Ensure servicesData.data is an array, fallback to empty array if undefined
  const publishedServices = servicesData?.data?.filter((s: Service) => s.published) || [];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We offer a wide range of services to cover all your digital needs,
            from web development to AI-powered solutions.
          </p>
        </div>
        {publishedServices.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>No published services available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {publishedServices.map((service: Service) => {
              const ServiceIcon = iconMap[service.title] || FaCode; // Fallback to FaCode
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="block group h-full"
                >
                  <Card className="flex flex-col h-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 border-transparent hover:border-primary/20 bg-secondary/30">
                    <CardHeader className="items-center text-center">
                      <div className="p-4 bg-primary/10 rounded-full w-fit mb-4 transition-all duration-300 group-hover:bg-secondary group-hover:scale-110">
                        <ServiceIcon className="w-10 h-10 text-primary transition-colors group-hover:text-primary" />
                      </div>
                      <CardTitle className="text-2xl text-primary">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="px-4">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4 pt-4">
                      <h4 className="font-semibold text-center text-primary">
                        What's Included:
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {service.offerings.slice(0, 2).map((offering) => (
                          <li
                            key={offering.title}
                            className="flex items-center gap-3"
                          >
                            <LuCheck className="w-5 h-5 text-primary flex-shrink-0" />
                            <span>{offering.title}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <div className="relative inline-flex items-center justify-center font-semibold text-primary group-hover:text-primary-foreground transition-colors duration-300 overflow-hidden w-full text-center mt-4 rounded-md">
                        <span className="relative z-10 flex items-center py-2">
                          Learn More
                          <LuArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}