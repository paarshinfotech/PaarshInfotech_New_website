"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  useGetCultureMomentsQuery,
  useAddCultureMomentMutation,
  useUpdateCultureMomentMutation,
  useDeleteCultureMomentMutation,
  useReorderCultureMomentsMutation,
} from "@/services/api";
import { CultureMomentForm } from "./CultureMomentForm";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { LuGripVertical, LuPencil, LuTrash2, LuPlus } from "react-icons/lu";
import Image from "next/image";

interface CultureMoment {
  _id: string;
  imageUrl: string;
  alt: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function CultureMomentsManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState<CultureMoment | null>(
    null
  );

  const { data: moments = [], isLoading } = useGetCultureMomentsQuery(false);
  const [addMoment] = useAddCultureMomentMutation();
  const [updateMoment] = useUpdateCultureMomentMutation();
  const [deleteMoment] = useDeleteCultureMomentMutation();
  const [reorderMoments] = useReorderCultureMomentsMutation();

  const handleAdd = () => {
    setSelectedMoment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (moment: CultureMoment) => {
    setSelectedMoment(moment);
    setIsModalOpen(true);
  };

  const handleDelete = (moment: CultureMoment) => {
    setSelectedMoment(moment);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedMoment) {
      try {
        await deleteMoment(selectedMoment._id).unwrap();
        toast({
          title: "Moment Deleted",
          description: `Moment has been deleted successfully.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete moment.",
          variant: "destructive",
        });
      }
    }
    setIsDeleteAlertOpen(false);
    setSelectedMoment(null);
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedMoment) {
        await updateMoment({ _id: selectedMoment._id, ...data }).unwrap();
        toast({
          title: "Moment Updated",
          description: `Moment has been updated successfully.`,
        });
      } else {
        await addMoment(data).unwrap();
        toast({
          title: "Moment Added",
          description: `Moment has been added successfully.`,
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save moment.",
        variant: "destructive",
      });
    }
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;
    const items = Array.from(moments) as CultureMoment[];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    // Update order numbers with gaps
    const updatedItems = items.map((item: CultureMoment, index: number) => ({
      ...item,
      order: (index + 1) * 10,
    }));
    try {
      await reorderMoments(updatedItems).unwrap();
      toast({
        title: "Order Updated",
        description: "Moments have been reordered successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reorder moments. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (moment: CultureMoment) => {
    try {
      await updateMoment({
        _id: moment._id,
        imageUrl: moment.imageUrl,
        alt: moment.alt,
        order: moment.order,
        isActive: !moment.isActive,
      }).unwrap();
      toast({
        title: "Status Updated",
        description: `Moment has been ${
          !moment.isActive ? "activated" : "deactivated"
        }.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update moment status.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading moments...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Moments That Matter</CardTitle>
            <CardDescription>
              Manage the images displayed in the "Moments That Matter" section
              on the About page.
            </CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <LuPlus className="mr-2 h-4 w-4" />
            Add Moment
          </Button>
        </CardHeader>
        <CardContent>
          {moments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No moments found.</p>
              <p>Click "Add Moment" to get started.</p>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="moments">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-3"
                  >
                    {moments.map((moment: CultureMoment, index: number) => (
                      <Draggable
                        key={moment._id}
                        draggableId={moment._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="flex items-center gap-3 p-4 border rounded-lg bg-background hover:bg-accent/50 transition-colors"
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="cursor-grab hover:cursor-grabbing"
                            >
                              <LuGripVertical className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-shrink-0 w-24 h-16 relative rounded overflow-hidden border">
                              <Image
                                src={moment.imageUrl}
                                alt={moment.alt}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold">
                                  {moment.alt}
                                </span>
                                <Badge
                                  variant={
                                    moment.isActive ? "default" : "secondary"
                                  }
                                >
                                  {moment.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-muted-foreground">
                                  Order: {moment.order}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={moment.isActive}
                                onCheckedChange={() => toggleActive(moment)}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(moment)}
                              >
                                <LuPencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(moment)}
                              >
                                <LuTrash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </CardContent>
      </Card>
      <CultureMomentForm
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        moment={selectedMoment}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={`moment: ${selectedMoment?.alt}`}
      />
    </>
  );
}
