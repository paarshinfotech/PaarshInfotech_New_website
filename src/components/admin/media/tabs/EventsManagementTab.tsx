'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { ImagePreviewModal } from '@/components/common/ImagePreviewModal';
import type { EventRecap } from '@/lib/mediaData';
import { DeleteConfirmationDialog } from '@/components/admin/DeleteConfirmationDialog';
import { EventRecapFormModal } from '../EventRecapFormModal';
import { Badge } from '@/components/ui/badge';

interface EventsManagementTabProps {
    items: EventRecap[];
    setItems: React.Dispatch<React.SetStateAction<EventRecap[]>>;
}

export function EventsManagementTab({ items, setItems }: EventsManagementTabProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<EventRecap | null>(null);

    const handleAdd = () => {
        setSelectedItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item: EventRecap) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = (item: EventRecap) => {
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

    const handleSave = (data: { 
        title: string;
        hint: string;
        date: string;
        description: string;
        gallery: { alt: string; hint: string; src: string; }[];
        id?: number;
        imageFile?: any;
    }) => {
        const { imageFile, ...eventData } = data;

        if (selectedItem && eventData.id) {
            setItems(items.map(i => i.id === eventData.id ? { 
                ...i, 
                ...eventData,
                image: "https://placehold.co/800x600.png" // Placeholder for new image
            } : i));
        } else {
            setItems([...items, { 
                ...eventData, 
                id: Date.now(),
                image: "https://placehold.co/800x600.png" // Placeholder for new image
            }]);
        }
        setIsModalOpen(false);
        setSelectedItem(null);
    };


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
                        {items.map((item, index) => (
                             <Card key={index} className="overflow-hidden group flex flex-col">
                                <ImagePreviewModal imgSrc={item.image} alt={item.title}>
                                    <div className="relative aspect-video cursor-pointer">
                                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                                    </div>
                                </ImagePreviewModal>
                                <CardHeader>
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardDescription>{item.date}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground text-sm">{item.description}</p>
                                    <Badge className="mt-4">{item.gallery.length} photos</Badge>
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
