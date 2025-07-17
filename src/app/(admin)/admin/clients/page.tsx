
'use client';

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ClientFormModal } from "@/components/admin/clients/ClientFormModal";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const initialClients = [
  { id: 1, name: "TechCorp", industry: "Technology", since: "2021", logo: "https://placehold.co/40x40.png", published: true },
  { id: 2, name: "HealthFirst", industry: "Healthcare", since: "2022", logo: "https://placehold.co/40x40.png", published: true },
  { id: 3, name: "Urban Apparel", industry: "E-commerce", since: "2020", logo: "https://placehold.co/40x40.png", published: true },
  { id: 4, name: "Innovate Corp", industry: "SaaS", since: "2023", logo: "https://placehold.co/40x40.png", published: false },
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

    const handleSave = (clientData: any) => {
        const newLogoUrl = clientData.logo && typeof clientData.logo !== 'string'
            ? "https://placehold.co/40x40.png"
            : clientData.logo;

        const dataToSave = {
            ...clientData,
            logo: newLogoUrl
        };

        if (selectedClient && dataToSave.id) {
            // Edit
            setClients(clients.map(c => c.id === dataToSave.id ? { ...c, ...dataToSave } : c));
        } else {
            // Add
            setClients([...clients, { ...dataToSave, id: Date.now(), published: true }]);
        }
        setIsModalOpen(false);
        setSelectedClient(null);
    };

    const handleTogglePublished = (clientId: number, published: boolean) => {
        setClients(clients.map(c => c.id === clientId ? { ...c, published } : c));
    }


    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Clients Management</CardTitle>
                        <CardDescription>Manage your company's client list and their visibility on the public site.</CardDescription>
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
                                <TableHead className="w-[80px]">Logo</TableHead>
                                <TableHead>Client Name</TableHead>
                                <TableHead>Industry</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.map((client) => (
                                <TableRow key={client.id}>
                                     <TableCell>
                                        <Image src={client.logo} alt={client.name} width={40} height={40} className="rounded-md object-contain" />
                                    </TableCell>
                                    <TableCell className="font-medium">{client.name}</TableCell>
                                    <TableCell>{client.industry}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch 
                                                id={`published-${client.id}`}
                                                checked={client.published}
                                                onCheckedChange={(checked) => handleTogglePublished(client.id, checked)}
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
