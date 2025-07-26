import Image from "next/image";
import { ImagePreviewModal } from "@/components/common/ImagePreviewModal";
import { useGetCultureMomentsQuery } from "@/services/api";

interface CultureMoment {
  _id: string;
  imageUrl: string;
  alt: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CompanyCulture() {
  const { data: moments = [], isLoading } = useGetCultureMomentsQuery(true); // Only active

  // Get first 4 moments for grid display
  const gridMoments = moments.slice(0, 4);
  // Get remaining moments for modal slider
  const sliderMoments = moments.slice(4);

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
        {isLoading ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            Loading moments...
          </div>
        ) : moments.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            No moments to display.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-4">
            {gridMoments.map((moment: CultureMoment, index: number) => {
              // Define grid classes based on position
              let gridClass = "";
              if (index === 0) {
                gridClass = "lg:col-span-2 lg:row-span-2";
              } else if (index === 1) {
                gridClass = "lg:col-span-2";
              }
              // index 2 and 3 get default single position

              return (
                <ImagePreviewModal
                  key={moment._id}
                  imgSrc={moment.imageUrl}
                  alt={moment.alt}
                  // Pass all moments for slider if there are more than 4
                  additionalImages={moments.length > 4 ? moments : undefined}
                >
                  <div
                    className={`relative rounded-lg overflow-hidden group shadow-lg cursor-pointer ${gridClass}`}
                  >
                    <Image
                      src={moment.imageUrl}
                      alt={moment.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={moment.alt}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-4">
                      <p className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {moment.alt}
                      </p>
                    </div>
                  </div>
                </ImagePreviewModal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
