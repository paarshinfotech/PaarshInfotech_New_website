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
import { PartnerFormModal } from "./PartnerFormModal";
import {
  useGetPartnersQuery,
  useAddPartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
  useReorderPartnersMutation,
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

export interface Partner {
  _id: string;
  name: string;
  logo: string;
  location: string;
  order: number;
}

interface SortableRowProps {
  partner: Partner;
  handleEdit: (partner: Partner) => void;
  handleDelete: (partner: Partner) => void;
}

const SortableRow = ({
  partner,
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
  } = useSortable({ id: partner._id });

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
      <TableCell className="w-20">
        <Image
          src={partner.logo}
          alt={partner.name}
          width={64}
          height={64}
          className="rounded-md object-contain"
        />
      </TableCell>
      <TableCell className="font-medium">{partner.name}</TableCell>
      <TableCell>{partner.location}</TableCell>
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
            <DropdownMenuItem onClick={() => handleEdit(partner)}>
              <FiEdit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(partner)}
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

export function PartnersManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);

  const { data: fetchedPartners, isLoading } = useGetPartnersQuery(undefined);
  const [addPartner] = useAddPartnerMutation();
  const [updatePartner] = useUpdatePartnerMutation();
  const [deletePartner] = useDeletePartnerMutation();
  const [reorderPartners] = useReorderPartnersMutation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (fetchedPartners) {
      setPartners(fetchedPartners.data || []);
    }
  }, [fetchedPartners]);

  const handleDragEnd = useCallback(
    async (event: any) => {
      const { active, over } = event;
      if (active.id !== over.id) {
        setPartners((items) => {
          const oldIndex = items.findIndex((item) => item._id === active.id);
          const newIndex = items.findIndex((item) => item._id === over.id);
          const newItems = arrayMove(items, oldIndex, newIndex);
          
          const reorderedData = newItems.map((item, index) => ({ _id: item._id, order: (index + 1) * 10 }));
          
          reorderPartners({ partners: reorderedData })
            .unwrap()
            .then(() => {
              toast({ title: "Reordered successfully" });
            })
            .catch((error) => {
              toast({ title: "Error reordering", description: error.data?.error || "An unknown error occurred", variant: "destructive" });
              setPartners(items);
            });
            
          return newItems;
        });
      }
    },
    [reorderPartners, toast]
  );

  const handleAdd = () => {
    setSelectedPartner(null);
    setIsModalOpen(true);
  };

  const handleEdit = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  const handleDelete = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedPartner) {
      await deletePartner({ _id: selectedPartner._id }).unwrap();
      toast({ title: "Partner Deleted" });
    }
    setIsDeleteAlertOpen(false);
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedPartner) {
        await updatePartner({ _id: selectedPartner._id, ...data }).unwrap();
        toast({ title: "Partner Updated" });
      } else {
        await addPartner(data).unwrap();
        toast({ title: "Partner Added" });
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast({ title: "Error", description: error.data?.error || "Could not save partner.", variant: "destructive" });
    }
  };
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Partner Colleges</CardTitle>
            <CardDescription>Manage your academic partners for the Excellence Centers.</CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <GoPlusCircle className="mr-2 h-4 w-4" /> Add Partner
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading partners...</p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 p-2"></TableHead>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <SortableContext items={partners.map(p => p._id)} strategy={verticalListSortingStrategy}>
                  <TableBody>
                    {partners.map((partner) => (
                      <SortableRow key={partner._id} partner={partner} handleEdit={handleEdit} handleDelete={handleDelete} />
                    ))}
                  </TableBody>
                </SortableContext>
              </Table>
            </DndContext>
          )}
        </CardContent>
      </Card>
      
      <PartnerFormModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} onSave={handleSave} partner={selectedPartner} />

      <DeleteConfirmationDialog 
        isOpen={isDeleteAlertOpen} 
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete} 
        itemName={selectedPartner?.name || 'the selected partner'} 
      />
    </>
  );
}
