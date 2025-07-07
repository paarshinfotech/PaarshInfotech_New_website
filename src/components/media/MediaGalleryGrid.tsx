import Image from "next/image";
import { Card } from "@/components/ui/card";

interface MediaItem {
  src: string;
  alt: string;
  category: string;
  hint: string;
}

interface MediaGalleryGridProps {
  items: MediaItem[];
  onImageClick: (index: number) => void;
}

export default function MediaGalleryGrid({ items, onImageClick }: MediaGalleryGridProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No items to display in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden group relative aspect-square cursor-pointer"
                onClick={() => onImageClick(index)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  data-ai-hint={item.hint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/70">
                  <div className="absolute bottom-0 p-4">
                    <p className="text-white font-semibold text-sm drop-shadow-md">{item.alt}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
