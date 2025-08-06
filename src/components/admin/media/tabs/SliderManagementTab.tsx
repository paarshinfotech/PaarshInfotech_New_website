
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import Image from "next/image";
import { ImagePreviewModal } from '@/components/common/ImagePreviewModal';
import { DeleteConfirmationDialog } from '@/components/admin/DeleteConfirmationDialog';
import { SliderImageFormModal } from '../SliderImageFormModal';
import { useGetMediaItemsQuery, useAddMediaItemMutation, useUpdateMediaItemMutation, useDeleteMediaItemMutation } from '@/services/api';

interface SliderManagementTabProps {
    items: any[];
    setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export function SliderManagementTab({ items: propItems, setItems: setPropItems }: SliderManagementTabProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const { data: sliderItems = [], isLoading } = useGetMediaItemsQuery('slider');
    const [addMediaItem] = useAddMediaItemMutation();
    const [updateMediaItem] = useUpdateMediaItemMutation();
    const [deleteMediaItem] = useDeleteMediaItemMutation();

    useEffect(() => {
        setPropItems(sliderItems);
    }, [sliderItems, setPropItems]);

    const handleAdd = () => {
        setSelectedItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item: any) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleSave = async (data: { alt: string; hint: string; image?: string }) => {
        try {
            const formData = {
                type: 'slider',
                title: data.alt,
                description: data.hint,
                published: true,
                ...(data.image && { imageBase64: data.image })
            };
            
            if (selectedItem) {
                await updateMediaItem({ _id: selectedItem._id, ...formData }).unwrap();
            } else {
                await addMediaItem(formData).unwrap();
            }

            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to save slider image:', error);
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
                     <Button onClick={handleAdd}>
                        <FaPlus className="h-4 w-4 mr-2" />
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
                                <CardFooter className="p-2 md:p-4 pt-0 flex justify-end items-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-50 group-hover:opacity-100" onClick={() => handleEdit(item)}>
                                        <FaEdit className="h-4 w-4" />
                                    </Button>
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
                item={selectedItem}
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
