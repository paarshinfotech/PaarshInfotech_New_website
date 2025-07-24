"use client";

import { useState, useCallback, useEffect } from "react";
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
import { FaGripLines } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClientFormModal } from "@/components/admin/clients/ClientFormModal";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  useGetClientsQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useReorderClientsMutation,
} from "../../../../services/api";
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

interface Client {
  _id: string;
  name: string;
  industry: string;
  since: string;
  logo: string;
  published: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

interface SortableRowProps {
  client: Client;
  handleEdit: (client: Client) => void;
  handleDelete: (client: Client) => void;
  handleTogglePublished: (clientId: string, published: boolean) => void;
}

const SortableRow = ({
  client,
  handleEdit,
  handleDelete,
  handleTogglePublished,
}: SortableRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: client._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell className="cursor-move" {...attributes} {...listeners}>
        <FaGripLines className="h-4 w-4" />
      </TableCell>
      <TableCell>
        <Image
          src={client.logo}
          alt={client.name}
          width={40}
          height={40}
          className="rounded-md object-contain"
        />
      </TableCell>
      <TableCell className="font-medium">{client.name}</TableCell>
      <TableCell>{client.industry}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Switch
            id={`published-${client._id}`}
            checked={client.published}
            onCheckedChange={(checked) =>
              handleTogglePublished(client._id, checked)
            }
          />
          <Badge variant={client.published ? "default" : "secondary"}>
            {client.published ? "Published" : "Draft"}
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
            <DropdownMenuItem onClick={() => handleEdit(client)}>
              <FiEdit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(client)}
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

export default function ClientsManagementPage() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const {
    data: fetchedClients = [],
    isLoading: clientsLoading,
    error: clientsError,
  } = useGetClientsQuery(undefined);

  const [addClient] = useAddClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [deleteClient] = useDeleteClientMutation();
  const [reorderClients] = useReorderClientsMutation();

  // Sync local state with fetched data
  useEffect(() => {
    setClients(fetchedClients);
  }, [fetchedClients]);

  const handleDragEnd = useCallback(
    async (event: any) => {
      const { active, over } = event;

      if (active.id !== over.id) {
        const oldIndex = clients.findIndex((c) => c._id === active.id);
        const newIndex = clients.findIndex((c) => c._id === over.id);

        const updatedClients = arrayMove(clients, oldIndex, newIndex);
        setClients(updatedClients);

        // Update order field
        const reorderedClients = updatedClients.map((client, index) => ({
          _id: client._id,
          order: index,
        }));

        try {
          await reorderClients(reorderedClients).unwrap();
          toast({
            title: "Clients Reordered",
            description: "The order has been updated successfully.",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to reorder clients.",
            variant: "destructive",
          });
          // Revert to original order on error
          setClients(fetchedClients);
        }
      }
    },
    [clients, reorderClients, toast, fetchedClients]
  );

  const handleAdd = () => {
    setSelectedClient(null);
    setIsModalOpen(true);
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleDelete = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedClient) {
      try {
        await deleteClient(selectedClient._id).unwrap();
        toast({
          title: "Client Deleted",
          description: `${selectedClient.name} has been deleted successfully.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete client.",
          variant: "destructive",
        });
      }
    }
    setIsDeleteAlertOpen(false);
    setSelectedClient(null);
  };

  const handleSave = async (clientData: {
    name: string;
    industry: string;
    since: string;
    logo?: string;
    published?: boolean;
  }) => {
    try {
      if (selectedClient) {
        await updateClient({
          _id: selectedClient._id,
          name: clientData.name,
          industry: clientData.industry,
          since: clientData.since,
          logo: clientData.logo || selectedClient.logo,
          published: clientData.published ?? selectedClient.published,
        }).unwrap();
        toast({
          title: "Client Updated",
          description: `${clientData.name} has been updated successfully.`,
        });
      } else {
        await addClient({
          name: clientData.name,
          industry: clientData.industry,
          since: clientData.since,
          logo: clientData.logo || "https://placehold.co/40x40.png",
          published: clientData.published ?? true,
        }).unwrap();
        toast({
          title: "Client Created",
          description: `${clientData.name} has been created successfully.`,
        });
      }
      setIsModalOpen(false);
      setSelectedClient(null);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${
          selectedClient ? "update" : "create"
        } client.`,
        variant: "destructive",
      });
    }
  };

  const handleTogglePublished = async (
    clientId: string,
    published: boolean
  ) => {
    try {
      const client = clients.find((c: Client) => c._id === clientId);
      if (!client) return;
      await updateClient({
        _id: clientId,
        name: client.name,
        industry: client.industry,
        since: client.since,
        logo: client.logo,
        published,
      }).unwrap();
      toast({
        title: "Status Updated",
        description: `${client.name}'s visibility has been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update visibility status.",
        variant: "destructive",
      });
    }
  };

  if (clientsLoading) {
    return <div>Loading...</div>;
  }

  if (clientsError) {
    return <div>Error: Failed to load clients</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Clients Management</CardTitle>
          <CardDescription>
            Manage your company's client list and their visibility on the
            public site.
          </CardDescription>
        </div>
        <Button size="sm" onClick={handleAdd}>
          <GoPlusCircle className="mr-2 h-4 w-4" />
          Add Client
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
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="w-[80px]">Logo</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <SortableContext
                items={clients.map((c) => c._id)}
                strategy={verticalListSortingStrategy}
              >
                {clients.map((client: Client) => (
                  <SortableRow
                    key={client._id}
                    client={client}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleTogglePublished={handleTogglePublished}
                  />
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>
      </CardContent>
      <ClientFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        client={selectedClient}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={selectedClient?.name || "the selected client"}
      />
    </Card>
  );
}