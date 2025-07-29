
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { LuArrowRight } from "react-icons/lu";
import ImageLightbox from "./ImageLightbox";
import { useGetMediaItemsQuery } from "@/services/api";
import { Skeleton } from "../ui/skeleton";

export default function EventRecapCards() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeGallery, setActiveGallery] = useState<
    { src: string; alt: string }[]
  >([]);
  
  const { data: eventRecaps = [], isLoading } = useGetMediaItemsQuery('event');

  const openLightbox = (
    gallery: { imageUrl: string; alt: string }[] = [],
    index: number
  ) => {
    const formattedGallery = gallery.map(g => ({ src: g.imageUrl, alt: g.alt }));
    setActiveGallery(formattedGallery);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % activeGallery.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + activeGallery.length) % activeGallery.length
    );
  };

  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Event Recaps
            </h2>
            <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
              A look back at some of our most memorable company events and
              celebrations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index}>
                  <Skeleton className="h-48 w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6 mt-2" />
                  </CardContent>
                </Card>
              ))
            ) : (
              eventRecaps.map((event: any) => (
                <Card key={event._id} className="flex flex-col group">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={event.hint}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{new Date(event.eventDate).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button
                      variant="link"
                      className="p-0 h-auto"
                      onClick={() => openLightbox(event.images, 0)}
                      disabled={!event.images || event.images.length === 0}
                    >
                      View Gallery <LuArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
      <ImageLightbox
        isOpen={lightboxOpen}
        onOpenChange={setLightboxOpen}
        images={activeGallery}
        currentIndex={currentImageIndex}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}
