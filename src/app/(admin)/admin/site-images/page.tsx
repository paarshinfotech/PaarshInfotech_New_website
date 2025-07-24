
"use client";

import { useGetSiteImagesQuery } from "@/services/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomePageImages } from "@/components/admin/site-images/HomePageImages";
import { AboutPageImages } from "@/components/admin/site-images/AboutPageImages";

export default function SiteImagesPage() {
  const { data: images = [], isLoading } = useGetSiteImagesQuery(undefined);

  const homePageImages = images.filter((img: any) => img.page === "home");
  const aboutPageImages = images.filter((img: any) => img.page === "about");
  // Add filters for other pages as needed

  if (isLoading) {
    return <div>Loading image data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Site Image Management</h1>
        <p className="text-muted-foreground">
          Update the key images displayed across your public website.
        </p>
      </div>

      <Tabs defaultValue="home">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
          <TabsTrigger value="home">Home Page</TabsTrigger>
          <TabsTrigger value="about">About Page</TabsTrigger>
          <TabsTrigger value="services" disabled>Services</TabsTrigger>
          <TabsTrigger value="products" disabled>Products</TabsTrigger>
          <TabsTrigger value="excellence-centers" disabled>Excellence Centers</TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="mt-6">
          <HomePageImages images={homePageImages} />
        </TabsContent>
        <TabsContent value="about" className="mt-6">
           <AboutPageImages images={aboutPageImages} />
        </TabsContent>
        {/* Add TabsContent for other pages here */}
      </Tabs>
    </div>
  );
}
