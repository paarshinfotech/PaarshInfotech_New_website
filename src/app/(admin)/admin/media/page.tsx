"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  mediaGalleryItems as initialGalleryItems,
  photoSliderImages as initialSliderImages,
  behindTheScenesData as initialBtsData,
  eventRecaps as initialEventRecaps,
  employeeSpotlight as initialEmployeeSpotlight,
} from "@/lib/mediaData";
import type {
  MediaItem,
  PhotoSliderImage,
  BehindTheScenesItem,
  EventRecap,
  EmployeeSpotlightItem,
} from "@/lib/mediaData";
import { GalleryManagementTab } from "@/components/admin/media/tabs/GalleryManagementTab";
import { SliderManagementTab } from "@/components/admin/media/tabs/SliderManagementTab";
import { BtsManagementTab } from "@/components/admin/media/tabs/BtsManagementTab";
import { EventsManagementTab } from "@/components/admin/media/tabs/EventsManagementTab";
import { SpotlightManagementTab } from "@/components/admin/media/tabs/SpotlightManagementTab";

export default function MediaManagementPage() {
  const [galleryItems, setGalleryItems] =
    useState<MediaItem[]>(initialGalleryItems);
  const [sliderImages, setSliderImages] =
    useState<PhotoSliderImage[]>(initialSliderImages);
  const [btsItems, setBtsItems] =
    useState<BehindTheScenesItem[]>(initialBtsData);
  const [eventRecaps, setEventRecaps] =
    useState<EventRecap[]>(initialEventRecaps);
  const [spotlight, setSpotlight] = useState<EmployeeSpotlightItem>(
    initialEmployeeSpotlight
  );

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
