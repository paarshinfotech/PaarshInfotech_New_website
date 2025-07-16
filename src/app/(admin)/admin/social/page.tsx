
'use client';

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { socialWallPosts as initialPosts } from "@/lib/mediaData";
import { SocialPostFormModal } from "@/components/admin/social/SocialPostFormModal";
import { SocialPostPreviewModal } from "@/components/admin/social/SocialPostPreviewModal";

export type SocialPost = typeof initialPosts[0];

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
    }

    const confirmDelete = () => {
        if (selectedPost) {
            setPosts(posts.filter(c => c.id !== selectedPost.id));
        }
        setIsDeleteAlertOpen(false);
        setSelectedPost(null);
    }

    const handleSave = (postData: any) => {
        const newImageUrl = postData.image && typeof postData.image !== 'string'
            ? "https://placehold.co/600x400.png"
            : postData.image || (postData.id ? posts.find(p => p.id === postData.id)?.image : null);

        if (postData.id) {
            // Edit
            setPosts(posts.map(p => p.id === postData.id ? { ...p, content: postData.content, image: newImageUrl } : p));
        } else {
            // Add
            const newId = Math.max(...posts.map(p => p.id), 0) + 1;
            const newPost: SocialPost = {
                id: newId,
                content: postData.content,
                image: newImageUrl,
                timestamp: "Just now",
                likes: 0,
                comments: 0,
                hint: "social media"
            };
            setPosts([newPost, ...posts]);
        }
        setIsFormModalOpen(false);
        setSelectedPost(null);
    };


    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Social Posts Management</CardTitle>
                        <CardDescription>Manage posts for the "Catch Us on Social" section.</CardDescription>
                    </div>
                    <Button size="sm" onClick={handleAdd}>
                        <PlusCircle className="mr-2 h-4 w-4" />
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
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="max-w-xs truncate">{post.content}</TableCell>
                                    <TableCell>
                                        {post.image && <Image src={post.image} alt="Social Post" width={60} height={40} className="rounded-md object-cover" />}
                                    </TableCell>
                                    <TableCell>{post.likes}</TableCell>
                                    <TableCell>{post.comments}</TableCell>
                                    <TableCell>{post.timestamp}</TableCell>
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
                                                <DropdownMenuItem onClick={() => handlePreview(post)}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Preview
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleEdit(post)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(post)} className="text-destructive">
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
    )
}
