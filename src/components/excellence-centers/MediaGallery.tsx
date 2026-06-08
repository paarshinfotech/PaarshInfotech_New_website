"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ImagePreviewModal } from "../common/ImagePreviewModal";
import { useGetECGalleryQuery } from "@/services/api";

interface MediaGalleryItem {
  _id?: string;
  imageUrl: string;
  title: string;
}

export default function MediaGallery() {
  const { data: mediaGalleryData, isLoading } = useGetECGalleryQuery(undefined);

  console.log("mediaGalleryData", mediaGalleryData);

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Gallery
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            A glimpse into the vibrant learning environment at our Centers of
            Excellence.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaGalleryData?.data.map(
            (item: MediaGalleryItem, index: number) => (
              <ImagePreviewModal
                key={index}
                imgSrc={item.imageUrl}
                alt={item.title}
                data-ai-hint={item.title}
              >
                <Card
                  className="overflow-hidden group relative aspect-video cursor-pointer"
                  data-ai-hint={item.title}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/70">
                    <div className="absolute bottom-0 p-4">
                      <p className="text-white font-semibold text-sm drop-shadow-md">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </Card>
              </ImagePreviewModal>
            )
          )}
        </div>
      </div>
    </section>
  );
}
