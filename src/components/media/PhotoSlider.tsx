
"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ImagePreviewModal } from "../common/ImagePreviewModal";
import { useGetMediaItemsQuery } from "@/services/api";
import { Skeleton } from "../ui/skeleton";

export default function PhotoSlider() {
  const { data: sliderImages = [], isLoading } = useGetMediaItemsQuery('slider');

  if (isLoading) {
    return (
       <section className="py-16 md:py-24 bg-secondary">
          <div className="container max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="p-1 aspect-video">
                  <Skeleton className="w-full h-full" />
                </div>
              ))}
            </div>
          </div>
       </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Best Office Moments</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            A carousel of our favorite memories, from team trips to cultural events.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {sliderImages.map((image: any, index: number) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <ImagePreviewModal imgSrc={image.imageUrl} alt={image.title}>
                    <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
                      <Image
                        src={image.imageUrl}
                        alt={image.title}
                        fill
                        className="object-cover"
                        data-ai-hint={image.description}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
                        <p className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">{image.title}</p>
                      </div>
                    </div>
                  </ImagePreviewModal>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
