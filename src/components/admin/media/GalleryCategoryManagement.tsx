"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetGalleryCategoriesQuery, useAddGalleryCategoryMutation, useUpdateGalleryCategoryMutation, useDeleteGalleryCategoryMutation } from "@/services/api";
import { LuPencil, LuTrash2, LuPlus } from "react-icons/lu";
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog";
import { GalleryCategoryFormModal } from "./GalleryCategoryFormModal";

export function GalleryCategoryManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);

  const { data: categoryData, isLoading } = useGetGalleryCategoriesQuery(undefined);
  const [addCategory] = useAddGalleryCategoryMutation();
  const [updateCategory] = useUpdateGalleryCategoryMutation();
  const [deleteCategory] = useDeleteGalleryCategoryMutation();

  const categories = categoryData?.data || [];
  
  const handleAdd = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };
  
  const handleEdit = (category: any) => {
      setSelectedCategory(category);
      setIsModalOpen(true);
  }

  const handleDelete = (category: any) => {
    setSelectedCategory(category);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCategory) {
      try {
        await deleteCategory({ _id: selectedCategory._id }).unwrap();
        toast({ title: "Category deleted successfully" });
      } catch (error) {
        toast({ title: "Error deleting category", variant: "destructive" });
      }
    }
    setIsDeleteAlertOpen(false);
  };
  
  const handleSave = async (data: any) => {
      try {
          if(selectedCategory) {
              await updateCategory({_id: selectedCategory._id, ...data}).unwrap();
              toast({title: "Category updated successfully"});
          } else {
              await addCategory(data).unwrap();
              toast({title: "Category added successfully"});
          }
          setIsModalOpen(false);
      } catch (error) {
          toast({title: "Error saving category", variant: "destructive"})
      }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Gallery Categories</CardTitle>
                <CardDescription>Manage the categories used for the main media gallery.</CardDescription>
            </div>
            <Button onClick={handleAdd}><LuPlus className="mr-2 h-4 w-4" /> Add Category</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((cat: any) => (
                  <TableRow key={cat._id}>
                    <TableCell>{cat.name}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(cat)}>
                          <LuPencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(cat)}
                      >
                        <LuTrash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <GalleryCategoryFormModal 
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        category={selectedCategory}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={selectedCategory?.name || 'this category'}
      />
    </>
  );
}
