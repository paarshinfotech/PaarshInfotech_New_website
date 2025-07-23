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
import { socialWallPosts as initialPosts } from "@/lib/mediaData";
import { SocialPostFormModal } from "@/components/admin/social/SocialPostFormModal";
import { SocialPostPreviewModal } from "@/components/admin/social/SocialPostPreviewModal";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export type SocialPost = (typeof initialPosts)[0];

export default function SocialManagementPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);

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

  const confirmDelete = () => {
    if (selectedPost) {
      setPosts(posts.filter((c) => c.id !== selectedPost.id));
    }
    setIsDeleteAlertOpen(false);
    setSelectedPost(null);
  };

  const handleSave = (postData: any) => {
    const newImageUrl =
      postData.image && typeof postData.image !== "string"
        ? "https://placehold.co/600x400.png"
        : postData.image ||
          (postData.id ? posts.find((p) => p.id === postData.id)?.image : null);

    if (postData.id) {
      // Edit
      setPosts(
        posts.map((p) =>
          p.id === postData.id
            ? { ...p, content: postData.content, image: newImageUrl }
            : p
        )
      );
    } else {
      // Add
      const newId = Math.max(...posts.map((p) => p.id), 0) + 1;
      const newPost: SocialPost = {
        id: newId,
        content: postData.content,
        image: newImageUrl,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        hint: "social media",
        published: true,
      };
      setPosts([newPost, ...posts]);
    }
    setIsFormModalOpen(false);
    setSelectedPost(null);
  };

  const handleTogglePublished = (postId: number, published: boolean) => {
    setPosts(posts.map((p) => (p.id === postId ? { ...p, published } : p)));
  };

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
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
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
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`published-${post.id}`}
                        checked={post.published}
                        onCheckedChange={(checked) =>
                          handleTogglePublished(post.id, checked)
                        }
                      />
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{post.timestamp}</TableCell>
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
        itemName={`Post #${selectedPost?.id}`}
      />
    </>
  );
}
