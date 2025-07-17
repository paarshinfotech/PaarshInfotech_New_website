
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
import { teamMembers as initialTeamMembers, teamCategories as initialCategories, TeamMember, TeamCategory } from "@/lib/teamData";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function TeamManagementPage() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
    const [teamCategories, setTeamCategories] = useState<TeamCategory[]>(initialCategories);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const getCategoryName = (categoryId: number) => {
        return teamCategories.find(c => c.id === categoryId)?.name || 'Uncategorized';
    };

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

    const handleSave = (memberData: any) => {
        const dataToSave = {
            ...memberData,
            categoryId: Number(memberData.categoryId), // Ensure categoryId is a number
        }

        if (selectedMember && dataToSave.id) {
            // Edit
            setTeamMembers(teamMembers.map(m => m.id === dataToSave.id ? { ...m, ...dataToSave } : m));
        } else {
            // Add
            setTeamMembers([...teamMembers, { ...dataToSave, id: Date.now(), published: true }]);
        }
        setIsModalOpen(false);
        setSelectedMember(null);
    };

    const handleTogglePublished = (memberId: number, published: boolean) => {
        setTeamMembers(teamMembers.map(m => m.id === memberId ? { ...m, published } : m));
    }

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Team Management</CardTitle>
                        <CardDescription>Manage your company's team members and their visibility.</CardDescription>
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
                                <TableHead>Role / Category</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teamMembers.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell>
                                        <Image src={member.avatar} alt={member.name} width={40} height={40} className="rounded-full" />
                                    </TableCell>
                                    <TableCell className="font-medium">{member.name}</TableCell>
                                    <TableCell>{getCategoryName(member.categoryId)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch 
                                                id={`published-${member.id}`}
                                                checked={member.published}
                                                onCheckedChange={(checked) => handleTogglePublished(member.id, checked)}
                                            />
                                            <Badge variant={member.published ? "default" : "secondary"}>
                                                {member.published ? "Visible" : "Hidden"}
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
                categories={teamCategories}
                teamMembers={teamMembers}
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
