import Image from "next/image";
import { ImagePreviewModal } from "@/components/common/ImagePreviewModal";

interface ProjectGalleryProps {
  gallery: {
    src: string;
    alt: string;
    dataAiHint: string;
  }[];
}

export default function ProjectGallery({ gallery }: ProjectGalleryProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Work in Action</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            A showcase of projects we've successfully delivered.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((image, index) => (
            <ImagePreviewModal key={index} imgSrc={image.src} alt={image.alt}>
              <div className="relative aspect-video rounded-lg overflow-hidden group shadow-lg cursor-pointer">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={image.dataAiHint}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-4">
                  <p className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">{image.alt}</p>
                </div>
              </div>
            </ImagePreviewModal>
          ))}
        </div>
      </div>
    </section>
  );
}
