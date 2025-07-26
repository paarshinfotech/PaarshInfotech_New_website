"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  useGetJourneyMilestonesQuery, 
  useAddJourneyMilestoneMutation, 
  useUpdateJourneyMilestoneMutation, 
  useDeleteJourneyMilestoneMutation,
  useReorderJourneyMilestonesMutation 
} from "@/services/api";
import { JourneyMilestoneForm } from "./JourneyMilestoneForm";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { LuGripVertical, LuPencil, LuTrash2, LuPlus } from "react-icons/lu";

interface JourneyMilestone {
  _id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function JourneyMilestonesManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<JourneyMilestone | null>(null);

  const { data: milestones = [], isLoading } = useGetJourneyMilestonesQuery(false);
  const [addMilestone] = useAddJourneyMilestoneMutation();
  const [updateMilestone] = useUpdateJourneyMilestoneMutation();
  const [deleteMilestone] = useDeleteJourneyMilestoneMutation();
  const [reorderMilestones] = useReorderJourneyMilestonesMutation();

  const handleAdd = () => {
    setSelectedMilestone(null);
    setIsModalOpen(true);
  };

  const handleEdit = (milestone: JourneyMilestone) => {
    setSelectedMilestone(milestone);
    setIsModalOpen(true);
  };

  const handleDelete = (milestone: JourneyMilestone) => {
    setSelectedMilestone(milestone);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedMilestone) {
      try {
        await deleteMilestone(selectedMilestone._id).unwrap();
        toast({
          title: "Milestone Deleted",
          description: `${selectedMilestone.title} has been deleted successfully.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete milestone.",
          variant: "destructive",
        });
      }
    }
    setIsDeleteAlertOpen(false);
    setSelectedMilestone(null);
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedMilestone) {
        await updateMilestone({ _id: selectedMilestone._id, ...data }).unwrap();
        toast({
          title: "Milestone Updated",
          description: `${data.title} has been updated successfully.`,
        });
      } else {
        await addMilestone(data).unwrap();
        toast({
          title: "Milestone Added",
          description: `${data.title} has been added successfully.`,
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save milestone.",
        variant: "destructive",
      });
    }
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(milestones) as JourneyMilestone[];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order numbers with gaps to avoid conflicts
    const updatedItems = items.map((item: JourneyMilestone, index: number) => ({
      ...item,
      order: (index + 1) * 10, // Use increments of 10 to leave room for future insertions
    }));

    try {
      await reorderMilestones(updatedItems).unwrap();
      toast({
        title: "Order Updated",
        description: "Milestones have been reordered successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reorder milestones. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (milestone: JourneyMilestone) => {
    try {
      await updateMilestone({
        _id: milestone._id,
        year: milestone.year,
        title: milestone.title,
        description: milestone.description,
        icon: milestone.icon,
        order: milestone.order,
        isActive: !milestone.isActive,
      }).unwrap();
      toast({
        title: "Status Updated",
        description: `${milestone.title} has been ${!milestone.isActive ? 'activated' : 'deactivated'}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update milestone status.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading milestones...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Our Journey Milestones</CardTitle>
            <CardDescription>
              Manage the milestones displayed in the "Our Journey" section on the About page.
            </CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <LuPlus className="mr-2 h-4 w-4" />
            Add Milestone
          </Button>
        </CardHeader>
        <CardContent>
          {milestones.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No journey milestones found.</p>
              <p>Click "Add Milestone" to get started.</p>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="milestones">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-3"
                  >
                    {milestones.map((milestone: JourneyMilestone, index: number) => (
                      <Draggable
                        key={milestone._id}
                        draggableId={milestone._id}
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
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{milestone.title}</h3>
                                <Badge variant="outline">{milestone.year}</Badge>
                                <Badge variant={milestone.isActive ? "default" : "secondary"}>
                                  {milestone.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {milestone.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-muted-foreground">
                                  Icon: {milestone.icon}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Order: {milestone.order}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Switch
                                checked={milestone.isActive}
                                onCheckedChange={() => toggleActive(milestone)}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(milestone)}
                              >
                                <LuPencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(milestone)}
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

      <JourneyMilestoneForm
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        milestone={selectedMilestone}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={`milestone: ${selectedMilestone?.title}`}
      />
    </>
  );
} 