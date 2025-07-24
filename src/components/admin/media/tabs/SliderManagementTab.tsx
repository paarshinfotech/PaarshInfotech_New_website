'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaPlus, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { ImagePreviewModal } from '@/components/common/ImagePreviewModal';
import { DeleteConfirmationDialog } from '@/components/admin/DeleteConfirmationDialog';
import { SliderImageFormModal } from '../SliderImageFormModal';
import { useGetMediaItemsQuery, useAddMediaItemMutation, useDeleteMediaItemMutation } from '@/services/api';

interface SliderManagementTabProps {
    items: any[];
    setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export function SliderManagementTab({ items: propItems, setItems: setPropItems }: SliderManagementTabProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    // RTK Query hooks
    const { data: sliderItems = [], isLoading } = useGetMediaItemsQuery('slider');
    const [addMediaItem] = useAddMediaItemMutation();
    const [deleteMediaItem] = useDeleteMediaItemMutation();

    // Update local state when RTK query data changes
    useEffect(() => {
        if (sliderItems) {
            setPropItems(sliderItems);
        }
    }, [sliderItems, setPropItems]);

    const handleSave = async (data: { alt: string; hint: string; image?: string }) => {
        try {
            const formData = {
                type: 'slider',
                title: data.alt,
                description: data.hint,
                imageBase64: data.image,
                published: true
            };

            await addMediaItem(formData).unwrap();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to add slider image:', error);
        }
    }
    
    const handleDelete = (item: any) => {
        setSelectedItem(item);
        setIsDeleteAlertOpen(true);
    };

    const confirmDelete = async () => {
        if(selectedItem) {
            try {
                await deleteMediaItem({
                    type: 'slider',
                    _id: selectedItem._id
                }).unwrap();
            } catch (error) {
                console.error('Failed to delete slider image:', error);
            }
        }
        setIsDeleteAlertOpen(false);
        setSelectedItem(null);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Photo Slider Images</CardTitle>
                        <CardDescription>Manage images for the "Best Office Moments" carousel.</CardDescription>
                    </div>
                     <Button onClick={() => setIsModalOpen(true)}>
                        <FaPlus className="h-4 w-4" />
                        Add Image
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {propItems.map((item, index) => (
                             <Card key={item._id || index} className="overflow-hidden group">
                                <ImagePreviewModal imgSrc={item.imageUrl} alt={item.title}>
                                    <div className="relative aspect-video cursor-pointer">
                                        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                                    </div>
                                </ImagePreviewModal>
                                <CardHeader className="p-2 md:p-4">
                                    <CardTitle className="text-sm md:text-base truncate">{item.title}</CardTitle>
                                </CardHeader>
                                <CardFooter className="p-2 md:p-4 pt-0 flex justify-end items-center">
                                    <Button variant="destructive" size="icon" className="h-7 w-7 opacity-50 group-hover:opacity-100" onClick={() => handleDelete(item)}>
                                        <FaTrash className="h-4 w-4"/>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <SliderImageFormModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSave={handleSave}
            />

            <DeleteConfirmationDialog 
                isOpen={isDeleteAlertOpen}
                onOpenChange={setIsDeleteAlertOpen}
                onConfirm={confirmDelete}
                itemName={selectedItem?.title || "the selected image"}
            />
        </>
    )
}
