"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetCentersQuery } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

interface College {
  _id: string;
  name: string;
  partnerId: {
    _id: string;
    name: string;
    logo: string;
    location: string;
    order: number;
  };
  location: string;
  headOfCenter: string;
  contactEmail: string;
  isActive: boolean;
}

export default function CollegeLocator() {
  const { data: centers, isLoading, error } = useGetCentersQuery(undefined);

  // State to track selected college
  const [selectedCollegeId, setSelectedCollegeId] = useState<string | null>(null);

  // Truncate college name to first two words followed by "..."
  const truncateName = (name: string) => {
    const words = name.split(" ");
    if (words.length > 2) {
      return words.slice(0, 2).join(" ") + " ...";
    }
    return name;
  };

  // Get the selected college
  const selectedCollege = centers?.data.find(
    (college: College) => college._id === selectedCollegeId
  );

  // Generate embed URL based on partnerId.location
  const getMapEmbedUrl = (college: College | undefined) => {
    if (!college) {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.047111496!2d73.7805667!3d18.524545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1628588042466!5m2!1sen!2sin";
    }
    const locationQuery = encodeURIComponent(college.partnerId.location);
    // Approximate embed URL without API key
    return `https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d121059!2d73.7805667!3d18.524545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s${locationQuery}!5e0!3m2!1sen!2sin`;
  };

  // Map location for the iframe
  const mapLocation = getMapEmbedUrl(selectedCollege);

  // Skeleton loader for map
  const MapSkeleton = () => (
    <div className="lg:col-span-2 aspect-[4/3] w-full rounded-lg overflow-hidden border-2 border-primary/10 shadow-xl">
      <Skeleton className="w-full h-full bg-gray-200" />
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Find an Excellence Center Near You
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Explore our network of partner colleges across the region. Use the
            filters to narrow your search.
          </p>
        </div>
        {error ? (
          <div className="text-center text-red-500">
            Error: Failed to load centers. Please try again later.
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="font-bold text-primary mb-4">Filter by College</h3>
                <div className="flex flex-wrap gap-2">
                  {isLoading ? (
                    // Render skeleton buttons during loading
                    Array.from({ length: 5 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-8 w-32 rounded-md bg-gray-200"
                      />
                    ))
                  ) : (
                    centers?.data.map((college: College) => (
                      <Button
                        key={college._id}
                        variant={
                          selectedCollegeId === college._id ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          setSelectedCollegeId(
                            selectedCollegeId === college._id
                              ? null
                              : college._id
                          )
                        }
                        className="truncate max-w-40"
                        title={college.name} // Show full name on hover
                      >
                        {truncateName(college.name)}
                      </Button>
                    ))
                  )}
                </div>
              </div>
            </div>
            {isLoading ? (
              <MapSkeleton />
            ) : (
              <div className="lg:col-span-2 aspect-[4/3] w-full rounded-lg overflow-hidden border-2 border-primary/10 shadow-xl">
                <iframe
                  src={mapLocation}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}