"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaPlus, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MediaUploadModal } from "@/components/admin/media/MediaUploadModal";
import { ImagePreviewModal } from "@/components/common/ImagePreviewModal";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { useGetMediaItemsQuery, useAddMediaItemMutation, useDeleteMediaItemMutation, useGetGalleryCategoriesQuery, useGetSiteImagesQuery, useUpdateSiteImageMutation } from "@/services/api";
import { ImageFormModal } from "../../site-images/ImageFormModal";
import { useToast } from "@/hooks/use-toast";

interface GalleryManagementTabProps {
  items: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export function GalleryManagementTab({ items: propItems, setItems: setPropItems }: GalleryManagementTabProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const { toast } = useToast();
  const { data: galleryItems = [], isLoading: isLoadingItems } = useGetMediaItemsQuery("gallery");
  const { data: categoryData, isLoading: isLoadingCategories } = useGetGalleryCategoriesQuery(undefined);
  const { data: siteImages = [] } = useGetSiteImagesQuery(undefined);

  const [addMediaItem] = useAddMediaItemMutation();
  const [deleteMediaItem] = useDeleteMediaItemMutation();
  const [updateSiteImage] = useUpdateSiteImageMutation();

  const mediaHeroImage = siteImages.find((img: any) => img.section === 'media_hero_banner');

  const categories = categoryData?.data || [];

  useEffect(() => {
    if (galleryItems?.length !== propItems.length || JSON.stringify(galleryItems) !== JSON.stringify(propItems)) {
      setPropItems(galleryItems);
    }
  }, [galleryItems, propItems, setPropItems]);

  const handleSave = async (data: { alt: string; category: string; image?: string }) => {
    try {
      const formData = {
        type: "gallery",
        title: data.alt,
        description: data.alt,
        category: data.category.toLowerCase(),
        imageBase64: data.image,
        published: true,
      };

      await addMediaItem(formData).unwrap();
      setIsUploadModalOpen(false);
    } catch (error) {
      console.error("Failed to add gallery item:", error);
    }
  };
  
  const handleHeroSave = async (data: any) => {
    try {
        const payload = {
            _id: mediaHeroImage._id,
            ...data
        };
      await updateSiteImage(payload).unwrap();
      toast({ title: "Image Updated", description: "The image has been successfully updated." });
      setIsHeroModalOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to save image.", variant: "destructive" });
    }
  };

  const handleDelete = (item: any) => {
    setSelectedItem(item);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedItem) {
      try {
        await deleteMediaItem({
          type: "gallery",
          _id: selectedItem._id,
        }).unwrap();
      } catch (error) {
        console.error("Failed to delete gallery item:", error);
      }
    }
    setIsDeleteAlertOpen(false);
    setSelectedItem(null);
  };

  const isLoading = isLoadingItems || isLoadingCategories;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Main Gallery Images</CardTitle>
            <CardDescription>
              Manage images for the filterable gallery on the Media page.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsHeroModalOpen(true)}>Manage Hero Image</Button>
            <Button onClick={() => setIsUploadModalOpen(true)}>
              <FaPlus className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {propItems.map((item, index) => (
              <Card key={item._id || index} className="overflow-hidden group">
                <ImagePreviewModal imgSrc={item.imageUrl} alt={item.title}>
                  <div className="relative aspect-square cursor-pointer">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </ImagePreviewModal>
                <CardHeader className="p-2 md:p-4">
                  <CardTitle className="text-sm md:text-base truncate">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="p-2 md:p-4 pt-0 flex justify-between items-center">
                  <Badge variant="outline">{item.category}</Badge>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-7 w-7 opacity-50 group-hover:opacity-100"
                    onClick={() => handleDelete(item)}
                  >
                    <FaTrash className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <MediaUploadModal
        isOpen={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
        onSave={handleSave}
        categories={categories}
      />
      
      {mediaHeroImage && (
        <ImageFormModal
          isOpen={isHeroModalOpen}
          onOpenChange={setIsHeroModalOpen}
          onSave={handleHeroSave}
          image={mediaHeroImage}
          page="media"
        />
      )}

      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={selectedItem?.title || "the selected image"}
      />
    </>
  );
}
