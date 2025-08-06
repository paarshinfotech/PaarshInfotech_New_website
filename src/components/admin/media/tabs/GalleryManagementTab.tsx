
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MediaUploadModal } from "@/components/admin/media/MediaUploadModal";
import { ImagePreviewModal } from "@/components/common/ImagePreviewModal";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { useGetMediaItemsQuery, useAddMediaItemMutation, useUpdateMediaItemMutation, useDeleteMediaItemMutation, useGetGalleryCategoriesQuery, useGetMediaHeroQuery, useUpdateMediaHeroMutation } from "@/services/api";
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
  const { data: mediaHeroData } = useGetMediaHeroQuery(undefined);
  
  const [addMediaItem] = useAddMediaItemMutation();
  const [updateMediaItem] = useUpdateMediaItemMutation();
  const [deleteMediaItem] = useDeleteMediaItemMutation();
  const [updateMediaHero] = useUpdateMediaHeroMutation();

  const mediaHeroImage = mediaHeroData;

  const categories = categoryData?.data || [];

  useEffect(() => {
    setPropItems(galleryItems);
  }, [galleryItems, setPropItems]);
  
  const handleAdd = () => {
    setSelectedItem(null);
    setIsUploadModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsUploadModalOpen(true);
  };

  const handleSave = async (data: { alt: string; category: string; image?: string, _id?: string }) => {
    try {
      const formData = {
        type: "gallery",
        title: data.alt,
        description: data.alt,
        category: data.category.toLowerCase(),
        imageBase64: data.image,
        published: true,
      };

      if (data._id) {
        await updateMediaItem({ _id: data._id, ...formData }).unwrap();
      } else {
        await addMediaItem(formData).unwrap();
      }
      setIsUploadModalOpen(false);
    } catch (error) {
      console.error("Failed to save gallery item:", error);
    }
  };
  
  const handleHeroSave = async (data: any) => {
    try {
      await updateMediaHero({
        alt: data.alt,
        hint: data.hint,
        imageUrl: data.imageUrl, // This is the base64 string
      }).unwrap();
      toast({ title: "Image Updated", description: "The hero image has been successfully updated." });
      setIsHeroModalOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to save hero image.", variant: "destructive" });
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
            <Button onClick={handleAdd}>
              <FaPlus className="h-4 w-4 mr-2" />
              Add Media
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
                   <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-50 group-hover:opacity-100" onClick={() => handleEdit(item)}>
                        <FaEdit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-7 w-7 opacity-50 group-hover:opacity-100"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash className="h-4 w-4" />
                    </Button>
                  </div>
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
        item={selectedItem}
      />
      
      <ImageFormModal
        isOpen={isHeroModalOpen}
        onOpenChange={setIsHeroModalOpen}
        onSave={handleHeroSave}
        image={mediaHeroImage}
        page="media"
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={selectedItem?.title || "the selected image"}
      />
    </>
  );
}
