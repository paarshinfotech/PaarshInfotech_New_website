
"use client";

import { useGetSiteImagesQuery } from "@/services/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomePageImages } from "@/components/admin/site-images/HomePageImages";
import { AboutPageImages } from "@/components/admin/site-images/AboutPageImages";
import { ServicesPageImages } from "@/components/admin/site-images/ServicesPageImages";
import { ProductsPageImages } from "@/components/admin/site-images/ProductsPageImages";
import { ExcellenceCentersPageImages } from "@/components/admin/site-images/ExcellenceCentersPageImages";
import { MediaPageImages } from "@/components/admin/site-images/MediaPageImages";


export default function SiteImagesPage() {
  const { data: images = [], isLoading } = useGetSiteImagesQuery(undefined);

  const homePageImages = images.filter((img: any) => img.page === "home");
  const aboutPageImages = images.filter((img: any) => img.page === "about");
  const servicesPageImages = images.filter((img: any) => img.page === "services");
  const productsPageImages = images.filter((img: any) => img.page === "products");
  const excellenceCentersPageImages = images.filter((img: any) => img.page === "excellence-centers");
  const mediaPageImages = images.filter((img: any) => img.page === "media");

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
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-6">
          <TabsTrigger value="home">Home Page</TabsTrigger>
          <TabsTrigger value="about">About Page</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="excellence-centers">Excellence Centers</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="mt-6">
          <HomePageImages images={homePageImages} />
        </TabsContent>
        <TabsContent value="about" className="mt-6">
           <AboutPageImages images={aboutPageImages} />
        </TabsContent>
        <TabsContent value="services" className="mt-6">
            <ServicesPageImages images={servicesPageImages} />
        </TabsContent>
        <TabsContent value="products" className="mt-6">
            <ProductsPageImages images={productsPageImages} />
        </TabsContent>
        <TabsContent value="excellence-centers" className="mt-6">
            <ExcellenceCentersPageImages images={excellenceCentersPageImages} />
        </TabsContent>
         <TabsContent value="media" className="mt-6">
            <MediaPageImages images={mediaPageImages} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
