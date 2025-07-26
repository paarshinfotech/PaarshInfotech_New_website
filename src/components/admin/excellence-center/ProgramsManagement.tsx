
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
import { ProgramFormModal } from "./ProgramFormModal";
import {
  useGetProgramsQuery,
  useAddProgramMutation,
  useUpdateProgramMutation,
  useDeleteProgramMutation,
  useReorderProgramsMutation,
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
import { Badge } from "@/components/ui/badge";
import { LuBookOpen } from "react-icons/lu";

export interface Program {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  order: number;
}

interface SortableRowProps {
  program: Program;
  handleEdit: (program: Program) => void;
  handleDelete: (program: Program) => void;
}

const SortableRow = ({
  program,
  handleEdit,
  handleDelete,
}: SortableRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: program._id });

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
        <LuBookOpen className="h-8 w-8 text-primary" />
      </TableCell>
      <TableCell className="font-medium">{program.title}</TableCell>
      <TableCell className="max-w-sm truncate">{program.description}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {program.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
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
            <DropdownMenuItem onClick={() => handleEdit(program)}>
              <FiEdit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(program)}
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

export function ProgramsManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);

  const { data: fetchedPrograms, isLoading } = useGetProgramsQuery(undefined);
  const [addProgram] = useAddProgramMutation();
  const [updateProgram] = useUpdateProgramMutation();
  const [deleteProgram] = useDeleteProgramMutation();
  const [reorderPrograms] = useReorderProgramsMutation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (fetchedPrograms) {
      setPrograms(fetchedPrograms.data || []);
    }
  }, [fetchedPrograms]);

  const handleDragEnd = useCallback(
    async (event: any) => {
      const { active, over } = event;
      if (active.id !== over.id) {
        const oldIndex = programs.findIndex((item) => item._id === active.id);
        const newIndex = programs.findIndex((item) => item._id === over.id);
        const newItems = arrayMove(programs, oldIndex, newIndex);
        setPrograms(newItems);
        
        const reorderedData = newItems.map((item, index) => ({ _id: item._id, order: (index + 1) * 10 }));
        
        reorderPrograms({ programs: reorderedData })
          .unwrap()
          .then(() => toast({ title: "Reordered successfully" }))
          .catch((error) => {
            toast({ title: "Error reordering", description: error.data?.error || "An unknown error occurred", variant: "destructive" });
            setPrograms(programs);
          });
      }
    },
    [programs, reorderPrograms, toast]
  );

  const handleAdd = () => {
    setSelectedProgram(null);
    setIsModalOpen(true);
  };

  const handleEdit = (program: Program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const handleDelete = (program: Program) => {
    setSelectedProgram(program);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProgram) {
      await deleteProgram({ _id: selectedProgram._id }).unwrap();
      toast({ title: "Program Deleted" });
    }
    setIsDeleteAlertOpen(false);
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedProgram) {
        await updateProgram({ _id: selectedProgram._id, ...data }).unwrap();
        toast({ title: "Program Updated" });
      } else {
        await addProgram(data).unwrap();
        toast({ title: "Program Added" });
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast({ title: "Error", description: error.data?.error || "Could not save program.", variant: "destructive" });
    }
  };
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Programs Offered</CardTitle>
            <CardDescription>Manage the programs offered through the Excellence Centers.</CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <GoPlusCircle className="mr-2 h-4 w-4" /> Add Program
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading programs...</p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 p-2"></TableHead>
                    <TableHead className="w-20">Icon</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <SortableContext items={programs.map(p => p._id)} strategy={verticalListSortingStrategy}>
                  <TableBody>
                    {programs.map((program) => (
                      <SortableRow key={program._id} program={program} handleEdit={handleEdit} handleDelete={handleDelete} />
                    ))}
                  </TableBody>
                </SortableContext>
              </Table>
            </DndContext>
          )}
        </CardContent>
      </Card>
      
      <ProgramFormModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} onSave={handleSave} program={selectedProgram} />

      <DeleteConfirmationDialog 
        isOpen={isDeleteAlertOpen} 
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete} 
        itemName={selectedProgram?.title || 'the selected program'} 
      />
    </>
  );
}
