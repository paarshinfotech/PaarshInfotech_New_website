"use client";

import { ImageUploadCard } from "./ImageUploadCard";

interface HomePageImagesProps {
  images: any[];
}

export function HomePageImages({ images }: HomePageImagesProps) {
    // Helper function to find image data or provide a default
    const getImageData = (section: string) => {
        return images.find(img => img.section === section) || {
            page: 'home',
            section,
            alt: 'Default alt text',
            imageUrl: 'https://placehold.co/600x400.png',
            hint: 'default hint'
        };
    };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ImageUploadCard
        title="Hero Section Image"
        description="The main hero image on the right side of the homepage."
        imageData={getImageData('home_hero')}
        aspectRatio="aspect-[3/2]"
      />
      <ImageUploadCard
        title="About Us Image"
        description="Image shown in the 'Who We Are' section."
        imageData={getImageData('home_about')}
        aspectRatio="aspect-video"
      />
       <ImageUploadCard
        title="Intro Video Thumbnail"
        description="Thumbnail for the 'Meet the Innovators' video."
        imageData={getImageData('home_video_thumbnail')}
        aspectRatio="aspect-video"
      />
    </div>
  );
}
