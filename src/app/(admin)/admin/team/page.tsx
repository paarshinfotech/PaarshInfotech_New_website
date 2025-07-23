"use client";

import { useState } from "react";
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
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TeamMemberFormModal } from "@/components/admin/team/TeamMemberFormModal";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  useGetMembersQuery,
  useGetCategoriesQuery,
  useAddMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
} from "../../../../services/api";

interface TeamMember {
  _id: string;
  name: string;
  avatar: string;
  categoryId: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface TeamCategory {
  _id: string;
  name: string;
  allowMultiple: boolean;
}

export default function TeamManagementPage() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const {
    data: teamMembers = [],
    isLoading: membersLoading,
    error: membersError,
  } = useGetMembersQuery(undefined);
  const {
    data: teamCategories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery(undefined);
  const [addMember] = useAddMemberMutation();
  const [updateMember] = useUpdateMemberMutation();
  const [deleteMember] = useDeleteMemberMutation();

  const getCategoryName = (categoryId: string) => {
    return (
      teamCategories.find((c: TeamCategory) => c._id === categoryId)?.name || "Uncategorized"
    );
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
  };

  const confirmDelete = async () => {
    if (selectedMember) {
      try {
        await deleteMember(selectedMember._id).unwrap();
        toast({
          title: "Team Member Deleted",
          description: `${selectedMember.name} has been deleted successfully.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete team member.",
          variant: "destructive",
        });
      }
    }
    setIsDeleteAlertOpen(false);
    setSelectedMember(null);
  };

  const handleSave = async (memberData: {
    name: string;
    categoryId: string;
    avatar?: string;
    published?: boolean;
  }) => {
    try {
      if (selectedMember) {
        await updateMember({
          _id: selectedMember._id,
          name: memberData.name,
          categoryId: memberData.categoryId,
          avatar: memberData.avatar || selectedMember.avatar,
          published: memberData.published ?? selectedMember.published,
        }).unwrap();
        toast({
          title: "Team Member Updated",
          description: `${memberData.name} has been updated successfully.`,
        });
      } else {
        await addMember({
          name: memberData.name,
          categoryId: memberData.categoryId,
          avatar: memberData.avatar || "https://placehold.co/40x40.png",
          published: memberData.published ?? true,
        }).unwrap();
        toast({
          title: "Team Member Created",
          description: `${memberData.name} has been created successfully.`,
        });
      }
      setIsModalOpen(false);
      setSelectedMember(null);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${
          selectedMember ? "update" : "create"
        } team member.`,
        variant: "destructive",
      });
    }
  };

  const handleTogglePublished = async (
    memberId: string,
    published: boolean
  ) => {
    try {
      const member = teamMembers.find((m : TeamMember) => m._id === memberId);
      if (!member) return;
      await updateMember({
        _id: memberId,
        name: member.name,
        categoryId: member.categoryId,
        avatar: member.avatar,
        published,
      }).unwrap();
      toast({
        title: "Status Updated",
        description: `${member.name}'s visibility has been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update visibility status.",
        variant: "destructive",
      });
    }
  };

  if (membersLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

  if (membersError || categoriesError) {
    return <div>Error: Failed to load data</div>;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Team Management</CardTitle>
            <CardDescription>
              Manage your company's team members and their visibility.
            </CardDescription>
          </div>
          <Button size="sm" onClick={handleAdd}>
            <GoPlusCircle className="mr-2 h-4 w-4" />
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
              {teamMembers.map((member : TeamMember) => (
                <TableRow key={member._id}>
                  <TableCell>
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{getCategoryName(member.categoryId)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`published-${member._id}`}
                        checked={member.published}
                        onCheckedChange={(checked) =>
                          handleTogglePublished(member._id, checked)
                        }
                      />
                      <Badge
                        variant={member.published ? "default" : "secondary"}
                      >
                        {member.published ? "Visible" : "Hidden"}
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
                        <DropdownMenuItem onClick={() => handleEdit(member)}>
                          <FiEdit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(member)}
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
  );
}
