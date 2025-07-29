"use client";

import { useGetECJourneyQuery } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { ComponentType } from "react";
import {
  LuBriefcase,
  LuBuilding2,
  LuFlag,
  LuGlobe,
  LuRocket,
  LuStar,
  LuTarget,
  LuTrendingUp,
} from "react-icons/lu";

// Icon mapping for dynamic icons
const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  LuFlag,
  LuBriefcase,
  LuBuilding2,
  LuRocket,
  LuGlobe,
  LuStar,
  LuTarget,
  LuTrendingUp,
};

// Define Milestone interface based on API data
interface Milestone {
  _id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Milestones() {
  const {
    data: milestonesData,
    isLoading,
    error,
  } = useGetECJourneyQuery(true);
  
  // Handle nested data or fallback to empty array
  const milestones = Array.isArray(milestonesData?.data)
    ? milestonesData.data
    : Array.isArray(milestonesData)
      ? milestonesData
      : [];

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-secondary min-h-screen">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Our Journey
            </h2>
            <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
              Tracing the milestones that have shaped our growth and defined our
              path to excellence.
            </p>
          </div>
          <div className="relative">
            <div
              className="absolute left-4 md:left-1/2 w-0.5 h-full bg-border -translate-x-1/2"
              aria-hidden="true"
            >
              <div className="absolute top-0 w-3 h-3 bg-primary rounded-full -translate-x-[calc(50%-1px)]"></div>
              <div className="absolute bottom-0 w-3 h-3 bg-primary rounded-full -translate-x-[calc(50%-1px)]"></div>
            </div>
            <div className="space-y-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="relative flex items-center md:justify-normal md:odd:flex-row-reverse"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 absolute left-4 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 z-10">
                    <Skeleton className="w-4 h-4 rounded-full bg-gray-200" />
                  </div>
                  <div className="w-full md:w-[calc(50%-2.5rem)] bg-background p-6 rounded-lg shadow-md border border-transparent ml-14 md:ml-0">
                    <Skeleton className="h-5 w-24 mb-1 bg-gray-200" />
                    <Skeleton className="h-6 w-3/4 mb-2 bg-gray-200" />
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-5/6 mt-1 bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || milestones.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-secondary min-h-screen">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Our Journey
            </h2>
            <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
              Tracing the milestones that have shaped our growth and defined our
              path to excellence.
            </p>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">
              {error ? "Failed to load milestones. Please try again later." : "No journey milestones available."}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-background min-h-screen">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Our Journey & Milestones
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Tracing our progress in establishing a network of excellence and
            empowering students.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-4 md:left-1/2 w-0.5 h-full bg-border -translate-x-1/2"
            aria-hidden="true"
          >
            <div className="absolute top-0 w-3 h-3 bg-primary rounded-full -translate-x-[calc(50%-1px)]"></div>
            <div className="absolute bottom-0 w-3 h-3 bg-primary rounded-full -translate-x-[calc(50%-1px)]"></div>
          </div>
          <div className="space-y-8">
            {milestones.map((item: Milestone, index: number) => {
              const IconComponent = iconMap[item.icon] || LuFlag;
              return (
                <div
                  key={item._id}
                  className="relative flex items-center md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary absolute left-4 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 z-10 ring-8 ring-background group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="w-full md:w-[calc(50%-2.5rem)] bg-background p-6 rounded-lg shadow-md border border-transparent md:group-odd:ml-auto md:group-even:mr-auto group-hover:border-accent group-hover:shadow-lg transition-all duration-300 ml-14 md:ml-0">
                    <p className="text-accent font-bold text-lg mb-1">
                      {item.year}
                    </p>
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}