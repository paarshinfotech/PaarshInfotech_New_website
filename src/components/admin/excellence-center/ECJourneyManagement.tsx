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
import { FaTrashCan, FaGripLines, LuFlag, LuBriefcase, LuBuilding2, LuRocket, LuGlobe, LuStar, LuTarget, LuTrendingUp } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { ECJourneyFormModal } from "./ECJourneyFormModal";
import {
  useGetECJourneyQuery,
  useAddECJourneyMilestoneMutation,
  useUpdateECJourneyMilestoneMutation,
  useDeleteECJourneyMilestoneMutation,
  useReorderECJourneyMilestonesMutation,
} from "@/services/api";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";

export interface ECJourneyMilestone {
  _id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

const iconMap: { [key: string]: React.ElementType } = {
    LuFlag, LuBriefcase, LuBuilding2, LuRocket, LuGlobe, LuStar, LuTarget, LuTrendingUp
};

interface SortableRowProps {
  milestone: ECJourneyMilestone;
  handleEdit: (milestone: ECJourneyMilestone) => void;
  handleDelete: (milestone: ECJourneyMilestone) => void;
}

const SortableRow = ({
  milestone,
  handleEdit,
  handleDelete,
}: SortableRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: milestone._id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  const IconComponent = iconMap[milestone.icon] || LuFlag;

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell className="cursor-grab p-2" {...attributes} {...listeners}>
        <FaGripLines className="h-5 w-5 text-muted-foreground" />
      </TableCell>
      <TableCell className="w-16"><IconComponent className="h-6 w-6 text-primary" /></TableCell>
      <TableCell className="font-medium">{milestone.title}</TableCell>
      <TableCell>{milestone.year}</TableCell>
      <TableCell className="max-w-sm truncate">{milestone.description}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><IoIosMore className="h-4 w-4" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEdit(milestone)}><FiEdit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(milestone)} className="text-destructive"><FaTrashCan className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export function ECJourneyManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<ECJourneyMilestone | null>(null);
  const [milestones, setMilestones] = useState<ECJourneyMilestone[]>([]);

  const { data: fetchedMilestones, isLoading } = useGetECJourneyQuery(undefined);
  const [addMilestone] = useAddECJourneyMilestoneMutation();
  const [updateMilestone] = useUpdateECJourneyMilestoneMutation();
  const [deleteMilestone] = useDeleteECJourneyMilestoneMutation();
  const [reorderMilestones] = useReorderECJourneyMilestonesMutation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (fetchedMilestones) {
      setMilestones(fetchedMilestones.data || []);
    }
  }, [fetchedMilestones]);

  const handleDragEnd = useCallback(async (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = milestones.findIndex((item) => item._id === active.id);
      const newIndex = milestones.findIndex((item) => item._id === over.id);
      const newItems = arrayMove(milestones, oldIndex, newIndex);
      setMilestones(newItems);
      
      const reorderedData = newItems.map((item, index) => ({ _id: item._id, order: index }));
      
      reorderMilestones({ milestones: reorderedData })
        .unwrap()
        .then(() => toast({ title: "Reordered successfully" }))
        .catch((error) => {
          toast({ title: "Error reordering", description: error.data?.error || "An unknown error occurred", variant: "destructive" });
          setMilestones(milestones);
        });
    }
  }, [milestones, reorderMilestones, toast]);

  const handleAdd = () => {
    setSelectedMilestone(null);
    setIsModalOpen(true);
  };

  const handleEdit = (milestone: ECJourneyMilestone) => {
    setSelectedMilestone(milestone);
    setIsModalOpen(true);
  };

  const handleDelete = (milestone: ECJourneyMilestone) => {
    setSelectedMilestone(milestone);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedMilestone) {
      await deleteMilestone({ _id: selectedMilestone._id }).unwrap();
      toast({ title: "Milestone Deleted" });
    }
    setIsDeleteAlertOpen(false);
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedMilestone) {
        await updateMilestone({ _id: selectedMilestone._id, ...data }).unwrap();
        toast({ title: "Milestone Updated" });
      } else {
        await addMilestone(data).unwrap();
        toast({ title: "Milestone Added" });
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast({ title: "Error", description: error.data?.error || "Could not save milestone.", variant: "destructive" });
    }
  };
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Excellence Center Journey</CardTitle>
            <CardDescription>Manage the journey milestones for the Excellence Center page.</CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <GoPlusCircle className="mr-2 h-4 w-4" /> Add Milestone
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? <p>Loading milestones...</p> : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <Table>
                <TableHeader><TableRow><TableHead className="w-12 p-2"></TableHead><TableHead>Icon</TableHead><TableHead>Title</TableHead><TableHead>Year</TableHead><TableHead>Description</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                <SortableContext items={milestones.map(p => p._id)} strategy={verticalListSortingStrategy}>
                  <TableBody>
                    {milestones.map((milestone) => (
                      <SortableRow key={milestone._id} milestone={milestone} handleEdit={handleEdit} handleDelete={handleDelete} />
                    ))}
                  </TableBody>
                </SortableContext>
              </Table>
            </DndContext>
          )}
        </CardContent>
      </Card>
      
      <ECJourneyFormModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} onSave={handleSave} milestone={selectedMilestone} />

      <DeleteConfirmationDialog 
        isOpen={isDeleteAlertOpen} 
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete} 
        itemName={selectedMilestone?.title || 'the selected milestone'} 
      />
    </>
  );
}
