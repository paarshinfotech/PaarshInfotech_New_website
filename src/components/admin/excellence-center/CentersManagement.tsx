
"use client";

import { useState } from "react";
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
import { FaTrashCan } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { CenterFormModal } from "./CenterFormModal";
import {
  useGetCentersQuery,
  useAddCenterMutation,
  useUpdateCenterMutation,
  useDeleteCenterMutation,
  useGetPartnersQuery,
} from "@/services/api";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export interface Center {
  _id: string;
  name: string;
  partnerId: { _id: string; name: string; logo: string };
  location: string;
  headOfCenter?: string;
  contactEmail?: string;
  isActive: boolean;
}

export function CentersManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null);

  const { data: centersResponse, isLoading: centersLoading } = useGetCentersQuery(undefined);
  const { data: partnersResponse, isLoading: partnersLoading } = useGetPartnersQuery(undefined);
  
  const [addCenter] = useAddCenterMutation();
  const [updateCenter] = useUpdateCenterMutation();
  const [deleteCenter] = useDeleteCenterMutation();

  const centers = centersResponse?.data || [];
  const partners = partnersResponse?.data || [];

  const handleAdd = () => {
    setSelectedCenter(null);
    setIsModalOpen(true);
  };

  const handleEdit = (center: Center) => {
    setSelectedCenter(center);
    setIsModalOpen(true);
  };

  const handleDelete = (center: Center) => {
    setSelectedCenter(center);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCenter) {
      await deleteCenter({ _id: selectedCenter._id }).unwrap();
      toast({ title: "Center Deleted" });
    }
    setIsDeleteAlertOpen(false);
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedCenter) {
        await updateCenter({ _id: selectedCenter._id, ...data }).unwrap();
        toast({ title: "Center Updated" });
      } else {
        await addCenter(data).unwrap();
        toast({ title: "Center Added" });
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast({ title: "Error", description: error.data?.error || "Could not save center.", variant: "destructive" });
    }
  };

  const handleToggleActive = async (center: Center) => {
    try {
      await updateCenter({ ...center, isActive: !center.isActive }).unwrap();
      toast({ title: "Status Updated" });
    } catch (error: any) {
      toast({ title: "Error", description: error.data?.error || "Could not update status.", variant: "destructive" });
    }
  };

  if (centersLoading || partnersLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Centers of Excellence</CardTitle>
            <CardDescription>Manage your established centers at partner colleges.</CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <GoPlusCircle className="mr-2 h-4 w-4" /> Add Center
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Center Name</TableHead>
                <TableHead>Partner College</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {centers.map((center: Center) => (
                <TableRow key={center._id}>
                  <TableCell className="font-medium">
                    <div>{center.name}</div>
                    <div className="text-xs text-muted-foreground">{center.location}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Image src={center.partnerId?.logo} alt={center.partnerId?.name} width={24} height={24} className="rounded-sm object-contain" />
                        <span>{center.partnerId?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`active-${center._id}`}
                        checked={center.isActive}
                        onCheckedChange={() => handleToggleActive(center)}
                      />
                      <Badge variant={center.isActive ? "default" : "secondary"}>
                        {center.isActive ? "Active" : "Inactive"}
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
                        <DropdownMenuItem onClick={() => handleEdit(center)}>
                          <FiEdit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(center)}
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
      
      <CenterFormModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        onSave={handleSave} 
        center={selectedCenter}
        partners={partners}
      />

      <DeleteConfirmationDialog 
        isOpen={isDeleteAlertOpen} 
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete} 
        itemName={selectedCenter?.name || 'the selected center'} 
      />
    </>
  );
}
