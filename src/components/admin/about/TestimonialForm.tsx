"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

const testimonialSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  title: z.string().trim().min(2, "Title must be at least 2 characters").max(100, "Title must be less than 100 characters"),
  quote: z.string().trim().min(10, "Quote must be at least 10 characters").max(500, "Quote must be less than 500 characters"),
  avatar: z.string().trim().min(1, "An image must be selected"),
  published: z.boolean(),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

interface TestimonialFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: TestimonialFormData) => void;
  testimonial?: {
    _id: string;
    name: string;
    title: string;
    quote: string;
    avatar: string;
    published: boolean;
  } | null;
}

export function TestimonialForm({ isOpen, onOpenChange, onSave, testimonial }: TestimonialFormProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      title: "",
      quote: "",
      avatar: "",
      published: true,
    },
  });

  const published = watch("published");

  useEffect(() => {
    if (testimonial) {
      setValue("name", testimonial.name);
      setValue("title", testimonial.title);
      setValue("quote", testimonial.quote);
      setValue("avatar", testimonial.avatar);
      setValue("published", testimonial.published);
      setPreviewImage(testimonial.avatar);
    } else {
      reset();
      setPreviewImage(null);
    }
  }, [testimonial, setValue, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setValue("avatar", "");
        setPreviewImage(null);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setValue("avatar", "");
        setPreviewImage(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue("avatar", base64String);
        setPreviewImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: TestimonialFormData) => {
    onSave(data);
    if (!testimonial) {
      reset();
      setPreviewImage(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {testimonial ? "Edit Testimonial" : "Add New Testimonial"}
          </DialogTitle>
          <DialogDescription>
            {testimonial
              ? "Update the testimonial details below."
              : "Fill in the details to add a new testimonial."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="e.g., Software Engineer, CEO, etc."
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote">Quote *</Label>
            <Textarea
              id="quote"
              {...register("quote")}
              placeholder="Enter the testimonial quote..."
              rows={4}
            />
            {errors.quote && (
              <p className="text-sm text-red-500">{errors.quote.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar">Avatar Image *</Label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {errors.avatar && (
              <p className="text-sm text-red-500">{errors.avatar.message}</p>
            )}
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Avatar preview"
                  className="h-24 w-24 object-cover rounded-full"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="published">Published</Label>
            <Switch
              id="published"
              checked={published}
              onCheckedChange={(checked) => setValue("published", checked)}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : testimonial ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}