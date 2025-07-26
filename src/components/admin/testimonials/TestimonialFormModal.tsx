"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

interface TestimonialFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: {
    quote: string;
    name: string;
    title: string;
    avatarBase64?: string;
    published?: boolean;
  }) => void;
  testimonial: { quote: string; name: string; title: string; avatar: string; published: boolean } | null;
}

export function TestimonialFormModal({ isOpen, onOpenChange, onSave, testimonial }: TestimonialFormModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    quote: "",
    name: "",
    title: "",
    published: true,
  });
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (testimonial) {
      setFormData({
        quote: testimonial.quote,
        name: testimonial.name,
        title: testimonial.title,
        published: testimonial.published,
      });
      setImagePreview(testimonial.avatar);
      setAvatarBase64(null);
    } else {
      setFormData({
        quote: "",
        name: "",
        title: "",
        published: true,
      });
      setImagePreview(null);
      setAvatarBase64(null);
    }
  }, [testimonial]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.match(/image\/(jpeg|png|gif)/)) {
        toast({
          title: "Invalid File",
          description: "Please upload a JPEG, PNG, or GIF image.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarBase64(base64String);
        setImagePreview(base64String);
      };
      reader.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to read image file.",
          variant: "destructive",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      quote: formData.quote,
      name: formData.name,
      title: formData.title,
      avatarBase64: avatarBase64 || undefined,
      published: formData.published,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{testimonial ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="quote">Quote</Label>
              <Input
                id="quote"
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                placeholder="Enter testimonial quote"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter title or role"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="avatar">Avatar Image</Label>
              <input
                id="avatar"
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {imagePreview && (
                <div className="mt-2">
                  <Image
                    src={imagePreview}
                    alt="Avatar preview"
                    width={100}
                    height={100}
                    className="rounded-md object-contain"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
              />
              <Label htmlFor="published">Published</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.quote || !formData.name || !formData.title || (!avatarBase64 && !testimonial?.avatar)}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}