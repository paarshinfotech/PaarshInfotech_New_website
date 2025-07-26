"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import { Button } from "@/components/ui/button";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface ImagePreviewModalProps extends PropsWithChildren {
  imgSrc: string;
  alt: string;
  additionalImages?: Array<{ imageUrl: string; alt: string; _id: string }>;
}

export function ImagePreviewModal({
  children,
  imgSrc,
  alt,
  additionalImages,
}: ImagePreviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Combine main image with additional images
  const allImages = additionalImages 
    ? [{ imageUrl: imgSrc, alt, _id: 'main' }, ...additionalImages]
    : [{ imageUrl: imgSrc, alt, _id: 'main' }];

  const currentImage = allImages[currentIndex];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Dialog onOpenChange={() => setCurrentIndex(0)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-5xl w-full p-0 bg-transparent border-none shadow-none">
        <div className="relative aspect-video">
          <Image
            src={currentImage.imageUrl}
            alt={currentImage.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
          />
          
          {/* Navigation buttons */}
          {allImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                onClick={prevImage}
              >
                <LuChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                onClick={nextImage}
              >
                <LuChevronRight className="h-6 w-6" />
              </Button>
              
              {/* Dots indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => goToImage(index)}
                  />
                ))}
              </div>
              
              {/* Image counter */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {currentIndex + 1} / {allImages.length}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
