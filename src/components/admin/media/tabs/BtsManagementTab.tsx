"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FaEdit } from "react-icons/fa";

import Image from "next/image";
import { ImagePreviewModal } from "@/components/common/ImagePreviewModal";
import type { BehindTheScenesItem } from "@/lib/mediaData";
import { BtsFormModal } from "../BtsFormModal";

interface BtsManagementTabProps {
  items: BehindTheScenesItem[];
  setItems: React.Dispatch<React.SetStateAction<BehindTheScenesItem[]>>;
}

export function BtsManagementTab({ items, setItems }: BtsManagementTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BehindTheScenesItem | null>(
    null
  );

  const handleEdit = (item: BehindTheScenesItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (data: BehindTheScenesItem) => {
    setItems((prev) => prev.map((item) => (item.id === data.id ? data : item)));
    setIsModalOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Behind the Scenes Cards</CardTitle>
          <CardDescription>
            Manage the three cards in the "A Day in the Life" section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <Card key={index} className="overflow-hidden group">
                <ImagePreviewModal imgSrc={item.image} alt={item.title}>
                  <div className="relative aspect-video cursor-pointer">
                    <Image
                      src={item.image}
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
                </CardContent>
                <CardFooter className="justify-end">
                  <Button variant="outline" onClick={() => handleEdit(item)}>
                    <FaEdit className="mr-2 h-4 w-4" />
                    Edit
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
    </>
  );
}
