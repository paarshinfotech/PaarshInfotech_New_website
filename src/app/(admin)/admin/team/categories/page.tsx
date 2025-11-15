"use client";

import { useState, useCallback, useEffect } from "react";
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
import { FaGripLines } from "react-icons/fa";
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
  useReorderCategoriesMutation,
} from "../../../../../services/api";
import { useToast } from "@/hooks/use-toast";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TeamCategory {
  _id: string;
  name: string;
  allowMultiple: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

interface SortableRowProps {
  category: TeamCategory;
  handleEdit: (category: TeamCategory) => void;
  handleDelete: (category: TeamCategory) => void;
}

const SortableRow = ({
  category,
  handleEdit,
  handleDelete,
}: SortableRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell className="cursor-move" {...attributes} {...listeners}>
        <FaGripLines className="h-4 w-4" />
      </TableCell>
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
  );
};

export default function TeamCategoriesPage() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TeamCategory | null>(
    null
  );
  const [categories, setCategories] = useState<TeamCategory[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const {
    data: fetchedCategories = [],
    isLoading,
    error,
  } = useGetCategoriesQuery(undefined);
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [reorderCategories] = useReorderCategoriesMutation();

  // Cleanup effect to ensure no lingering overlays
  useEffect(() => {
    return () => {
      document.body.style.pointerEvents = '';
      document.body.style.overflow = '';
    };
  }, []);

  // Monitor modal states and ensure proper cleanup
  useEffect(() => {
    if (!isModalOpen && !isDeleteAlertOpen) {
      const timer = setTimeout(() => {
        document.body.style.pointerEvents = '';
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen, isDeleteAlertOpen]);

  // Sync local state with fetched data
  useEffect(() => {
    setCategories(fetchedCategories);
  }, [fetchedCategories]);

  const handleDragEnd = useCallback(
    async (event: any) => {
      const { active, over } = event;

      if (active.id !== over.id) {
        const oldIndex = categories.findIndex((c) => c._id === active.id);
        const newIndex = categories.findIndex((c) => c._id === over.id);

        const updatedCategories = arrayMove(categories, oldIndex, newIndex);
        setCategories(updatedCategories);

        // Update order field
        const reorderedCategories = updatedCategories.map(
          (category, index) => ({
            _id: category._id,
            order: index,
          })
        );

        try {
          await reorderCategories(reorderedCategories).unwrap();
          toast({
            title: "Categories Reordered",
            description: "The order has been updated successfully.",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to reorder categories.",
            variant: "destructive",
          });
          // Revert to original order on error
          setCategories(fetchedCategories);
        }
      }
    },
    [categories, reorderCategories, toast, fetchedCategories]
  );

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

  const handleSave = async (categoryData: {
    name: string;
    allowMultiple: boolean;
    _id?: string;
  }) => {
    try {
      if (selectedCategory && categoryData._id) {
        await updateCategory({
          _id: categoryData._id,
          name: categoryData.name,
          allowMultiple: categoryData.allowMultiple,
        }).unwrap();
        toast({
          title: "Category Updated",
          description: `${categoryData.name} has been updated successfully.`,
        });
      } else {
        await addCategory({
          name: categoryData.name,
          allowMultiple: categoryData.allowMultiple,
        }).unwrap();
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
        description: `Failed to ${
          selectedCategory ? "update" : "create"
        } category.`,
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Category Name</TableHead>
                <TableHead>Allows Multiple Members</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <SortableContext
                items={categories.map((c) => c._id)}
                strategy={verticalListSortingStrategy}
              >
                {categories.map((category: TeamCategory) => (
                  <SortableRow
                    key={category._id}
                    category={category}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>
      </CardContent>
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
    </Card>
  );
}
