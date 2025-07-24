
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FiEdit } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";
import type { SiteImage } from "./HomePageImages";

interface ImageCardProps {
  image: SiteImage;
  onEdit: (image: SiteImage) => void;
  onDelete: (image: SiteImage) => void;
}

export function ImageCard({ image, onEdit, onDelete }: ImageCardProps) {
  return (
    <Card className="group relative overflow-hidden aspect-video">
      <Image
        src={image.imageUrl}
        alt={image.alt}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
        <div className="text-white text-xs">
          <p className="font-bold">{image.section}</p>
          <p className="truncate">{image.alt}</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => onEdit(image)}>
            <FiEdit className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => onDelete(image)}>
            <FaTrashCan className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
