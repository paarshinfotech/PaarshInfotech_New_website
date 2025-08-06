
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ImSpinner2 } from "react-icons/im";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
}

const formSchema = z.object({
  alt: z.string().min(3, "Alt text must be at least 3 characters."),
  category: z.string({ required_error: "Please select a category." }),
  image: z.any().optional(),
});

type MediaFormValues = z.infer<typeof formSchema>;

interface MediaUploadModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: { alt: string; category: string; image?: string, _id?: string }) => void;
  categories: Category[];
  item: any | null;
}

export function MediaUploadModal({ isOpen, onOpenChange, onSave, categories, item }: MediaUploadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<MediaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { alt: "", category: undefined, image: null },
  });

  useEffect(() => {
    if (isOpen) {
      if (item) {
        form.reset({
          alt: item.title,
          category: item.category,
        });
        setImagePreview(item.imageUrl);
      } else {
        form.reset({
          alt: "",
          category: undefined,
          image: null
        });
        setImagePreview(null);
      }
    }
  }, [item, isOpen, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", e.target.files);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (values: MediaFormValues) => {
    if (!values.image && !item) {
      form.setError("image", { message: "An image is required." });
      return;
    }
    
    try {
      setIsSubmitting(true);
      let base64Image: string | undefined;
      if (values.image && values.image.length > 0) {
        base64Image = await convertToBase64(values.image[0]);
      }

      await onSave({
        _id: item?._id,
        alt: values.alt,
        category: values.category,
        image: base64Image,
      });

      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{item ? "Edit Media" : "Upload New Media"}</DialogTitle>
              <DialogDescription>
                {item ? "Update the details for this image." : "Add a new image to your website's media gallery."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {imagePreview && (
                  <div className="relative h-40 w-full rounded-md overflow-hidden bg-muted">
                      <Image src={imagePreview} alt="Preview" fill className="object-contain" />
                  </div>
              )}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alt Text</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Team celebrating a milestone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat._id} value={cat.name}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
                {isSubmitting && <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />}
                {item ? "Save Changes" : "Upload"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
