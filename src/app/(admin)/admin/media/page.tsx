
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetMediaItemsQuery } from "@/services/api";
import { GalleryManagementTab } from "@/components/admin/media/tabs/GalleryManagementTab";
import { SliderManagementTab } from "@/components/admin/media/tabs/SliderManagementTab";
import { BtsManagementTab } from "@/components/admin/media/tabs/BtsManagementTab";
import { EventsManagementTab } from "@/components/admin/media/tabs/EventsManagementTab";
import { SpotlightManagementTab } from "@/components/admin/media/tabs/SpotlightManagementTab";

export default function MediaManagementPage() {
  // State for each media type
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [sliderImages, setSliderImages] = useState<any[]>([]);
  const [btsItems, setBtsItems] = useState<any[]>([]);
  const [eventRecaps, setEventRecaps] = useState<any[]>([]);
  const [spotlight, setSpotlight] = useState<any>(null);

  // RTK Query hooks for each media type
  const { data: galleryData = [] } = useGetMediaItemsQuery('gallery');
  const { data: sliderData = [] } = useGetMediaItemsQuery('slider');
  const { data: btsData = [] } = useGetMediaItemsQuery('bts');
  const { data: eventData = [] } = useGetMediaItemsQuery('event');
  const { data: spotlightData = [] } = useGetMediaItemsQuery('spotlight');

  // Update local state when RTK query data changes
  useEffect(() => {
    if (galleryData?.length !== galleryItems.length || JSON.stringify(galleryData) !== JSON.stringify(galleryItems)) {
      setGalleryItems(galleryData);
    }
    if (sliderData?.length !== sliderImages.length || JSON.stringify(sliderData) !== JSON.stringify(sliderImages)) {
      setSliderImages(sliderData);
    }
    if (btsData?.length !== btsItems.length || JSON.stringify(btsData) !== JSON.stringify(btsItems)) {
      setBtsItems(btsData);
    }
    if (eventData?.length !== eventRecaps.length || JSON.stringify(eventData) !== JSON.stringify(eventRecaps)) {
      setEventRecaps(eventData);
    }
    if (spotlightData?.[0]?._id !== spotlight?._id) {
      setSpotlight(spotlightData?.[0] || null);
    }
  }, [galleryData, sliderData, btsData, eventData, spotlightData, galleryItems, sliderImages, btsItems, eventRecaps, spotlight]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Media Management</h1>
        <p className="text-muted-foreground">
          Manage all content sections of your public Media page.
        </p>
      </div>

      <Tabs defaultValue="gallery">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="gallery">Main Gallery</TabsTrigger>
          <TabsTrigger value="slider">Photo Slider</TabsTrigger>
          <TabsTrigger value="bts">Behind the Scenes</TabsTrigger>
          <TabsTrigger value="events">Event Recaps</TabsTrigger>
          <TabsTrigger value="spotlight">Employee Spotlight</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="mt-6">
          <GalleryManagementTab
            items={galleryItems}
            setItems={setGalleryItems}
          />
        </TabsContent>

        <TabsContent value="slider" className="mt-6">
          <SliderManagementTab
            items={sliderImages}
            setItems={setSliderImages}
          />
        </TabsContent>

        <TabsContent value="bts" className="mt-6">
          <BtsManagementTab items={btsItems} setItems={setBtsItems} />
        </TabsContent>

        <TabsContent value="events" className="mt-6">
          <EventsManagementTab items={eventRecaps} setItems={setEventRecaps} />
        </TabsContent>

        <TabsContent value="spotlight" className="mt-6">
          <SpotlightManagementTab item={spotlight} setItem={setSpotlight} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
