"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GoPlusCircle } from "react-icons/go";
import { FaGripLines, FaPencilAlt, FaTrash } from "react-icons/fa";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { CareerImageFormModal } from "./CareerImageFormModal";
import {
  useGetCareerImagesQuery,
  useAddCareerImageMutation,
  useUpdateCareerImageMutation,
  useDeleteCareerImageMutation,
  useReorderCareerImagesMutation,
} from "@/services/api";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface CareerImage {
  _id: string;
  imageUrl: string;
  alt: string;
  hint: string;
  order: number;
}

const SortableImageCard = ({ item, handleEdit, handleDelete }: { item: CareerImage; handleEdit: (item: CareerImage) => void; handleDelete: (item: CareerImage) => void; }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item._id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} className="overflow-hidden group relative">
      <div {...listeners} className="cursor-grab absolute top-2 left-2 z-10 p-2 bg-white/50 rounded-full">
        <FaGripLines className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="relative aspect-video w-full">
        <Image src={item.imageUrl} alt={item.alt} fill className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
        <p className="text-white text-xs font-bold truncate">{item.alt}</p>
        <div className="flex justify-end gap-1 mt-1">
          <Button variant="secondary" size="icon" className="h-6 w-6" onClick={() => handleEdit(item)}>
            <FaPencilAlt className="h-3 w-3" />
          </Button>
          <Button variant="destructive" size="icon" className="h-6 w-6" onClick={() => handleDelete(item)}>
            <FaTrash className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export function CareerImageManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CareerImage | null>(null);
  const [items, setItems] = useState<CareerImage[]>([]);

  const { data: fetchedItems, isLoading } = useGetCareerImagesQuery(undefined);
  const [addItem] = useAddCareerImageMutation();
  const [updateItem] = useUpdateCareerImageMutation();
  const [deleteItem] = useDeleteCareerImageMutation();
  const [reorderItems] = useReorderCareerImagesMutation();

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  useEffect(() => {
    if (fetchedItems?.data) setItems(fetchedItems.data);
  }, [fetchedItems]);

  const handleDragEnd = useCallback(async (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item._id === active.id);
      const newIndex = items.findIndex((item) => item._id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      const reorderedData = newItems.map((item, index) => ({ _id: item._id, order: (index + 1) * 10 }));
      try {
        await reorderItems({ images: reorderedData }).unwrap();
        toast({ title: "Reordered successfully" });
      } catch (error) {
        toast({ title: "Error reordering", variant: "destructive" });
        setItems(items);
      }
    }
  }, [items, reorderItems, toast]);

  const handleAdd = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: CareerImage) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: CareerImage) => {
    setSelectedItem(item);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedItem) {
      await deleteItem({ _id: selectedItem._id }).unwrap();
      toast({ title: "Image Deleted" });
      setIsDeleteAlertOpen(false);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedItem) {
        await updateItem({ _id: selectedItem._id, ...data }).unwrap();
        toast({ title: "Image Updated" });
      } else {
        await addItem(data).unwrap();
        toast({ title: "Image Added" });
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast({ title: "Error", description: error.data?.error || "Could not save image.", variant: "destructive" });
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Careers Media Management</CardTitle>
            <CardDescription>Manage images for the "Life at Paarsh Infotech" section.</CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <GoPlusCircle className="mr-2 h-4 w-4" /> Add Image
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading images...</p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={items.map((p) => p._id)} strategy={verticalListSortingStrategy}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map((item) => (
                    <SortableImageCard key={item._id} item={item} handleEdit={handleEdit} handleDelete={handleDelete} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </CardContent>
      </Card>

      <CareerImageFormModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} onSave={handleSave} item={selectedItem} />
      <DeleteConfirmationDialog isOpen={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen} onConfirm={confirmDelete} itemName={selectedItem?.alt || "the selected image"} />
    </>
  );
}
