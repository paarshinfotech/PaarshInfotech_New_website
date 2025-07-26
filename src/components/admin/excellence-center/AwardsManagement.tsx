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
import { GoPlusCircle } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { FaTrashCan, FaAward } from "react-icons/fa6";
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
} from "@/services/api";
import { Badge } from "@/components/ui/badge";

export interface Award {
  _id: string;
  title: string;
  year: string;
  description: string;
}

export function AwardsManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);

  const { data: awardsResponse, isLoading: awardsLoading } = useGetAwardsQuery(undefined);
  const [addAward] = useAddAwardMutation();
  const [updateAward] = useUpdateAwardMutation();
  const [deleteAward] = useDeleteAwardMutation();

  const awards = awardsResponse?.data || [];

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
      toast({ title: "Error", description: error.data?.error || "Could not save award.", variant: "destructive" });
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
            <CardDescription>Manage the awards showcased on the Excellence Center page.</CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <GoPlusCircle className="mr-2 h-4 w-4" /> Add Award
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award: Award) => (
              <Card key={award._id} className="relative group">
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
                          <span className="sr-only">Open menu</span>
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
            ))}
          </div>
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
        itemName={selectedAward?.title || 'the selected award'} 
      />
    </>
  );
}
