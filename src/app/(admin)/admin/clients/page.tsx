"use client";

import { useState } from "react";
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
} from "../../../../services/api";

interface Client {
  _id: string;
  name: string;
  industry: string;
  since: string;
  logo: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function ClientsManagementPage() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const {
    data: clients = [],
    isLoading: clientsLoading,
    error: clientsError,
  } = useGetClientsQuery(undefined);

  console.log("Clients Data : ", clients);

  const [addClient] = useAddClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [deleteClient] = useDeleteClientMutation();

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
    <>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Logo</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client: Client) => (
                <TableRow key={client._id}>
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
                      <Badge
                        variant={client.published ? "default" : "secondary"}
                      >
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
    </>
  );
}
