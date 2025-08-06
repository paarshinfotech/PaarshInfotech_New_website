
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
import SuccessStories from "@/components/careers/SuccessStories";
import CallToActionBox from "@/components/media/CallToActionBox";
import { useGetMediaItemsQuery, useGetSiteImagesQuery } from "@/services/api";

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { data: mediaGalleryItems = [], isLoading } = useGetMediaItemsQuery('gallery');
  const { data: siteImages = [] } = useGetSiteImagesQuery(undefined);

  const mediaHeroImage = siteImages.find((img: any) => img.section === "media_hero_banner");

  const mediaCategories = useMemo(() => {
    if (!mediaGalleryItems || mediaGalleryItems.length === 0) {
      return ["all"];
    }
    const categories = new Set(mediaGalleryItems.map((item: any) => item.category));
    return ["all", ...Array.from(categories)] as readonly string[];
  }, [mediaGalleryItems]);

  const filteredMedia = useMemo(() => {
    if (activeCategory === "all") {
      return mediaGalleryItems;
    }
    return mediaGalleryItems.filter((item: any) => item.category === activeCategory);
  }, [activeCategory, mediaGalleryItems]);

  return (
    <>
      <MediaHero heroImage={mediaHeroImage} />
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
      <SuccessStories />
      <CallToActionBox />
    </>
  );
}
