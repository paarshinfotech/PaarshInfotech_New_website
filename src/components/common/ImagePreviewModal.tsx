
'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { PropsWithChildren } from "react";

interface ImagePreviewModalProps extends PropsWithChildren {
  imgSrc: string;
  alt: string;
}

export function ImagePreviewModal({ children, imgSrc, alt }: ImagePreviewModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-full p-0 bg-transparent border-none shadow-none">
        <div className="relative aspect-video">
          <Image
            src={imgSrc}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
