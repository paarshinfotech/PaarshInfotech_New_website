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
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { FaTrashCan, FaGripLines } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { ECTestimonialFormModal } from "./ECTestimonialFormModal";
import {
  useGetECTestimonialsQuery,
  useAddECTestimonialMutation,
  useUpdateECTestimonialMutation,
  useDeleteECTestimonialMutation,
  useReorderECTestimonialsMutation,
} from "@/services/api";
import { Badge } from "@/components/ui/badge";
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

export interface ECTestimonial {
  _id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  published: boolean;
  order: number;
}

interface SortableRowProps {
  testimonial: ECTestimonial;
  handleEdit: (testimonial: ECTestimonial) => void;
  handleDelete: (testimonial: ECTestimonial) => void;
  handleTogglePublish: (testimonial: ECTestimonial) => void;
}

const SortableRow = ({
  testimonial,
  handleEdit,
  handleDelete,
  handleTogglePublish,
}: SortableRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: testimonial._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell className="cursor-grab p-2" {...attributes} {...listeners}>
        <FaGripLines className="h-5 w-5 text-muted-foreground" />
      </TableCell>
      <TableCell className="w-16">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={48}
          height={48}
          className="rounded-full object-cover aspect-square"
        />
      </TableCell>
      <TableCell className="font-medium">{testimonial.name}</TableCell>
      <TableCell>{testimonial.role}</TableCell>
      <TableCell className="max-w-xs truncate">{testimonial.quote}</TableCell>
      <TableCell>
        <Badge
          className="cursor-pointer"
          variant={testimonial.published ? "default" : "secondary"}
          onClick={() => handleTogglePublish(testimonial)}
        >
          {testimonial.published ? "Published" : "Unpublished"}
        </Badge>
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
              <FiEdit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(testimonial)}
              className="text-destructive"
            >
              <FaTrashCan className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export function ECTestimonialsManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<ECTestimonial | null>(null);
  const [testimonials, setTestimonials] = useState<ECTestimonial[]>([]);

  const { data: fetchedTestimonials, isLoading } =
    useGetECTestimonialsQuery(undefined);
  const [addECTestimonial] = useAddECTestimonialMutation();
  const [updateECTestimonial] = useUpdateECTestimonialMutation();
  const [deleteECTestimonial] = useDeleteECTestimonialMutation();
  const [reorderECTestimonials] = useReorderECTestimonialsMutation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (fetchedTestimonials) {
      setTestimonials(fetchedTestimonials.data || []);
    }
  }, [fetchedTestimonials]);

  const handleDragEnd = useCallback(
    async (event: any) => {
      const { active, over } = event;
      if (active.id !== over.id) {
        setTestimonials((items) => {
          const oldIndex = items.findIndex((item) => item._id === active.id);
          const newIndex = items.findIndex((item) => item._id === over.id);
          const newItems = arrayMove(items, oldIndex, newIndex);

          const reorderedData = newItems.map((item, index) => ({
            _id: item._id,
            order: (index + 1) * 10,
          }));

          reorderECTestimonials({ testimonials: reorderedData })
            .unwrap()
            .then(() => {
              toast({ title: "Reordered successfully" });
            })
            .catch((error) => {
              toast({
                title: "Error reordering",
                description:
                  error.data?.error || "An unknown error occurred",
                variant: "destructive",
              });
              setTestimonials(items);
            });

          return newItems;
        });
      }
    },
    [reorderECTestimonials, toast]
  );

  const handleAdd = () => {
    setSelectedTestimonial(null);
    setIsModalOpen(true);
  };

  const handleEdit = (testimonial: ECTestimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleDelete = (testimonial: ECTestimonial) => {
    setSelectedTestimonial(testimonial);
    setIsDeleteAlertOpen(true);
  };

  const handleTogglePublish = async (testimonial: ECTestimonial) => {
    try {
      await updateECTestimonial({
        _id: testimonial._id,
        published: !testimonial.published,
      }).unwrap();
      toast({
        title: `Testimonial ${!testimonial.published ? "Published" : "Unpublished"}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Could not update status.",
        variant: "destructive",
      });
    }
  };

  const confirmDelete = async () => {
    if (selectedTestimonial) {
      await deleteECTestimonial({ _id: selectedTestimonial._id }).unwrap();
      toast({ title: "Testimonial Deleted" });
    }
    setIsDeleteAlertOpen(false);
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedTestimonial) {
        await updateECTestimonial({
          _id: selectedTestimonial._id,
          ...data,
        }).unwrap();
        toast({ title: "Testimonial Updated" });
      } else {
        await addECTestimonial(data).unwrap();
        toast({ title: "Testimonial Added" });
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.data?.error || "Could not save testimonial.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Excellence Center Testimonials</CardTitle>
            <CardDescription>
              Manage testimonials. Drag rows to reorder the sequence on the website.
            </CardDescription>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 p-2"></TableHead>
                    <TableHead>Avatar</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Quote</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <SortableContext items={testimonials.map(t => t._id)} strategy={verticalListSortingStrategy}>
                  <TableBody>
                    {testimonials.map((testimonial) => (
                      <SortableRow
                        key={testimonial._id}
                        testimonial={testimonial}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleTogglePublish={handleTogglePublish}
                      />
                    ))}
                  </TableBody>
                </SortableContext>
              </Table>
            </DndContext>
          )}
        </CardContent>
      </Card>

      <ECTestimonialFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        testimonial={selectedTestimonial}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={selectedTestimonial?.name || "the selected testimonial"}
      />
    </>
  );
}
