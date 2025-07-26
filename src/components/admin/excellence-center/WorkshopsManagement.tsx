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
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { WorkshopFormModal } from "./WorkshopFormModal";
import {
  useGetWorkshopsQuery,
  useAddWorkshopMutation,
  useUpdateWorkshopMutation,
  useDeleteWorkshopMutation,
} from "@/services/api";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export interface Workshop {
  _id: string;
  title: string;
  date: string;
  location: string;
  presenter: string;
  status: "Upcoming" | "Completed" | "Cancelled";
}

export function WorkshopsManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

  const { data: workshopsResponse, isLoading: workshopsLoading } = useGetWorkshopsQuery(undefined);
  const [addWorkshop] = useAddWorkshopMutation();
  const [updateWorkshop] = useUpdateWorkshopMutation();
  const [deleteWorkshop] = useDeleteWorkshopMutation();

  const workshops = workshopsResponse?.data || [];

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
      toast({ title: "Error", description: error.data?.error || "Could not save workshop.", variant: "destructive" });
    }
  };
  
  const getStatusVariant = (status: Workshop['status']) => {
    switch(status) {
        case 'Upcoming': return 'default';
        case 'Completed': return 'secondary';
        case 'Cancelled': return 'destructive';
        default: return 'outline';
    }
  }

  if (workshopsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Workshops & Events</CardTitle>
            <CardDescription>Manage upcoming and past workshops for the Excellence Centers.</CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <GoPlusCircle className="mr-2 h-4 w-4" /> Add Workshop
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Presenter</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workshops.map((workshop: Workshop) => (
                <TableRow key={workshop._id}>
                  <TableCell className="font-medium">
                    <div>{workshop.title}</div>
                    <div className="text-xs text-muted-foreground">{workshop.location}</div>
                  </TableCell>
                  <TableCell>{format(new Date(workshop.date), "PPP")}</TableCell>
                   <TableCell>{workshop.presenter}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(workshop.status)}>{workshop.status}</Badge>
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
              ))}
            </TableBody>
          </Table>
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
        itemName={selectedWorkshop?.title || 'the selected workshop'} 
      />
    </>
  );
}
