
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { GoPlusCircle } from 'react-icons/go';
import { ImageCard } from './ImageCard';
import { ImageFormModal } from './ImageFormModal';
import { DeleteConfirmationDialog } from '@/components/admin/DeleteConfirmationDialog';
import { useAddSiteImageMutation, useUpdateSiteImageMutation, useDeleteSiteImageMutation } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export interface SiteImage {
  _id: string;
  page: string;
  section: string;
  alt: string;
  imageUrl: string;
  hint: string;
}

interface ProductsPageImagesProps {
  images: SiteImage[];
}

export function ProductsPageImages({ images }: ProductsPageImagesProps) {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<SiteImage | null>(null);

  const [addImage] = useAddSiteImageMutation();
  const [updateImage] = useUpdateSiteImageMutation();
  const [deleteImage] = useDeleteSiteImageMutation();

  const handleAdd = () => {
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const handleEdit = (image: SiteImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleDelete = (image: SiteImage) => {
    setSelectedImage(image);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedImage) {
      try {
        await deleteImage(selectedImage._id).unwrap();
        toast({ title: "Image Deleted", description: `The image for ${selectedImage.section} has been deleted.` });
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete image.", variant: "destructive" });
      }
    }
    setIsDeleteAlertOpen(false);
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedImage) {
        await updateImage({ _id: selectedImage._id, ...data }).unwrap();
        toast({ title: "Image Updated", description: "The image has been successfully updated." });
      } else {
        await addImage({ page: 'products', ...data }).unwrap();
        toast({ title: "Image Added", description: "The new image has been added to the products page." });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to save image.", variant: "destructive" });
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Products Page Images</CardTitle>
            <CardDescription>Manage the images displayed on the public products pages.</CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <GoPlusCircle className="mr-2 h-4 w-4" />
            Add Image
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <ImageCard key={image._id} image={image} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
          {images.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No images found for the products page.</p>
              <p>Click "Add Image" to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <ImageFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        image={selectedImage}
        page="products"
      />

       <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={`the image for section: ${selectedImage?.section}`}
      />
    </>
  );
}
