
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ImagePreviewModal } from "../common/ImagePreviewModal";
import { mediaGallery } from "@/lib/excellenceCentersData";

export default function MediaGallery() {
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
          {mediaGallery.map((item, index) => (
            <ImagePreviewModal key={index} imgSrc={item.src} alt={item.alt}>
              <Card className="overflow-hidden group relative aspect-video cursor-pointer">
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
                    <p className="text-white font-semibold text-sm drop-shadow-md">
                      {item.alt}
                    </p>
                  </div>
                </div>
              </Card>
            </ImagePreviewModal>
          ))}
        </div>
      </div>
    </section>
  );
}
