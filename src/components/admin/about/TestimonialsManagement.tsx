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
} from "@/services/api";
import { TestimonialForm } from "./TestimonialForm";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { LuPencil, LuTrash2, LuPlus, LuMessageSquare } from "react-icons/lu";

interface Testimonial {
  _id: string;
  name: string;
  title: string;
  quote: string;
  avatar: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export function TestimonialsManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  const { data: testimonialsData, isLoading } = useGetTestimonialsQuery(false);
  const [addTestimonial] = useAddTestimonialMutation();
  const [updateTestimonial] = useUpdateTestimonialMutation();
  const [deleteTestimonial] = useDeleteTestimonialMutation();

  const testimonials = testimonialsData?.data || [];

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

  const togglePublished = async (testimonial: Testimonial) => {
    try {
      await updateTestimonial({
        _id: testimonial._id,
        name: testimonial.name,
        title: testimonial.title,
        quote: testimonial.quote,
        avatar: testimonial.avatar,
        published: !testimonial.published,
      }).unwrap();
      toast({
        title: "Status Updated",
        description: `${testimonial.name}'s testimonial has been ${!testimonial.published ? 'published' : 'unpublished'}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update testimonial status.",
        variant: "destructive",
      });
    }
  };

  const handleImageError = (testimonial: Testimonial) => {
    toast({
      title: "Image Load Error",
      description: `Failed to load avatar for ${testimonial.name}. Please ensure the image is valid.`,
      variant: "destructive",
    });
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
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Avatar</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Quote</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((testimonial: Testimonial) => (
                    <tr
                      key={testimonial._id}
                      className="border-b hover:bg-accent/50 transition-colors"
                    >
                      <td className="px-4 py-2">
                        {testimonial.avatar ? (
                          <img
                            src={testimonial.avatar}
                            alt={`${testimonial.name}'s avatar`}
                            className="h-12 w-12 object-cover rounded-full"
                            onError={() => handleImageError(testimonial)}
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2 font-semibold">{testimonial.name}</td>
                      <td className="px-4 py-2">
                        <Badge variant="outline">{testimonial.title}</Badge>
                      </td>
                      <td className="px-4 py-2 text-sm text-muted-foreground line-clamp-2">
                        "{testimonial.quote}"
                      </td>
                      <td className="px-4 py-2">
                        <Badge variant={testimonial.published ? "default" : "secondary"}>
                          {testimonial.published ? "Published" : "Unpublished"}
                        </Badge>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={testimonial.published}
                            onCheckedChange={() => togglePublished(testimonial)}
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <TestimonialForm
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        testimonial={selectedTestimonial}
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