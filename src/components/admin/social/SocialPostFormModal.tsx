
'use client';

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import type { SocialPost } from "@/app/(admin)/admin/social/page";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  content: z.string().min(10, "Post content must be at least 10 characters.").max(280, "Post content cannot exceed 280 characters."),
  image: z.any().optional(),
});

type PostFormValues = z.infer<typeof formSchema>;

interface SocialPostFormModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: any) => void;
  post: SocialPost | null;
}

export function SocialPostFormModal({ isOpen, onOpenChange, onSave, post }: SocialPostFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<PostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    if (post) {
      form.reset({
          content: post.content,
          image: null,
      });
    } else {
      form.reset({ content: "", image: null });
    }
  }, [post, form, isOpen]);

  const onSubmit = (values: PostFormValues) => {
    setIsSubmitting(true);
    // Simulate API call for upload
    setTimeout(() => {
        const dataToSave = {
            ...values,
            id: post?.id,
        };
        onSave(dataToSave);
        setIsSubmitting(false);
        onOpenChange(false);
    }, 1000)
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{post ? "Edit Social Post" : "Add New Social Post"}</DialogTitle>
              <DialogDescription>
                {post ? "Update the details for this post." : "Enter the details for the new social media post."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl><Textarea placeholder="What's happening?" {...field} rows={4} /></FormControl>
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
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
