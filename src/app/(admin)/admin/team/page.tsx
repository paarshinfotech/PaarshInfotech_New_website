
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TeamMemberFormModal } from "@/components/admin/team/TeamMemberFormModal";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";

const initialTeamMembers = [
  { id: 1, name: "Kantilal Pagare", role: "Founder & Chairman", avatar: "https://placehold.co/40x40.png" },
  { id: 2, name: "Tushar Pagare", role: "Chief Executive Officer", avatar: "https://placehold.co/40x40.png" },
  { id: 3, name: "Priya Sharma", role: "HR Manager", avatar: "https://placehold.co/40x40.png" },
  { id: 4, name: "Rajesh Kumar", role: "Lead PHP Developer", avatar: "https://placehold.co/40x40.png" },
];

export type TeamMember = typeof initialTeamMembers[0];

export default function TeamManagementPage() {
    const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const handleAdd = () => {
        setSelectedMember(null);
        setIsModalOpen(true);
    };

    const handleEdit = (member: TeamMember) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };
    
    const handleDelete = (member: TeamMember) => {
        setSelectedMember(member);
        setIsDeleteAlertOpen(true);
    }

    const confirmDelete = () => {
        if (selectedMember) {
            setTeamMembers(teamMembers.filter(m => m.id !== selectedMember.id));
        }
        setIsDeleteAlertOpen(false);
        setSelectedMember(null);
    }

    const handleSave = (memberData: TeamMember) => {
        if (selectedMember) {
            // Edit
            setTeamMembers(teamMembers.map(m => m.id === memberData.id ? memberData : m));
        } else {
            // Add
            setTeamMembers([...teamMembers, { ...memberData, id: Date.now() }]);
        }
        setIsModalOpen(false);
        setSelectedMember(null);
    };

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Team Management</CardTitle>
                        <CardDescription>Manage your company's team members.</CardDescription>
                    </div>
                    <Button size="sm" onClick={handleAdd}>
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
                                                <DropdownMenuItem onClick={() => handleEdit(member)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(member)} className="text-destructive">
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
            <TeamMemberFormModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSave={handleSave}
                member={selectedMember}
            />
            <DeleteConfirmationDialog 
                isOpen={isDeleteAlertOpen}
                onOpenChange={setIsDeleteAlertOpen}
                onConfirm={confirmDelete}
                itemName={selectedMember?.name || "the selected team member"}
            />
        </>
    )
}
