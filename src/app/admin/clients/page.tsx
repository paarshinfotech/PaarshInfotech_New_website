
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const clients = [
  { id: 1, name: "TechCorp", industry: "Technology", since: "2021" },
  { id: 2, name: "HealthFirst", industry: "Healthcare", since: "2022" },
  { id: 3, name: "Urban Apparel", industry: "E-commerce", since: "2020" },
  { id: 4, name: "Innovate Corp", industry: "SaaS", since: "2023" },
];

export default function ClientsManagementPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Clients Management</CardTitle>
                    <CardDescription>Manage your company's client list.</CardDescription>
                </div>
                <Button size="sm">
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
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
