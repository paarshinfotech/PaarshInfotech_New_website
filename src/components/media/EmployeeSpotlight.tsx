
"use client";

import Image from "next/image";
import { Card } from "../ui/card";
import { ImagePreviewModal } from "../common/ImagePreviewModal";
import { useGetMediaItemsQuery } from "@/services/api";
import { Skeleton } from "../ui/skeleton";

export default function EmployeeSpotlight() {
  const { data: spotlightData, isLoading } = useGetMediaItemsQuery('spotlight');
  const employeeSpotlight = spotlightData?.[0];

  if (isLoading) {
     return (
       <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8 items-center p-8">
             <Skeleton className="aspect-square w-full rounded-lg" />
             <div className="md:col-span-2 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="pt-4">
                  <Skeleton className="h-5 w-1/4" />
                  <Skeleton className="h-4 w-1/3 mt-2" />
                </div>
             </div>
          </div>
        </div>
       </section>
     )
  }

  if (!employeeSpotlight) {
    return null; // Don't render the section if there's no data
  }

  const { employeeName, position, quote, imageUrl, hint } = employeeSpotlight;

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Employee Spotlight
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Celebrating the people who make Paarsh Infotech great.
          </p>
        </div>
        <Card className="grid md:grid-cols-3 gap-8 items-center p-8 shadow-lg bg-background">
          <ImagePreviewModal imgSrc={imageUrl} alt={`Portrait of ${employeeName}`}>
            <div className="relative aspect-square md:col-span-1 cursor-pointer">
              <Image
                src={imageUrl}
                alt={`Portrait of ${employeeName}`}
                fill
                className="object-cover rounded-lg shadow-md"
                data-ai-hint={hint}
              />
            </div>
          </ImagePreviewModal>
          <div className="md:col-span-2 space-y-4 text-center md:text-left">
            <blockquote className="text-xl italic text-foreground/80 border-l-4 border-accent pl-6 md:border-l-0 md:pl-0 md:border-t-4 md:pt-6">
              "{quote}"
            </blockquote>
            <div>
              <p className="text-lg font-semibold text-primary">{employeeName}</p>
              <p className="text-base text-muted-foreground">{position}</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
