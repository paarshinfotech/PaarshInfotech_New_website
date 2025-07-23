'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaPlus, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { ImagePreviewModal } from '@/components/common/ImagePreviewModal';
import type { PhotoSliderImage } from '@/lib/mediaData';
import { DeleteConfirmationDialog } from '@/components/admin/DeleteConfirmationDialog';
import { SliderImageFormModal } from '../SliderImageFormModal';

interface SliderManagementTabProps {
    items: PhotoSliderImage[];
    setItems: React.Dispatch<React.SetStateAction<PhotoSliderImage[]>>;
}

export function SliderManagementTab({ items, setItems }: SliderManagementTabProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<PhotoSliderImage | null>(null);

    const handleSave = (data: { alt: string; hint: string; image?: any }) => {
        const newItem: PhotoSliderImage = {
            id: Date.now(),
            src: "https://placehold.co/600x400.png",
            alt: data.alt,
            hint: data.hint.toLowerCase(),
        }
        setItems(prev => [newItem, ...prev]);
        setIsModalOpen(false);
    }
    
    const handleDelete = (item: PhotoSliderImage) => {
        setSelectedItem(item);
        setIsDeleteAlertOpen(true);
    };

    const confirmDelete = () => {
        if(selectedItem) {
            setItems(items.filter(item => item.id !== selectedItem.id));
        }
        setIsDeleteAlertOpen(false);
        setSelectedItem(null);
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
                        {items.map((item, index) => (
                             <Card key={index} className="overflow-hidden group">
                                <ImagePreviewModal imgSrc={item.src} alt={item.alt}>
                                    <div className="relative aspect-video cursor-pointer">
                                        <Image src={item.src} alt={item.alt} fill className="object-cover" />
                                    </div>
                                </ImagePreviewModal>
                                <CardHeader className="p-2 md:p-4">
                                    <CardTitle className="text-sm md:text-base truncate">{item.alt}</CardTitle>
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
                itemName={selectedItem?.alt || "the selected image"}
            />
        </>
    )
}
