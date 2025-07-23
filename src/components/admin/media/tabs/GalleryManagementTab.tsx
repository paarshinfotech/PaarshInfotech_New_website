'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaPlus, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MediaUploadModal } from '@/components/admin/media/MediaUploadModal';
import { ImagePreviewModal } from '@/components/common/ImagePreviewModal';
import type { MediaItem } from '@/lib/mediaData';
import { DeleteConfirmationDialog } from '@/components/admin/DeleteConfirmationDialog';

interface GalleryManagementTabProps {
    items: MediaItem[];
    setItems: React.Dispatch<React.SetStateAction<MediaItem[]>>;
}

export function GalleryManagementTab({ items, setItems }: GalleryManagementTabProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

    const handleSave = (data: { 
        alt: string; 
        category: string; 
        image?: any; 
    }) => {
        const newItem: MediaItem = {
            src: "https://placehold.co/600x600.png",
            alt: data.alt,
            category: data.category as "All" | "Office Culture" | "Sports" | "Parties" | "Celebrations",
            hint: data.alt.toLowerCase(),
        }
        setItems(prev => [newItem, ...prev]);
        setIsModalOpen(false);
    }
    
    const handleDelete = (item: MediaItem) => {
        setSelectedItem(item);
        setIsDeleteAlertOpen(true);
    };

    const confirmDelete = () => {
        if(selectedItem) {
            setItems(items.filter(item => item.src !== selectedItem.src));
        }
        setIsDeleteAlertOpen(false);
        setSelectedItem(null);
    }

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Main Gallery Images</CardTitle>
                        <CardDescription>Manage images for the filterable gallery on the Media page.</CardDescription>
                    </div>
                     <Button onClick={() => setIsModalOpen(true)}>
                        <FaPlus className="h-4 w-4" />
                        Upload Media
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {items.map((item, index) => (
                             <Card key={index} className="overflow-hidden group">
                                <ImagePreviewModal imgSrc={item.src} alt={item.alt}>
                                    <div className="relative aspect-square cursor-pointer">
                                        <Image src={item.src} alt={item.alt} fill className="object-cover" />
                                    </div>
                                </ImagePreviewModal>
                                <CardHeader className="p-2 md:p-4">
                                    <CardTitle className="text-sm md:text-base truncate">{item.alt}</CardTitle>
                                </CardHeader>
                                <CardFooter className="p-2 md:p-4 pt-0 flex justify-between items-center">
                                    <Badge variant="outline">{item.category}</Badge>
                                    <Button variant="destructive" size="icon" className="h-7 w-7 opacity-50 group-hover:opacity-100" onClick={() => handleDelete(item)}>
                                        <FaTrash className="h-4 w-4"/>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <MediaUploadModal 
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
