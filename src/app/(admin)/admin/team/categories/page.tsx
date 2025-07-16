
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { teamCategories as initialCategories, TeamCategory } from "@/lib/teamData";
import { CategoryFormModal } from "@/components/admin/team/CategoryFormModal";
import { Badge } from "@/components/ui/badge";

export default function TeamCategoriesPage() {
    const [categories, setCategories] = useState<TeamCategory[]>(initialCategories);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<TeamCategory | null>(null);

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
    }

    const confirmDelete = () => {
        if (selectedCategory) {
            setCategories(categories.filter(c => c.id !== selectedCategory.id));
        }
        setIsDeleteAlertOpen(false);
        setSelectedCategory(null);
    }

    const handleSave = (categoryData: any) => {
        if (selectedCategory && categoryData.id) {
            setCategories(categories.map(c => c.id === categoryData.id ? { ...c, ...categoryData } : c));
        } else {
            setCategories([...categories, { ...categoryData, id: Date.now() }]);
        }
        setIsModalOpen(false);
        setSelectedCategory(null);
    };

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Team Categories</CardTitle>
                        <CardDescription>Manage the roles and categories for your team members.</CardDescription>
                    </div>
                    <Button size="sm" onClick={handleAdd}>
                        <PlusCircle className="mr-2 h-4 w-4" />
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
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">{category.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={category.allowMultiple ? "default" : "secondary"}>
                                            {category.allowMultiple ? "Yes" : "No (Single Member)"}
                                        </Badge>
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
                                                <DropdownMenuItem onClick={() => handleEdit(category)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(category)} className="text-destructive">
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
    )
}
