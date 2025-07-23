"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  image: z.any().optional(),
  published: z.boolean().optional(),
});

type PostFormValues = z.infer<typeof formSchema>;

interface SocialPostFormModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: PostFormValues & { _id?: string }) => void;
  post: SocialPost | null;
}

export function SocialPostFormModal({
  isOpen,
  onOpenChange,
  onSave,
  post,
}: SocialPostFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<PostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      image: null,
      published: true,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (post) {
        form.reset({
          content: post.content,
          image: null,
          published: post.published,
        });
      } else {
        form.reset({
          content: "",
          image: null,
          published: true,
        });
      }
    }
  }, [post, form, isOpen]);

  const onSubmit = async (values: PostFormValues) => {
    setIsSubmitting(true);
    try {
      const dataToSave = {
        ...values,
        _id: post?._id,
        image:
          typeof values.image === "string"
            ? values.image
            : values.image && values.image[0]
            ? "https://placehold.co/600x400.png"
            : null,
        published: values.published ?? post?.published ?? true,
      };
      await onSave(dataToSave);
    } finally {
      setIsSubmitting(false);
      onOpenChange(false);
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
                  ? "Update the details for this post."
                  : "Enter the details for the new social media post."}
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
                        placeholder="What's happening?"
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
