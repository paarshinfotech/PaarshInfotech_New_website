
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const teamMembers = [
  { name: "Kantilal Pagare", role: "Founder & Chairman", avatar: "https://placehold.co/40x40.png" },
  { name: "Tushar Pagare", role: "Chief Executive Officer", avatar: "https://placehold.co/40x40.png" },
  { name: "Priya Sharma", role: "HR Manager", avatar: "https://placehold.co/40x40.png" },
  { name: "Rajesh Kumar", role: "Lead PHP Developer", avatar: "https://placehold.co/40x40.png" },
];

export default function TeamManagementPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Team Management</CardTitle>
                    <CardDescription>Manage your company's team members.</CardDescription>
                </div>
                <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Member
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Avatar</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teamMembers.map((member) => (
                            <TableRow key={member.name}>
                                <TableCell>
                                    <Image src={member.avatar} alt={member.name} width={40} height={40} className="rounded-full" />
                                </TableCell>
                                <TableCell className="font-medium">{member.name}</TableCell>
                                <TableCell>{member.role}</TableCell>
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
