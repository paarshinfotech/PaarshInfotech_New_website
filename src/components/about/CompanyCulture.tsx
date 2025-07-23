import Image from "next/image";
import { ImagePreviewModal } from "@/components/common/ImagePreviewModal";

const cultureImages = [
  {
    src: "https://placehold.co/600x800.png",
    alt: "Team celebration",
    dataAiHint: "team celebration",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "https://placehold.co/600x400.png",
    alt: "Collaborative workshop",
    dataAiHint: "workshop collaboration",
    className: "lg:col-span-2",
  },
  {
    src: "https://placehold.co/600x400.png",
    alt: "Company hackathon",
    dataAiHint: "hackathon event",
    className: "",
  },
  {
    src: "https://placehold.co/600x400.png",
    alt: "Diwali party at office",
    dataAiHint: "office party",
    className: "",
  },
];

export default function CompanyCulture() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Moments That Matter
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            A glimpse into our vibrant company culture, where we work hard and
            celebrate our successes together.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-4">
          {cultureImages.map((image, index) => (
            <ImagePreviewModal key={index} imgSrc={image.src} alt={image.alt}>
              <div
                className={`relative rounded-lg overflow-hidden group shadow-lg cursor-pointer ${image.className}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={image.dataAiHint}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-4">
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
