
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ImagePreviewModal } from "../common/ImagePreviewModal";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

interface MediaItem {
  _id: string;
  imageUrl: string;
  title: string;
  category: string;
  hint: string;
}

interface MediaGalleryGridProps {
  items: MediaItem[];
  isLoading: boolean;
}

const INITIAL_ITEMS_TO_SHOW = 8;

export default function MediaGalleryGrid({ items, isLoading }: MediaGalleryGridProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll ? items : items.slice(0, INITIAL_ITEMS_TO_SHOW);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="aspect-square">
                <Skeleton className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No items to display in this category.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedItems.map((item, index) => (
                <ImagePreviewModal key={item._id || index} imgSrc={item.imageUrl} alt={item.title}>
                  <Card
                    className="overflow-hidden group relative aspect-square cursor-pointer"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      data-ai-hint={item.hint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/70">
                      <div className="absolute bottom-0 p-4">
                        <p className="text-white font-semibold text-sm drop-shadow-md">{item.title}</p>
                      </div>
                    </div>
                  </Card>
                </ImagePreviewModal>
              ))}
            </div>
            {!showAll && items.length > INITIAL_ITEMS_TO_SHOW && (
              <div className="text-center mt-12">
                <Button onClick={() => setShowAll(true)} size="lg">
                  See All Images
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
