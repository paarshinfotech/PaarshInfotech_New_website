"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GoPlusCircle } from "react-icons/go";
import { FaGripLines, FaPencilAlt, FaTrash } from "react-icons/fa";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { CareerTestimonialFormModal } from "./CareerTestimonialFormModal";
import {
  useGetCareerTestimonialsQuery,
  useAddCareerTestimonialMutation,
  useUpdateCareerTestimonialMutation,
  useDeleteCareerTestimonialMutation,
  useReorderCareerTestimonialsMutation,
} from "@/services/api";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface CareerTestimonial {
  _id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  order: number;
}

const SortableTestimonialCard = ({ item, handleEdit, handleDelete }: { item: CareerTestimonial; handleEdit: (item: CareerTestimonial) => void; handleDelete: (item: CareerTestimonial) => void; }) => {
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
        <CardHeader className="flex flex-row items-center gap-4">
            <Image src={item.avatar} alt={item.name} width={40} height={40} className="rounded-full" />
            <div>
                <CardTitle className="text-base">{item.name}</CardTitle>
                <CardDescription>{item.role}</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground italic">"{item.quote}"</p>
        </CardContent>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <Button variant="secondary" size="icon" className="h-7 w-7" onClick={() => handleEdit(item)}>
                <FaPencilAlt className="h-3 w-3" />
            </Button>
            <Button variant="destructive" size="icon" className="h-7 w-7" onClick={() => handleDelete(item)}>
                <FaTrash className="h-3 w-3" />
            </Button>
        </div>
    </Card>
  );
};

export function CareerTestimonialManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CareerTestimonial | null>(null);
  const [items, setItems] = useState<CareerTestimonial[]>([]);

  const { data: fetchedItems, isLoading } = useGetCareerTestimonialsQuery(undefined);
  const [addItem] = useAddCareerTestimonialMutation();
  const [updateItem] = useUpdateCareerTestimonialMutation();
  const [deleteItem] = useDeleteCareerTestimonialMutation();
  const [reorderItems] = useReorderCareerTestimonialsMutation();

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
        await reorderItems({ testimonials: reorderedData }).unwrap();
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

  const handleEdit = (item: CareerTestimonial) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: CareerTestimonial) => {
    setSelectedItem(item);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedItem) {
      await deleteItem({ _id: selectedItem._id }).unwrap();
      toast({ title: "Testimonial Deleted" });
      setIsDeleteAlertOpen(false);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedItem) {
        await updateItem({ _id: selectedItem._id, ...data }).unwrap();
        toast({ title: "Testimonial Updated" });
      } else {
        await addItem(data).unwrap();
        toast({ title: "Testimonial Added" });
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast({ title: "Error", description: error.data?.error || "Could not save testimonial.", variant: "destructive" });
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Careers Success Stories</CardTitle>
            <CardDescription>Manage alumni testimonials for the careers page.</CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <GoPlusCircle className="mr-2 h-4 w-4" /> Add Testimonial
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading testimonials...</p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={items.map((p) => p._id)} strategy={verticalListSortingStrategy}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item) => (
                    <SortableTestimonialCard key={item._id} item={item} handleEdit={handleEdit} handleDelete={handleDelete} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </CardContent>
      </Card>

      <CareerTestimonialFormModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} onSave={handleSave} item={selectedItem} />
      <DeleteConfirmationDialog isOpen={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen} onConfirm={confirmDelete} itemName={`testimonial from ${selectedItem?.name}` || "the selected testimonial"} />
    </>
  );
}
