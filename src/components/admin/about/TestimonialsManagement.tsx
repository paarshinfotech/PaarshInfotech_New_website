"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  useGetTestimonialsQuery,
  useAddTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useReorderTestimonialsMutation,
} from "@/services/api";
import { TestimonialForm } from "./TestimonialForm";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { FeedbackFormModal } from "@/components/common/FeedbackFormModal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { LuGripVertical, LuPencil, LuTrash2, LuPlus, LuStar, LuMessageSquare } from "react-icons/lu";

interface Testimonial {
  _id: string;
  name: string;
  designation: string;
  rating: number;
  feedback: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function TestimonialsManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  const { data: testimonials = [], isLoading } = useGetTestimonialsQuery(false);
  const [addTestimonial] = useAddTestimonialMutation();
  const [updateTestimonial] = useUpdateTestimonialMutation();
  const [deleteTestimonial] = useDeleteTestimonialMutation();
  const [reorderTestimonials] = useReorderTestimonialsMutation();

  const handleAdd = () => {
    setSelectedTestimonial(null);
    setIsModalOpen(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleDelete = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedTestimonial) {
      try {
        await deleteTestimonial(selectedTestimonial._id).unwrap();
        toast({
          title: "Testimonial Deleted",
          description: `${selectedTestimonial.name}'s testimonial has been deleted successfully.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete testimonial.",
          variant: "destructive",
        });
      }
    }
    setIsDeleteAlertOpen(false);
    setSelectedTestimonial(null);
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedTestimonial) {
        await updateTestimonial({ _id: selectedTestimonial._id, ...data }).unwrap();
        toast({
          title: "Testimonial Updated",
          description: `${data.name}'s testimonial has been updated successfully.`,
        });
      } else {
        await addTestimonial(data).unwrap();
        toast({
          title: "Testimonial Added",
          description: `${data.name}'s testimonial has been added successfully.`,
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save testimonial.",
        variant: "destructive",
      });
    }
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;
    const items = Array.from(testimonials) as Testimonial[];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    // Update order numbers with gaps
    const updatedItems = items.map((item: Testimonial, index: number) => ({
      ...item,
      order: (index + 1) * 10,
    }));
    try {
      await reorderTestimonials(updatedItems).unwrap();
      toast({
        title: "Order Updated",
        description: "Testimonials have been reordered successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reorder testimonials. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (testimonial: Testimonial) => {
    try {
      await updateTestimonial({
        _id: testimonial._id,
        name: testimonial.name,
        designation: testimonial.designation,
        rating: testimonial.rating,
        feedback: testimonial.feedback,
        order: testimonial.order,
        isActive: !testimonial.isActive,
      }).unwrap();
      toast({
        title: "Status Updated",
        description: `${testimonial.name}'s testimonial has been ${!testimonial.isActive ? 'activated' : 'deactivated'}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update testimonial status.",
        variant: "destructive",
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <LuStar
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading testimonials...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Testimonials Management</CardTitle>
            <CardDescription>
              Manage testimonials displayed on the About page and collect feedback from users.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsFeedbackModalOpen(true)}>
              <LuMessageSquare className="mr-2 h-4 w-4" />
              Test Feedback Form
            </Button>
            <Button onClick={handleAdd}>
              <LuPlus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {testimonials.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No testimonials found.</p>
              <p>Click "Add Testimonial" to get started.</p>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="testimonials">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-3"
                  >
                    {testimonials.map((testimonial: Testimonial, index: number) => (
                      <Draggable
                        key={testimonial._id}
                        draggableId={testimonial._id}
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
                                <h3 className="font-semibold">{testimonial.name}</h3>
                                <Badge variant="outline">{testimonial.designation}</Badge>
                                <Badge variant={testimonial.isActive ? "default" : "secondary"}>
                                  {testimonial.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                {renderStars(testimonial.rating)}
                                <span className="text-sm text-muted-foreground">
                                  ({testimonial.rating}/5)
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                "{testimonial.feedback}"
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-muted-foreground">
                                  Order: {testimonial.order}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Switch
                                checked={testimonial.isActive}
                                onCheckedChange={() => toggleActive(testimonial)}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(testimonial)}
                              >
                                <LuPencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(testimonial)}
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

      <TestimonialForm
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        testimonial={selectedTestimonial}
      />

      <FeedbackFormModal
        isOpen={isFeedbackModalOpen}
        onOpenChange={setIsFeedbackModalOpen}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={`testimonial from ${selectedTestimonial?.name}`}
      />
    </>
  );
} 