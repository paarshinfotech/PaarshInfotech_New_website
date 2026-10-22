"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ImSpinner2 } from "react-icons/im";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { LuTrash2, LuImageUp } from "react-icons/lu";

export interface SocialPost {
  _id?: string;
  content: string;
  image: string | null;
  timestamp: string;
  likes: number;
  comments: number;
  hint: string;
  published: boolean;
}

const formSchema = z.object({
  content: z
    .string()
    .min(10, "Post content must be at least 10 characters.")
    .max(280, "Post content cannot exceed 280 characters."),
  published: z.boolean().optional(),
});

type PostFormValues = z.infer<typeof formSchema>;

export interface SaveSocialPostData {
  _id?: string;
  content: string;
  image: string | null;
  published: boolean;
}

interface SocialPostFormModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: SaveSocialPostData) => Promise<void> | void;
  post: SocialPost | null;
}

export function SocialPostFormModal({
  isOpen,
  onOpenChange,
  onSave,
  post,
}: SocialPostFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      published: true,
    },
  });

  useEffect(() => {
    if (isOpen) {
      setUploadError(null);
      setSelectedFile(null);
      if (post) {
        form.reset({
          content: post.content,
          published: post.published,
        });
        setPreviewUrl(post.image || null);
      } else {
        form.reset({
          content: "",
          published: true,
        });
        setPreviewUrl(null);
      }
    }
  }, [post, form, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadError(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (values: PostFormValues) => {
    setIsSubmitting(true);
    setUploadError(null);
    try {
      let finalImageUrl: string | null = null;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("category", "social");

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.error || "Failed to upload image.");
        }
        finalImageUrl = result.data.url;
      } else if (previewUrl && post?.image && previewUrl === post.image) {
        finalImageUrl = post.image;
      }

      await onSave({
        _id: post?._id,
        content: values.content,
        image: finalImageUrl,
        published: values.published ?? post?.published ?? true,
      });

      onOpenChange(false);
    } catch (err: any) {
      setUploadError(err.message || "Failed to save post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {post ? "Edit Social Post" : "Add New Social Post"}
              </DialogTitle>
              <DialogDescription>
                {post
                  ? "Update the details and image for this post."
                  : "Enter the details and upload an image for the new social media post."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What's happening? (e.g. Get Your Data Science Industrial Training...)"
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Post Image</FormLabel>
                {previewUrl ? (
                  <div className="relative rounded-lg border overflow-hidden bg-muted/20">
                    <div className="relative aspect-video w-full max-h-56">
                      <Image
                        src={previewUrl}
                        alt="Post Preview"
                        fill
                        className="object-contain"
                        unoptimized={previewUrl.startsWith("blob:")}
                      />
                    </div>
                    <div className="p-2 bg-background/90 border-t flex justify-between items-center text-xs">
                      <span className="text-muted-foreground truncate max-w-xs">
                        {selectedFile ? selectedFile.name : "Current image"}
                      </span>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={handleRemoveImage}
                        className="h-7 px-2 text-xs"
                      >
                        <LuTrash2 className="w-3.5 h-3.5 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 hover:bg-muted/30 transition-colors cursor-pointer relative">
                    <LuImageUp className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Click or browse to upload an image</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 5MB</p>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
                    />
                  </div>
                )}
                {uploadError && (
                  <p className="text-xs text-destructive">{uploadError}</p>
                )}
              </div>

              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Published</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Make this post visible on the site.
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
