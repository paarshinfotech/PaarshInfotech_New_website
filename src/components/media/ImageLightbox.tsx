"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface ImageLightboxProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  images: { src: string; alt: string }[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function ImageLightbox({
  isOpen,
  onOpenChange,
  images,
  currentIndex,
  onNext,
  onPrev,
}: ImageLightboxProps) {
  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      onNext();
    } else if (e.key === "ArrowLeft") {
      onPrev();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-5xl w-full p-0 bg-transparent border-none shadow-none"
        onKeyDown={handleKeyDown}
      >
        <div className="relative w-full aspect-video">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 bg-black/40 text-white hover:bg-black/60 border-none"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
        >
          <LuChevronLeft className="h-8 w-8" />
          <span className="sr-only">Previous Image</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 bg-black/40 text-white hover:bg-black/60 border-none"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        >
          <LuChevronRight className="h-8 w-8" />
          <span className="sr-only">Next Image</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
