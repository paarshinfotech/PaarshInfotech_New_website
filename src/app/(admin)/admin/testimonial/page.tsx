"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GoPlusCircle } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TestimonialFormModal } from "@/components/admin/testimonials/TestimonialFormModal";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  useGetTestimonialsQuery,
  useAddTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} from "../../../../services/api";
import { AdminTableSkeleton } from "@/components/ui/skeletons";

interface Testimonial {
  _id: string;
  quote: string;
  name: string;
  title: string;
  type: string;
  avatar: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface TestimonialRowProps {
  testimonial: Testimonial;
  handleEdit: (testimonial: Testimonial) => void;
  handleDelete: (testimonial: Testimonial) => void;
  handleTogglePublished: (testimonialId: string, published: boolean) => void;
}

const TestimonialRow = ({
  testimonial,
  handleEdit,
  handleDelete,
  handleTogglePublished,
}: TestimonialRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={40}
          height={40}
          className="rounded-md object-contain"
        />
      </TableCell>
      <TableCell className="font-medium">{testimonial.name}</TableCell>
      <TableCell>{testimonial.title}</TableCell>
      <TableCell>{testimonial.quote?.substring(0, 50)}...</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Switch
            id={`published-${testimonial._id}`}
            checked={testimonial.published}
            onCheckedChange={(checked) =>
              handleTogglePublished(testimonial._id, checked)
            }
          />
          <Badge variant={testimonial.published ? "default" : "secondary"}>
            {testimonial.published ? "Published" : "Draft"}
          </Badge>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <IoIosMore className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEdit(testimonial)}>
              <FiEdit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(testimonial)}
              className="text-destructive"
            >
              <FaTrashCan className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default function TestimonialsManagementPage() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);

  const {
    data: testimonialsData,
    isLoading: testimonialsLoading,
    error: testimonialsError,
  } = useGetTestimonialsQuery(undefined);

  const testimonials = testimonialsData?.data || [];

  const [addTestimonial] = useAddTestimonialMutation();
  const [updateTestimonial] = useUpdateTestimonialMutation();
  const [deleteTestimonial] = useDeleteTestimonialMutation();

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

  const handleSave = async (testimonialData: {
    quote: string;
    name: string;
    title: string;
    type: string;
    avatarBase64?: string;
    published?: boolean;
  }) => {
    try {
      if (selectedTestimonial) {
        await updateTestimonial({
          _id: selectedTestimonial._id,
          quote: testimonialData.quote,
          name: testimonialData.name,
          title: testimonialData.title,
          type: testimonialData.type,
          avatarBase64: testimonialData.avatarBase64,
          published: testimonialData.published ?? selectedTestimonial.published,
        }).unwrap();
        toast({
          title: "Testimonial Updated",
          description: `${testimonialData.name}'s testimonial has been updated successfully.`,
        });
      } else {
        await addTestimonial({
          quote: testimonialData.quote,
          name: testimonialData.name,
          title: testimonialData.title,
          type: testimonialData.type,
          avatarBase64: testimonialData.avatarBase64,
          published: testimonialData.published ?? true,
        }).unwrap();
        toast({
          title: "Testimonial Created",
          description: `${testimonialData.name}'s testimonial has been created successfully.`,
        });
      }
      setIsModalOpen(false);
      setSelectedTestimonial(null);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${
          selectedTestimonial ? "update" : "create"
        } testimonial.`,
        variant: "destructive",
      });
    }
  };

  const handleTogglePublished = async (
    testimonialId: string,
    published: boolean
  ) => {
    try {
      const testimonial = testimonials.find(
        (t: Testimonial) => t._id === testimonialId
      );
      if (!testimonial) return;
      await updateTestimonial({
        _id: testimonialId,
        quote: testimonial.quote,
        name: testimonial.name,
        title: testimonial.title,
        type: testimonial.type,
        published,
      }).unwrap();
      toast({
        title: "Status Updated",
        description: `${testimonial.name}'s visibility has been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update visibility status.",
        variant: "destructive",
      });
    }
  };

  if (testimonialsLoading) {
    return <AdminTableSkeleton title="Testimonials Management" />;
  }

  if (testimonialsError) {
    return <div>Error: Failed to load testimonials</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Testimonials Management</CardTitle>
          <CardDescription>
            Manage your company's testimonials and their visibility on the
            public site.
          </CardDescription>
        </div>
        <Button size="sm" onClick={handleAdd}>
          <GoPlusCircle className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Quote</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial: Testimonial) => (
              <TestimonialRow
                key={testimonial._id}
                testimonial={testimonial}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleTogglePublished={handleTogglePublished}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <TestimonialFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        testimonial={
          selectedTestimonial && { ...selectedTestimonial, type: "client" }
        }
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={selectedTestimonial?.name || "the selected testimonial"}
      />
    </Card>
  );
}
