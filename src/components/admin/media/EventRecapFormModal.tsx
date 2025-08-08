"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { FaPlus, FaTrash } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const galleryItemSchema = z.object({
  image: z.any().optional(), // For new file uploads
  alt: z.string().min(1, "Alt text is required"),
  hint: z.string().min(1, "Hint is required"),
  imageUrl: z.string().optional(), // For existing images
});

const formSchema = z.object({
  title: z.string().min(3, "Title is required."),
  date: z.string().min(3, "Date is required."),
  location: z.string().min(3, "Location is required."),
  description: z.string().min(10, "Description is required."),
  hint: z.string().min(2, "AI hint is required."),
  image: z.any().optional(), // Main cover image file
  gallery: z.array(galleryItemSchema),
});

type FormValues = z.infer<typeof formSchema>;

interface GalleryImage {
  alt: string;
  hint: string;
  image?: string; // base64 for new images
  imageUrl?: string; // URL for existing images
}

interface EventRecapFormModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: {
    title: string;
    description: string;
    hint: string;
    date: string;
    location: string;
    image?: string;
    galleryImages?: GalleryImage[];
  }) => void;
  item: any | null;
}

export function EventRecapFormModal({
  isOpen,
  onOpenChange,
  onSave,
  item,
}: EventRecapFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gallery: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "gallery",
  });

  useEffect(() => {
    if (isOpen) {
      if (item) {
        try {
          let formattedDate = "";
          if (item.eventDate) {
            const date = new Date(item.eventDate);
            if (!isNaN(date.getTime())) {
              formattedDate = date.toISOString().split("T")[0];
            }
          }

          form.reset({
            title: item.title || "",
            date: formattedDate,
            location: item.location || "",
            description: item.description || "",
            hint: item.hint || "",
            gallery: [], // Reset gallery to be populated by replace
          });

          const galleryItems =
            item.images?.map((img: any) => ({
              alt: img.alt || "",
              hint: img.hint || "",
              image: undefined,
              imageUrl: img.imageUrl,
            })) || [];
          replace(galleryItems);
        } catch (error) {
          console.error("Error setting form data:", error);
          form.reset();
          replace([]);
        }
      } else {
        form.reset({
          title: "",
          date: "",
          location: "",
          description: "",
          hint: "",
          gallery: [],
        });
        replace([]);
      }
    }
  }, [item, form, isOpen, replace]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);

      let coverImageBase64: string | undefined;
      if (values.image?.[0]) {
        coverImageBase64 = await convertToBase64(values.image[0]);
      }

      const galleryImagesPromises = values.gallery.map(async (item) => {
        // If it's a new image (has a file)
        if (item.image?.[0]) {
          const imageBase64 = await convertToBase64(item.image[0]);
          return {
            alt: item.alt,
            hint: item.hint,
            image: imageBase64, // base64 for new
          };
        }
        // If it's an existing image (has a URL)
        else if (item.imageUrl) {
          return {
            alt: item.alt,
            hint: item.hint,
            imageUrl: item.imageUrl, // URL for existing
          };
        }
        return null;
      });

      const galleryImagesWithNull = await Promise.all(galleryImagesPromises);
      // Fixed: Properly filter and map the gallery images
      const galleryImages: GalleryImage[] = galleryImagesWithNull
        .filter((img): img is NonNullable<typeof img> => img !== null);

      await onSave({
        title: values.title,
        description: values.description,
        hint: values.hint,
        date: values.date,
        location: values.location,
        image: coverImageBase64,
        galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error processing form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {item ? "Edit Event Recap" : "Add New Event Recap"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details for the event and manage its photo gallery.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-grow overflow-hidden flex flex-col"
          >
            <ScrollArea className="flex-grow pr-6 -mr-6">
              <div className="grid md:grid-cols-2 gap-6 py-4">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., Office HQ, Conference Hall"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={4} />
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
                        <FormLabel>Cover Image (16:9)</FormLabel>
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
                    name="hint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Image AI Hint</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <FormLabel>Gallery Images</FormLabel>
                  <div className="space-y-4 rounded-md border p-4 max-h-96 overflow-y-auto">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex gap-2 items-end p-2 border rounded-md"
                      >
                        {field.imageUrl && (
                          <Image
                            src={field.imageUrl}
                            alt={field.alt || "Gallery image"}
                            width={64}
                            height={64}
                            className="aspect-square object-cover rounded-md"
                          />
                        )}
                        <div className="flex-grow space-y-2">
                          <FormField
                            control={form.control}
                            name={`gallery.${index}.image`}
                            render={({ field: imageField }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Image File{" "}
                                  {field.imageUrl
                                    ? "(Optional: Replace existing)"
                                    : "(Required)"}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      imageField.onChange(e.target.files)
                                    }
                                    className="h-8"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`gallery.${index}.alt`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Alt Text
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className="h-8"
                                    placeholder="Describe the image"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`gallery.${index}.hint`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  AI Hint
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className="h-8"
                                    placeholder="Keywords for AI processing"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => remove(index)}
                        >
                          <FaTrash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        append({
                          image: undefined,
                          alt: "",
                          hint: "",
                          imageUrl: undefined,
                        })
                      }
                    >
                      <FaPlus className="mr-2 h-4 w-4" /> Add Gallery Image
                    </Button>
                  </div>
                  <FormMessage>
                    {form.formState.errors.gallery?.message}
                  </FormMessage>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="pt-4 border-t mt-auto flex-shrink-0">
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
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}