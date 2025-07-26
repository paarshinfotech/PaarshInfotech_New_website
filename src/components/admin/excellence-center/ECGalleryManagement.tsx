"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GoPlusCircle } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { ECGalleryFormModal } from "./ECGalleryFormModal";
import {
  useGetECGalleryQuery,
  useAddECGalleryItemMutation,
  useUpdateECGalleryItemMutation,
  useDeleteECGalleryItemMutation,
  useReorderECGalleryItemsMutation,
} from "@/services/api";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface ECGalleryItem {
  _id: string;
  title: string;
  imageUrl: string;
  order: number;
}

export function ECGalleryManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ECGalleryItem | null>(null);
  const [items, setItems] = useState<ECGalleryItem[]>([]);

  const { data: fetchedItems, isLoading } = useGetECGalleryQuery(undefined);
  const [addItem] = useAddECGalleryItemMutation();
  const [updateItem] = useUpdateECGalleryItemMutation();
  const [deleteItem] = useDeleteECGalleryItemMutation();
  const [reorderItems] = useReorderECGalleryItemsMutation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (fetchedItems) {
      setItems(fetchedItems.data || []);
    }
  }, [fetchedItems]);

  const handleDragEnd = useCallback(
    async (event: any) => {
      const { active, over } = event;
      if (active.id !== over.id) {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        setItems(newItems);

        const reorderedData = newItems.map((item, index) => ({
          _id: item._id,
          order: index,
        }));

        reorderItems({ items: reorderedData })
          .unwrap()
          .then(() => toast({ title: "Reordered successfully" }))
          .catch((error) => {
            toast({
              title: "Error reordering",
              description: error.data?.error || "An unknown error occurred",
              variant: "destructive",
            });
            setItems(items);
          });
      }
    },
    [items, reorderItems, toast]
  );

  const handleAdd = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: ECGalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: ECGalleryItem) => {
    setSelectedItem(item);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedItem) {
      await deleteItem({ _id: selectedItem._id }).unwrap();
      toast({ title: "Item Deleted" });
    }
    setIsDeleteAlertOpen(false);
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedItem) {
        await updateItem({ _id: selectedItem._id, ...data }).unwrap();
        toast({ title: "Item Updated" });
      } else {
        await addItem(data).unwrap();
        toast({ title: "Item Added" });
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.error || "Could not save item.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Excellence Center Gallery</CardTitle>
            <CardDescription>
              Manage the gallery images for the Excellence Center page.
            </CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <GoPlusCircle className="mr-2 h-4 w-4" /> Add Image
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading gallery...</p>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items.map((p) => p._id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map((item) => (
                    <SortableImageCard
                      key={item._id}
                      item={item}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </CardContent>
      </Card>

      <ECGalleryFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        item={selectedItem}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={selectedItem?.title || "the selected item"}
      />
    </>
  );
}

const SortableImageCard = ({
  item,
  handleEdit,
  handleDelete,
}: {
  item: ECGalleryItem;
  handleEdit: (item: ECGalleryItem) => void;
  handleDelete: (item: ECGalleryItem) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item._id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="overflow-hidden group relative"
    >
      <div
        {...listeners}
        className="cursor-grab absolute top-2 left-2 z-10 p-2 bg-white/50 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
      </div>
      <div className="relative aspect-square w-full">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
        <p className="text-white text-xs font-bold truncate">{item.title}</p>
        <div className="flex justify-end gap-1 mt-1">
          <Button
            variant="secondary"
            size="icon"
            className="h-6 w-6"
            onClick={() => handleEdit(item)}
          >
            <FiEdit className="h-3 w-3" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="h-6 w-6"
            onClick={() => handleDelete(item)}
          >
            <FaTrashCan className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
