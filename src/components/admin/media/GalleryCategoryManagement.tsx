"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetGalleryCategoriesQuery, useAddGalleryCategoryMutation, useUpdateGalleryCategoryMutation, useDeleteGalleryCategoryMutation } from "@/services/api";
import { LuPencil, LuTrash2, LuPlus } from "react-icons/lu";

export function GalleryCategoryManagement() {
  const { toast } = useToast();
  const [newCategory, setNewCategory] = useState("");
  const { data: categoryData, isLoading } = useGetGalleryCategoriesQuery(undefined);
  const [addCategory] = useAddGalleryCategoryMutation();
  const [updateCategory] = useUpdateGalleryCategoryMutation();
  const [deleteCategory] = useDeleteGalleryCategoryMutation();

  const categories = categoryData?.data || [];

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await addCategory({ name: newCategory }).unwrap();
      setNewCategory("");
      toast({ title: "Category added successfully" });
    } catch (error) {
      toast({ title: "Error adding category", variant: "destructive" });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory({ _id: id }).unwrap();
      toast({ title: "Category deleted successfully" });
    } catch (error) {
      toast({ title: "Error deleting category", variant: "destructive" });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gallery Categories</CardTitle>
        <CardDescription>Manage the categories used for the main media gallery.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
          />
          <Button onClick={handleAddCategory}>
            <LuPlus className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCategory(cat._id)}
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
  );
}