
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
import { mediaCategories } from "@/lib/mediaData";
import { useGetMediaItemsQuery } from "@/services/api";
import SuccessStories from "@/components/careers/SuccessStories";

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: mediaGalleryItems = [], isLoading } = useGetMediaItemsQuery('gallery');

  const filteredMedia = useMemo(() => {
    if (activeCategory === "All") {
      return mediaGalleryItems;
    }
    return mediaGalleryItems.filter((item: any) => item.category === activeCategory);
  }, [activeCategory, mediaGalleryItems]);

  return (
    <>
      <MediaHero />
      <EventCategoryTabs
        categories={mediaCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <MediaGalleryGrid items={filteredMedia} isLoading={isLoading} />
      <PhotoSlider />
      <BehindTheScenes />
      <EmployeeSpotlight />
      <EventRecapCards />
      <SocialWall />
       {/* <MediaTestimonials /> */}
      <SuccessStories />
      <CallToActionBox />
    </>
  );
}
