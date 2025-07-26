// src/app/(admin)/admin/excellence-center/gallery/page.tsx
"use client";

import { GalleryManagementTab } from "@/components/admin/media/tabs/GalleryManagementTab";
import { useGetMediaItemsQuery } from "@/services/api";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GalleryPage() {
    const [galleryItems, setGalleryItems] = useState<any[]>([]);
    const { data: galleryData = [] } = useGetMediaItemsQuery('gallery');

    useEffect(() => {
        if (galleryData) {
            setGalleryItems(galleryData);
        }
    }, [galleryData]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gallery Management</CardTitle>
                <CardDescription>Manage the images in the Excellence Center gallery.</CardDescription>
            </CardHeader>
            <CardContent>
                <GalleryManagementTab items={galleryItems} setItems={setGalleryItems} />
            </CardContent>
        </Card>
    );
}
