"use client";

import { useState, useMemo } from "react";
import MediaHero from "@/components/media/MediaHero";
import EventCategoryTabs from "@/components/media/EventCategoryTabs";
import MediaGalleryGrid from "@/components/media/MediaGalleryGrid";
import PhotoSlider from "@/components/media/PhotoSlider";
import BehindTheScenes from "@/components/media/BehindTheScenes";
import EmployeeSpotlight from "@/components/media/EmployeeSpotlight";
import EventRecapCards from "@/components/media/EventRecapCards";
import SocialWall from "@/components/media/SocialWall";
import MediaTestimonials from "@/components/media/MediaTestimonials";
import CallToActionBox from "@/components/media/CallToActionBox";
import { mediaCategories, mediaGalleryItems } from "@/lib/mediaData";
import ImageLightbox from "@/components/media/ImageLightbox";

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const filteredMedia = useMemo(() => {
    if (activeCategory === "All") {
      return mediaGalleryItems;
    }
    return mediaGalleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % filteredMedia.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + filteredMedia.length) % filteredMedia.length
    );
  };

  return (
    <>
      <MediaHero />
      <EventCategoryTabs
        categories={mediaCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <MediaGalleryGrid items={filteredMedia} onImageClick={openLightbox} />
      <PhotoSlider />
      <BehindTheScenes />
      <EmployeeSpotlight />
      <EventRecapCards />
      <SocialWall />
      <MediaTestimonials />
      <CallToActionBox />

      <ImageLightbox
        isOpen={lightboxOpen}
        onOpenChange={setLightboxOpen}
        images={filteredMedia}
        currentIndex={selectedImageIndex}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />
    </>
  );
}
