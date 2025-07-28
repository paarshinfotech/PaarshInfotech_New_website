
"use client";

import { useState, useCallback, useEffect } from "react";
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
import { WorkshopFormModal } from "./WorkshopFormModal";
import {
  useGetWorkshopsQuery,
  useAddWorkshopMutation,
  useUpdateWorkshopMutation,
  useDeleteWorkshopMutation,
  useReorderWorkshopsMutation,
} from "@/services/api";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
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
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface Workshop {
  _id: string;
  title: string;
  date: string;
  location: string;
  presenter: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  order: number;
}

const SortableRow = ({
  workshop,
  handleEdit,
  handleDelete,
}: {
  workshop: Workshop;
  handleEdit: (workshop: Workshop) => void;
  handleDelete: (workshop: Workshop) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: workshop._id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : "auto",
  };

  const getStatusVariant = (status: Workshop["status"]) => {
    switch (status) {
      case "Upcoming":
        return "default";
      case "Completed":
        return "secondary";
      case "Cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell className="cursor-grab p-2" {...attributes} {...listeners}>
        <FaGripLines className="h-5 w-5 text-muted-foreground" />
      </TableCell>
      <TableCell className="font-medium">
        <div>{workshop.title}</div>
        <div className="text-xs text-muted-foreground">{workshop.location}</div>
      </TableCell>
      <TableCell>{format(new Date(workshop.date), "PPP")}</TableCell>
      <TableCell>{workshop.presenter}</TableCell>
      <TableCell>
        <Badge variant={getStatusVariant(workshop.status)}>
          {workshop.status}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <IoIosMore className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEdit(workshop)}>
              <FiEdit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(workshop)}
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

export function WorkshopsManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(
    null
  );
  const [workshops, setWorkshops] = useState<Workshop[]>([]);

  const { data: workshopsResponse, isLoading: workshopsLoading } =
    useGetWorkshopsQuery(undefined);
  const [addWorkshop] = useAddWorkshopMutation();
  const [updateWorkshop] = useUpdateWorkshopMutation();
  const [deleteWorkshop] = useDeleteWorkshopMutation();
  const [reorderWorkshops] = useReorderWorkshopsMutation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (workshopsResponse?.data) {
      setWorkshops(workshopsResponse.data);
    }
  }, [workshopsResponse]);

  const handleDragEnd = useCallback(
    async (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldItems = workshops;
            const oldIndex = oldItems.findIndex((item) => item._id === active.id);
            const newIndex = oldItems.findIndex((item) => item._id === over.id);
            const newItems = arrayMove(oldItems, oldIndex, newIndex);
            
            // Update the local state immediately for a smooth UI experience
            setWorkshops(newItems);
            
            const reorderedData = newItems.map((item, index) => ({
                _id: item._id,
                order: (index + 1) * 10, // Recalculate order with gaps
            }));

            try {
                // Send the reordered data to the backend
                await reorderWorkshops({ workshops: reorderedData }).unwrap();
                toast({ title: "Reordered successfully" });
            } catch (error: any) {
                // If the API call fails, revert the state and show an error
                setWorkshops(oldItems);
                toast({
                    title: "Error reordering",
                    description: error.data?.error || "An unknown error occurred",
                    variant: "destructive",
                });
            }
        }
    },
    [workshops, reorderWorkshops, toast]
  );

  const handleAdd = () => {
    setSelectedWorkshop(null);
    setIsModalOpen(true);
  };

  const handleEdit = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  };

  const handleDelete = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedWorkshop) {
      await deleteWorkshop({ _id: selectedWorkshop._id }).unwrap();
      toast({ title: "Workshop Deleted" });
    }
    setIsDeleteAlertOpen(false);
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedWorkshop) {
        await updateWorkshop({ _id: selectedWorkshop._id, ...data }).unwrap();
        toast({ title: "Workshop Updated" });
      } else {
        await addWorkshop(data).unwrap();
        toast({ title: "Workshop Added" });
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.error || "Could not save workshop.",
        variant: "destructive",
      });
    }
  };

  if (workshopsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Workshops & Events</CardTitle>
            <CardDescription>
              Manage upcoming and past workshops for the Excellence Centers.
            </CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <GoPlusCircle className="mr-2 h-4 w-4" /> Add Workshop
          </Button>
        </CardHeader>
        <CardContent>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 p-2"></TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Presenter</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <SortableContext
                items={workshops.map((p) => p._id)}
                strategy={verticalListSortingStrategy}
              >
                <TableBody>
                  {workshops.map((workshop) => (
                    <SortableRow
                      key={workshop._id}
                      workshop={workshop}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  ))}
                </TableBody>
              </SortableContext>
            </Table>
          </DndContext>
        </CardContent>
      </Card>

      <WorkshopFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        workshop={selectedWorkshop}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={selectedWorkshop?.title || "the selected workshop"}
      />
    </>
  );
}
