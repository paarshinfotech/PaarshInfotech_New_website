
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

import Image from "next/image";
import { ImagePreviewModal } from "@/components/common/ImagePreviewModal";
import { BtsFormModal } from "../BtsFormModal";
import { useGetMediaItemsQuery, useAddMediaItemMutation, useUpdateMediaItemMutation, useDeleteMediaItemMutation } from '@/services/api';
import { DeleteConfirmationDialog } from '@/components/admin/DeleteConfirmationDialog';

interface BtsManagementTabProps {
  items: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export function BtsManagementTab({ items: propItems, setItems: setPropItems }: BtsManagementTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const { data: btsItems = [], isLoading } = useGetMediaItemsQuery('bts');
  const [addMediaItem] = useAddMediaItemMutation();
  const [updateMediaItem] = useUpdateMediaItemMutation();
  const [deleteMediaItem] = useDeleteMediaItemMutation();

  useEffect(() => {
    setPropItems(btsItems);
  }, [btsItems, setPropItems]);

  const handleAdd = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: any) => {
    setSelectedItem(item);
    setIsDeleteAlertOpen(true);
  };

  const handleSave = async (data: { title: string; description: string; hint: string; date: string; image?: string }) => {
    try {
      const formData = {
        title: data.title,
        description: data.description,
        hint: data.hint,
        date: new Date(data.date),
        published: true,
      };

      if (selectedItem) {
        await updateMediaItem({
          type: 'bts',
          _id: selectedItem._id,
          ...formData,
          ...(data.image ? { imageBase64: data.image } : {}),
        }).unwrap();
      } else {
        if (!data.image) {
          throw new Error('Image is required for new BTS items');
        }
        await addMediaItem({
          type: 'bts',
          ...formData,
          imageBase64: data.image,
        }).unwrap();
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save BTS item:', error);
    }
  };

  const confirmDelete = async () => {
    if (selectedItem) {
      try {
        await deleteMediaItem({
          type: 'bts',
          _id: selectedItem._id
        }).unwrap();
      } catch (error) {
        console.error('Failed to delete BTS item:', error);
      }
    }
    setIsDeleteAlertOpen(false);
    setSelectedItem(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Behind the Scenes Cards</CardTitle>
            <CardDescription>
              Manage the cards in the "A Day in the Life" section.
            </CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <FaPlus className="h-4 w-4 mr-2" />
            Add Card
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-8">
            {propItems.map((item, index) => (
              <Card key={item._id || index} className="overflow-hidden group">
                <ImagePreviewModal imgSrc={item.imageUrl} alt={item.title}>
                  <div className="relative aspect-video cursor-pointer">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </ImagePreviewModal>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </CardContent>
                <CardFooter className="justify-end gap-2">
                  <Button variant="outline" onClick={() => handleEdit(item)}>
                    <FaEdit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(item)}>
                    <FaTrash className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <BtsFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        item={selectedItem}
      />

      <DeleteConfirmationDialog 
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={selectedItem?.title || "the selected card"}
      />
    </>
  );
}
