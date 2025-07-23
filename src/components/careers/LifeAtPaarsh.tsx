import Image from "next/image";
import { lifeAtPaarshImages } from "@/lib/careersData";
import { ImagePreviewModal } from "../common/ImagePreviewModal";

export default function LifeAtPaarsh() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Life at Paarsh Infotech
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We believe in a vibrant, collaborative culture where we work hard,
            celebrate our successes, and grow together.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {lifeAtPaarshImages.map((image, index) => (
            <ImagePreviewModal key={index} imgSrc={image.src} alt={image.alt}>
              <div className="relative aspect-video rounded-lg overflow-hidden group shadow-lg cursor-pointer">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={image.hint}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
                  <p className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.alt}
                  </p>
                </div>
              </div>
            </ImagePreviewModal>
          ))}
        </div>
      </div>
    </section>
  );
}
