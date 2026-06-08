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

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  role: z.string().trim().min(2, "Role must be at least 2 characters"),
  quote: z.string().trim().min(10, "Quote must be at least 10 characters"),
  published: z.boolean(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: any) => void;
  testimonial?: {
    _id: string;
    name: string;
    role: string;
    quote: string;
    avatar: string;
    published: boolean;
  } | null;
}

export function ECTestimonialFormModal({ isOpen, onOpenChange, onSave, testimonial }: Props) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [avatarBase64, setAvatarBase64] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      role: "",
      quote: "",
      published: true,
    },
  });

  const published = watch("published");

  useEffect(() => {
    if (testimonial) {
      setValue("name", testimonial.name);
      setValue("role", testimonial.role);
      setValue("quote", testimonial.quote);
      setValue("published", testimonial.published);
      setPreviewImage(testimonial.avatar);
      setAvatarBase64("");
    } else {
      reset();
      setPreviewImage(null);
      setAvatarBase64("");
    }
  }, [testimonial, setValue, reset, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setAvatarBase64(base64);
        setPreviewImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormData) => {
    onSave({ ...data, avatarBase64: avatarBase64 || undefined });
    if (!testimonial) {
      reset();
      setPreviewImage(null);
      setAvatarBase64("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{testimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
          <DialogDescription>
            {testimonial ? "Update the testimonial details." : "Fill in the details to add a new testimonial."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input id="name" {...register("name")} placeholder="e.g., Sneha Patil" />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Designation / Role *</Label>
            <Input id="role" {...register("role")} placeholder="e.g., Final Year Student" />
            {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote">Testimonial Text *</Label>
            <Textarea id="quote" {...register("quote")} placeholder="Enter the testimonial quote..." rows={4} />
            {errors.quote && <p className="text-sm text-red-500">{errors.quote.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar">Profile Image</Label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {previewImage && (
              <div className="mt-2">
                <img src={previewImage} alt="Preview" className="h-24 w-24 object-cover rounded-full" />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="published">Published</Label>
            <Switch id="published" checked={published} onCheckedChange={(c) => setValue("published", c)} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : testimonial ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
