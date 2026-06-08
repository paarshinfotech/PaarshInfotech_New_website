"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { FaTrashCan, FaGripLines } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { SuccessStoryFormModal } from "./SuccessStoryFormModal";
import {
  useGetSuccessStoriesQuery,
  useAddSuccessStoryMutation,
  useUpdateSuccessStoryMutation,
  useDeleteSuccessStoryMutation,
  useReorderSuccessStoriesMutation,
} from "@/services/api";
import { Badge } from "@/components/ui/badge";
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

export interface SuccessStory {
  _id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  published: boolean;
  order: number;
}

interface SortableRowProps {
  story: SuccessStory;
  handleEdit: (story: SuccessStory) => void;
  handleDelete: (story: SuccessStory) => void;
  handleTogglePublish: (story: SuccessStory) => void;
}

const SortableRow = ({
  story,
  handleEdit,
  handleDelete,
  handleTogglePublish,
}: SortableRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: story._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell className="cursor-grab p-2" {...attributes} {...listeners}>
        <FaGripLines className="h-5 w-5 text-muted-foreground" />
      </TableCell>
      <TableCell className="w-16">
        <Image
          src={story.avatar}
          alt={story.name}
          width={48}
          height={48}
          className="rounded-full object-cover aspect-square"
        />
      </TableCell>
      <TableCell className="font-medium">{story.name}</TableCell>
      <TableCell>{story.role}</TableCell>
      <TableCell className="max-w-xs truncate">{story.quote}</TableCell>
      <TableCell>
        <Badge
          className="cursor-pointer"
          variant={story.published ? "default" : "secondary"}
          onClick={() => handleTogglePublish(story)}
        >
          {story.published ? "Published" : "Unpublished"}
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
            <DropdownMenuItem onClick={() => handleEdit(story)}>
              <FiEdit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(story)}
              className="text-destructive"
            >
              <FaTrashCan className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export function SuccessStoriesManagement() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [stories, setStories] = useState<SuccessStory[]>([]);

  const { data: fetchedStories, isLoading } = useGetSuccessStoriesQuery(undefined);
  const [addSuccessStory] = useAddSuccessStoryMutation();
  const [updateSuccessStory] = useUpdateSuccessStoryMutation();
  const [deleteSuccessStory] = useDeleteSuccessStoryMutation();
  const [reorderSuccessStories] = useReorderSuccessStoriesMutation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (fetchedStories) {
      setStories(fetchedStories.data || []);
    }
  }, [fetchedStories]);

  const handleDragEnd = useCallback(
    async (event: any) => {
      const { active, over } = event;
      if (active.id !== over.id) {
        setStories((items) => {
          const oldIndex = items.findIndex((item) => item._id === active.id);
          const newIndex = items.findIndex((item) => item._id === over.id);
          const newItems = arrayMove(items, oldIndex, newIndex);

          const reorderedData = newItems.map((item, index) => ({
            _id: item._id,
            order: (index + 1) * 10,
          }));

          reorderSuccessStories({ stories: reorderedData })
            .unwrap()
            .then(() => {
              toast({ title: "Reordered successfully" });
            })
            .catch((error) => {
              toast({
                title: "Error reordering",
                description: error.data?.error || "An unknown error occurred",
                variant: "destructive",
              });
              setStories(items);
            });

          return newItems;
        });
      }
    },
    [reorderSuccessStories, toast]
  );

  const handleAdd = () => {
    setSelectedStory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (story: SuccessStory) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const handleDelete = (story: SuccessStory) => {
    setSelectedStory(story);
    setIsDeleteAlertOpen(true);
  };

  const handleTogglePublish = async (story: SuccessStory) => {
    try {
      await updateSuccessStory({
        _id: story._id,
        published: !story.published,
      }).unwrap();
      toast({
        title: `Story ${!story.published ? "Published" : "Unpublished"}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Could not update status.",
        variant: "destructive",
      });
    }
  };

  const confirmDelete = async () => {
    if (selectedStory) {
      await deleteSuccessStory({ _id: selectedStory._id }).unwrap();
      toast({ title: "Success Story Deleted" });
    }
    setIsDeleteAlertOpen(false);
  };

  const handleSave = async (data: any) => {
    try {
      if (selectedStory) {
        await updateSuccessStory({
          _id: selectedStory._id,
          ...data,
        }).unwrap();
        toast({ title: "Success Story Updated" });
      } else {
        await addSuccessStory(data).unwrap();
        toast({ title: "Success Story Added" });
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data?.error || "Could not save success story.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Alumni Success Stories</CardTitle>
            <CardDescription>
              Manage success stories. Drag rows to reorder the sequence on the website.
            </CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <GoPlusCircle className="mr-2 h-4 w-4" /> Add Success Story
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading success stories...</p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 p-2"></TableHead>
                    <TableHead>Avatar</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Quote</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <SortableContext items={stories.map(s => s._id)} strategy={verticalListSortingStrategy}>
                  <TableBody>
                    {stories.map((story) => (
                      <SortableRow
                        key={story._id}
                        story={story}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleTogglePublish={handleTogglePublish}
                      />
                    ))}
                  </TableBody>
                </SortableContext>
              </Table>
            </DndContext>
          )}
        </CardContent>
      </Card>

      <SuccessStoryFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        story={selectedStory}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={selectedStory?.name || "the selected success story"}
      />
    </>
  );
}
