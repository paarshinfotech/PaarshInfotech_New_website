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
import { GoPlusCircle } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { FaTrashCan, FaAward, FaGripLines } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { AwardFormModal } from "./AwardFormModal";
import {
  useGetAwardsQuery,
  useAddAwardMutation,
  useUpdateAwardMutation,
  useDeleteAwardMutation,
  useReorderAwardsMutation,
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

export interface Award {
  _id: string;
  title: string;
  year: string;
  description: string;
  order: number;
}

const SortableAwardCard = ({
  award,
  handleEdit,
  handleDelete,
}: {
  award: Award;
  handleEdit: (award: Award) => void;
  handleDelete: (award: Award) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: award._id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <Card ref={setNodeRef} style={style} className="relative group">
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 p-2 bg-white/50 rounded-full cursor-grab"
      >
        <FaGripLines className="h-4 w-4 text-muted-foreground" />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <FaAward className="h-8 w-8 text-primary/70" />
          <Badge variant="outline">{award.year}</Badge>
        </div>
        <CardTitle className="pt-4">{award.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{award.description}</p>
      </CardContent>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <IoIosMore className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEdit(award)}>
              <FiEdit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(award)}
              className="text-destructive"
            >
              <FaTrashCan className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

export function AwardsManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [awards, setAwards] = useState<Award[]>([]);

  const { data: awardsResponse, isLoading: awardsLoading } =
    useGetAwardsQuery(undefined);
  const [addAward] = useAddAwardMutation();
  const [updateAward] = useUpdateAwardMutation();
  const [deleteAward] = useDeleteAwardMutation();
  const [reorderAwards] = useReorderAwardsMutation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (awardsResponse?.data) {
      setAwards(awardsResponse.data);
    }
  }, [awardsResponse]);

  const handleDragEnd = useCallback(
    async (event: any) => {
      const { active, over } = event;
      if (active.id !== over.id) {
        const oldIndex = awards.findIndex((item) => item._id === active.id);
        const newIndex = awards.findIndex((item) => item._id === over.id);
        const newItems = arrayMove(awards, oldIndex, newIndex);
        setAwards(newItems);

        const reorderedData = newItems.map((item, index) => ({
          _id: item._id,
          order: index,
        }));

        reorderAwards({ awards: reorderedData })
          .unwrap()
          .then(() => toast({ title: "Reordered successfully" }))
          .catch((error) => {
            toast({
              title: "Error reordering",
              description: error.data?.error || "An unknown error occurred",
              variant: "destructive",
            });
            setAwards(awards);
          });
      }
    },
    [awards, reorderAwards, toast]
  );

  const handleAdd = () => {
    setSelectedAward(null);
    setIsModalOpen(true);
  };

  const handleEdit = (award: Award) => {
    setSelectedAward(award);
    setIsModalOpen(true);
  };

  const handleDelete = (award: Award) => {
    setSelectedAward(award);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedAward) {
      await deleteAward({ _id: selectedAward._id }).unwrap();
      toast({ title: "Award Deleted" });
    }
    setIsDeleteAlertOpen(false);
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedAward) {
        await updateAward({ _id: selectedAward._id, ...data }).unwrap();
        toast({ title: "Award Updated" });
      } else {
        await addAward(data).unwrap();
        toast({ title: "Award Added" });
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.error || "Could not save award.",
        variant: "destructive",
      });
    }
  };

  if (awardsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Awards & Recognitions</CardTitle>
            <CardDescription>
              Manage the awards showcased on the Excellence Center page.
            </CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <GoPlusCircle className="mr-2 h-4 w-4" /> Add Award
          </Button>
        </CardHeader>
        <CardContent>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={awards.map((p) => p._id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {awards.map((award: Award) => (
                  <SortableAwardCard
                    key={award._id}
                    award={award}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>

      <AwardFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        award={selectedAward}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={selectedAward?.title || "the selected award"}
      />
    </>
  );
}
