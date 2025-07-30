
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { ImagePreviewModal } from '@/components/common/ImagePreviewModal';
import { DeleteConfirmationDialog } from '@/components/admin/DeleteConfirmationDialog';
import { EventRecapFormModal } from '../EventRecapFormModal';
import { Badge } from '@/components/ui/badge';
import { useGetMediaItemsQuery, useAddMediaItemMutation, useUpdateMediaItemMutation, useDeleteMediaItemMutation } from '@/services/api';

interface EventsManagementTabProps {
    items: any[];
    setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

interface GalleryImage {
    alt: string;
    hint: string;
    image?: string; // base64 for new images
    imageUrl?: string; // URL for existing images
}

export function EventsManagementTab({ items: propItems, setItems: setPropItems }: EventsManagementTabProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    // RTK Query hooks
    const { data: eventItems = [], isLoading } = useGetMediaItemsQuery('event');
    const [addMediaItem] = useAddMediaItemMutation();
    const [updateMediaItem] = useUpdateMediaItemMutation();
    const [deleteMediaItem] = useDeleteMediaItemMutation();

    // Update local state when RTK query data changes
    useEffect(() => {
        if (eventItems) {
            setPropItems(eventItems);
        }
    }, [eventItems, setPropItems]);

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

    const handleSave = async (data: {
        title: string;
        description: string;
        hint: string;
        date: string;
        location: string;
        image?: string; // Main cover image base64
        galleryImages?: GalleryImage[];
    }) => {
        try {
            const formData = {
                title: data.title,
                description: data.description,
                hint: data.hint,
                eventDate: new Date(data.date),
                location: data.location,
                published: true,
                images: data.galleryImages, // Send the whole gallery array
            };

            const mutationData: any = {
                type: 'event',
                ...formData
            };
            
            if (data.image) {
                mutationData.imageBase64 = data.image;
            }

            if (selectedItem) {
                // Update existing item
                await updateMediaItem({
                    _id: selectedItem._id,
                    ...mutationData,
                }).unwrap();
            } else {
                // Add new item
                if (!data.image) {
                    throw new Error('Cover image is required for new events');
                }
                await addMediaItem(mutationData).unwrap();
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to save event:', error);
        }
    };


    const confirmDelete = async () => {
        if (selectedItem) {
            try {
                await deleteMediaItem({
                    type: 'event',
                    _id: selectedItem._id
                }).unwrap();
            } catch (error) {
                console.error('Failed to delete event:', error);
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
                        <CardTitle>Event Recaps</CardTitle>
                        <CardDescription>Manage the event cards and their individual galleries.</CardDescription>
                    </div>
                     <Button onClick={handleAdd}>
                        <FaPlus className="mr-2 h-4 w-4" />
                        Add Event
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {propItems.map((item, index) => (
                             <Card key={item._id || index} className="overflow-hidden group flex flex-col">
                                <ImagePreviewModal imgSrc={item.imageUrl} alt={item.title}>
                                    <div className="relative aspect-video cursor-pointer">
                                        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                                    </div>
                                </ImagePreviewModal>
                                <CardHeader>
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardDescription>{new Date(item.eventDate).toLocaleDateString()}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground text-sm">{item.description}</p>
                                    <Badge className="mt-4">{item.images?.length || 0} photos</Badge>
                                </CardContent>
                                <CardFooter className="justify-end gap-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEdit(item)}>
                                        <FaPencilAlt className="h-4 w-4"/>
                                    </Button>
                                    <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(item)}>
                                        <FaTrash className="h-4 w-4"/>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <EventRecapFormModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSave={handleSave}
                item={selectedItem}
            />

            <DeleteConfirmationDialog 
                isOpen={isDeleteAlertOpen}
                onOpenChange={setIsDeleteAlertOpen}
                onConfirm={confirmDelete}
                itemName={selectedItem?.title || "the selected event"}
            />
        </>
    )
}
