"use client";

import { ImageUploadCard } from "./ImageUploadCard";

interface AboutPageImagesProps {
  images: any[];
}

export function AboutPageImages({ images }: AboutPageImagesProps) {
    const getImageData = (section: string) => {
        return images.find(img => img.section === section) || {
            page: 'about',
            section,
            alt: 'Default alt text',
            imageUrl: 'https://placehold.co/600x400.png',
            hint: 'default hint'
        };
    };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ImageUploadCard
        title="Intro Section Image"
        description="The main image in the 'Culture of Innovation' section."
        imageData={getImageData('about_intro')}
        aspectRatio="aspect-[3/2]"
      />
      <ImageUploadCard
        title="CEO Quote Image"
        description="The image displayed next to the CEO's quote."
        imageData={getImageData('about_ceo_quote')}
        aspectRatio="aspect-square"
      />
      {/* Add more cards for other images on the About page */}
    </div>
  );
}
