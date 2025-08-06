
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
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/productsData";
import { ImagePreviewModal } from "@/components/common/ImagePreviewModal";

interface ProductGalleryProps {
    gallery: Product['gallery'];
}

export default function ProductGallery({ gallery }: ProductGalleryProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Explore the Interface</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Get a closer look at our product's clean, intuitive, and powerful user interface.
          </p>
        </div>
        <Carousel
          opts={{ align: "start", loop: true, }}
          plugins={[ Autoplay({ delay: 4000 }) ]}
          className="w-full"
        >
          <CarouselContent>
            {gallery.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/1">
                <div className="p-1">
                  <ImagePreviewModal imgSrc={image.src} alt={image.alt}>
                    <Card className="cursor-pointer">
                      <CardContent className="flex aspect-video items-center justify-center p-0 relative rounded-lg overflow-hidden">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          data-ai-hint={image.hint}
                        />
                      </CardContent>
                    </Card>
                  </ImagePreviewModal>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious /> */}
          {/* <CarouselNext /> */}
        </Carousel>
      </div>
    </section>
  );
}
