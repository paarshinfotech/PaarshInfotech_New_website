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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { CategoryFormModal } from "@/components/admin/team/CategoryFormModal";
import { Badge } from "@/components/ui/badge";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../../../../services/api";
import { useToast } from "@/hooks/use-toast";

interface TeamCategory {
  _id: string;
  name: string;
  allowMultiple: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function TeamCategoriesPage() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TeamCategory | null>(null);

  const { data: categories = [], isLoading, error } = useGetCategoriesQuery(undefined);
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: TeamCategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (category: TeamCategory) => {
    setSelectedCategory(category);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCategory) {
      try {
        await deleteCategory(selectedCategory._id).unwrap();
        toast({
          title: "Category Deleted",
          description: `${selectedCategory.name} has been deleted successfully.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete category.",
          variant: "destructive",
        });
      }
    }
    setIsDeleteAlertOpen(false);
    setSelectedCategory(null);
  };

  const handleSave = async (categoryData: { name: string; allowMultiple: boolean; _id?: string }) => {
    try {
      if (selectedCategory && categoryData._id) {
        await updateCategory({ _id: categoryData._id, name: categoryData.name, allowMultiple: categoryData.allowMultiple }).unwrap();
        toast({
          title: "Category Updated",
          description: `${categoryData.name} has been updated successfully.`,
        });
      } else {
        await addCategory({ name: categoryData.name, allowMultiple: categoryData.allowMultiple }).unwrap();
        toast({
          title: "Category Created",
          description: `${categoryData.name} has been created successfully.`,
        });
      }
      setIsModalOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${selectedCategory ? "update" : "create"} category.`,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Failed to load categories</div>;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Team Categories</CardTitle>
            <CardDescription>
              Manage the roles and categories for your team members.
            </CardDescription>
          </div>
          <Button size="sm" onClick={handleAdd}>
            <GoPlusCircle className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Allows Multiple Members</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category: TeamCategory) => (
                <TableRow key={category._id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={category.allowMultiple ? "default" : "secondary"}
                    >
                      {category.allowMultiple ? "Yes" : "No (Single Member)"}
                    </Badge>
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
                        <DropdownMenuItem onClick={() => handleEdit(category)}>
                          <FiEdit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(category)}
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

      <CategoryFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        category={selectedCategory}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={selectedCategory?.name || "the selected category"}
      />
    </>
  );
}