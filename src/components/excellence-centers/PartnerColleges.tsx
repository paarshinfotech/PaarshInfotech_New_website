"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useGetPartnersQuery } from "@/services/api";

interface PartnerCollege {
  name: string;
  logo: string;
}

export default function PartnerColleges() {
  const { data: PartnerData, isLoading } = useGetPartnersQuery(undefined);

  // Duplicate partners for marquee effect
  const partners = PartnerData?.data || [];
  const extendedPartners = [...partners, ...partners];

  // Skeleton component for loading state
  const SkeletonCard = () => (
    <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/5 p-4">
      <Card className="p-6 flex flex-col items-center justify-center aspect-square bg-background shadow-md">
        <div className="relative w-24 h-24 mb-4 animate-pulse">
          <div className="w-full h-full bg-gray-200 rounded"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      </Card>
    </div>
  );

  return (
    <section id="partners" className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Our Academic Partners
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We are proud to collaborate with these esteemed institutions to
            shape the future of technology education.
          </p>
        </div>
        <div className="relative w-full overflow-hidden group">
          <div className="flex animate-marquee-left group-hover:[animation-play-state:paused]">
            {isLoading
              ? // Render 10 skeleton cards during loading
                Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)
              : extendedPartners.map((college: PartnerCollege, index: number) => (
                  <div
                    key={`${college.name}-${index}`}
                    className="flex-shrink-0 w-full md:w-1/2 lg:w-1/5 p-4"
                  >
                    <Card
                      className="p-6 flex flex-col items-center justify-center aspect-square transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer bg-background"
                    >
                      <div className="relative w-24 h-24 mb-4">
                        <Image
                          src={college.logo}
                          alt={`${college.name} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="text-center font-semibold text-primary">
                        {college.name}
                      </p>
                    </Card>
                  </div>
                ))}
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-secondary via-transparent to-secondary"></div>
        </div>
      </div>
    </section>
  );
}