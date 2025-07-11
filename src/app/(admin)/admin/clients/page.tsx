
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ClientFormModal } from "@/components/admin/clients/ClientFormModal";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";

const initialClients = [
  { id: 1, name: "TechCorp", industry: "Technology", since: "2021" },
  { id: 2, name: "HealthFirst", industry: "Healthcare", since: "2022" },
  { id: 3, name: "Urban Apparel", industry: "E-commerce", since: "2020" },
  { id: 4, name: "Innovate Corp", industry: "SaaS", since: "2023" },
];

export default function ClientsManagementPage() {
    const [clients, setClients] = useState(initialClients);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<typeof initialClients[0] | null>(null);

    const handleAdd = () => {
        setSelectedClient(null);
        setIsModalOpen(true);
    };

    const handleEdit = (client: typeof initialClients[0]) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };
    
    const handleDelete = (client: typeof initialClients[0]) => {
        setSelectedClient(client);
        setIsDeleteAlertOpen(true);
    }

    const confirmDelete = () => {
        if (selectedClient) {
            setClients(clients.filter(c => c.id !== selectedClient.id));
        }
        setIsDeleteAlertOpen(false);
        setSelectedClient(null);
    }

    const handleSave = (clientData: typeof initialClients[0]) => {
        if (selectedClient && clientData.id) {
            // Edit
            setClients(clients.map(c => c.id === clientData.id ? clientData : c));
        } else {
            // Add
            setClients([...clients, { ...clientData, id: Date.now() }]);
        }
        setIsModalOpen(false);
        setSelectedClient(null);
    };


    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Clients Management</CardTitle>
                        <CardDescription>Manage your company's client list.</CardDescription>
                    </div>
                    <Button size="sm" onClick={handleAdd}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Client
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client Name</TableHead>
                                <TableHead>Industry</TableHead>
                                <TableHead>Client Since</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell className="font-medium">{client.name}</TableCell>
                                    <TableCell>{client.industry}</TableCell>
                                    <TableCell>{client.since}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleEdit(client)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(client)} className="text-destructive">
                                                     <Trash2 className="mr-2 h-4 w-4" />
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
    )
}
