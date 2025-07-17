
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
import { photoSliderImages } from "@/lib/mediaData";
import { ImagePreviewModal } from "../common/ImagePreviewModal";

export default function PhotoSlider() {
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
            {photoSliderImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <ImagePreviewModal imgSrc={image.src} alt={image.alt}>
                    <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        data-ai-hint={image.hint}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
                        <p className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">{image.alt}</p>
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
