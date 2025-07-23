"use client";

import { useState } from "react";
import Image from "next/image";
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
import { IoEyeOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { SocialPostFormModal } from "@/components/admin/social/SocialPostFormModal";
import { SocialPostPreviewModal } from "@/components/admin/social/SocialPostPreviewModal";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  useGetSocialPostsQuery,
  useAddSocialPostMutation,
  useUpdateSocialPostMutation,
  useDeleteSocialPostMutation,
} from "../../../../services/api";
import { format, formatDistanceToNow } from "date-fns";

export interface SocialPost {
  _id: string;
  content: string;
  image: string | null;
  timestamp: string;
  likes: number;
  comments: number;
  hint: string;
  published: boolean;
}

export default function SocialManagementPage() {
  const { toast } = useToast();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);

  const {
    data: posts = [],
    isLoading: postsLoading,
    error: postsError,
  } = useGetSocialPostsQuery(undefined);
  const [addSocialPost] = useAddSocialPostMutation();
  const [updateSocialPost] = useUpdateSocialPostMutation();
  const [deleteSocialPost] = useDeleteSocialPostMutation();

  const handleAdd = () => {
    setSelectedPost(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (post: SocialPost) => {
    setSelectedPost(post);
    setIsFormModalOpen(true);
  };

  const handlePreview = (post: SocialPost) => {
    setSelectedPost(post);
    setIsPreviewModalOpen(true);
  };

  const handleDelete = (post: SocialPost) => {
    setSelectedPost(post);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedPost) {
      try {
        await deleteSocialPost(selectedPost._id).unwrap();
        toast({
          title: "Post Deleted",
          description: `Post has been deleted successfully.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete post.",
          variant: "destructive",
        });
      }
    }
    setIsDeleteAlertOpen(false);
    setSelectedPost(null);
  };

  const handleSave = async (postData: {
    content: string;
    image?: FileList | string | null;
    published?: boolean;
  }) => {
    try {
      const dataToSave = {
        ...postData,
        image:
          typeof postData.image === "string"
            ? postData.image
            : postData.image && postData.image[0]
            ? "https://placehold.co/600x400.png"
            : null,
        likes: selectedPost?.likes || 0,
        comments: selectedPost?.comments || 0,
        hint: selectedPost?.hint || "social media",
        published: postData.published ?? selectedPost?.published ?? true,
      };

      if (selectedPost) {
        await updateSocialPost({
          _id: selectedPost._id,
          ...dataToSave,
        }).unwrap();
        toast({
          title: "Post Updated",
          description: `Post has been updated successfully.`,
        });
      } else {
        await addSocialPost(dataToSave).unwrap();
        toast({
          title: "Post Created",
          description: `Post has been created successfully.`,
        });
      }
      setIsFormModalOpen(false);
      setSelectedPost(null);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${selectedPost ? "update" : "create"} post.`,
        variant: "destructive",
      });
    }
  };

  const handleTogglePublished = async (postId: string, published: boolean) => {
    try {
      const post = posts.find((p: SocialPost) => p._id === postId);
      if (!post) return;
      await updateSocialPost({
        _id: postId,
        content: post.content,
        image: post.image,
        likes: post.likes,
        comments: post.comments,
        hint: post.hint,
        published,
      }).unwrap();
      toast({
        title: "Status Updated",
        description: `Post's visibility has been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update visibility status.",
        variant: "destructive",
      });
    }
  };

  if (postsLoading) {
    return <div>Loading...</div>;
  }

  if (postsError) {
    return <div>Error: Failed to load posts</div>;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Social Posts Management</CardTitle>
            <CardDescription>
              Manage posts for the "Catch Us on Social" section and their
              visibility.
            </CardDescription>
          </div>
          <Button size="sm" onClick={handleAdd}>
            <GoPlusCircle className="mr-2 h-4 w-4" />
            Add Post
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post: SocialPost) => (
                <TableRow key={post._id}>
                  <TableCell className="max-w-xs truncate">
                    {post.content}
                  </TableCell>
                  <TableCell>
                    {post.image && (
                      <Image
                        src={post.image}
                        alt="Social Post"
                        width={60}
                        height={40}
                        className="rounded-md object-cover"
                      />
                    )}
                  </TableCell>
                  <TableCell>{post.likes}</TableCell>
                  <TableCell>{post.comments}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`published-${post._id}`}
                        checked={post.published}
                        onCheckedChange={(checked) =>
                          handleTogglePublished(post._id, checked)
                        }
                      />
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(post.timestamp), {
                      addSuffix: true,
                    })}
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
                        <DropdownMenuItem onClick={() => handlePreview(post)}>
                          <IoEyeOutline className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(post)}>
                          <FiEdit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(post)}
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

      <SocialPostFormModal
        isOpen={isFormModalOpen}
        onOpenChange={setIsFormModalOpen}
        onSave={handleSave}
        post={selectedPost}
      />

      <SocialPostPreviewModal
        isOpen={isPreviewModalOpen}
        onOpenChange={setIsPreviewModalOpen}
        post={selectedPost}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={`Post #${selectedPost?._id}`}
      />
    </>
  );
}