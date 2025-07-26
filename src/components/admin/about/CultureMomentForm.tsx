"use client";

import { useEffect, useRef, useState } from "react";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useGetCultureMomentsQuery } from "@/services/api";

const formSchema = z.object({
  imageBase64: z.string().optional(), // Only required for new
  alt: z.string().min(2, "Alt text is required").max(100, "Max 100 chars"),
  order: z.number().min(1, "Order must be at least 1"),
  isActive: z.boolean(),
});

interface CultureMoment {
  _id?: string;
  imageUrl?: string;
  alt: string;
  order: number;
  isActive: boolean;
}

interface CultureMomentFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: any) => void;
  moment: CultureMoment | null;
}

export function CultureMomentForm({
  isOpen,
  onOpenChange,
  onSave,
  moment,
}: CultureMomentFormProps) {
  const { data: existingMoments = [] } = useGetCultureMomentsQuery(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageBase64: undefined,
      alt: "",
      order: 10,
      isActive: true,
    },
  });

  useEffect(() => {
    if (moment) {
      setImagePreview(moment.imageUrl || null);
      form.reset({
        imageBase64: undefined,
        alt: moment.alt,
        order: moment.order,
        isActive: moment.isActive,
      });
    } else {
      // Set default order for new moment
      const maxOrder = existingMoments.length > 0
        ? Math.max(...existingMoments.map((m: any) => m.order))
        : 0;
      setImagePreview(null);
      form.reset({
        imageBase64: undefined,
        alt: "",
        order: maxOrder + 10,
        isActive: true,
      });
    }
  }, [moment, existingMoments, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // If editing and no new image, don't send imageBase64
    if (!values.imageBase64 && moment && moment.imageUrl) {
      const { imageBase64, ...rest } = values;
      onSave(rest);
    } else {
      onSave(values);
    }
  };

  const handleClose = () => {
    form.reset();
    setImagePreview(null);
    onOpenChange(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      form.setValue("imageBase64", base64, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {moment ? "Edit Moment" : "Add Moment"}
          </DialogTitle>
          <DialogDescription>
            {moment
              ? "Update the details of this moment."
              : "Add a new image to the Moments That Matter section."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="imageBase64"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      {imagePreview && (
                        <div className="relative w-full h-40 rounded overflow-hidden border">
                          <Image
                            src={imagePreview}
                            alt={form.getValues("alt") || "Preview"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {imagePreview ? "Change Image" : "Upload Image"}
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    {moment && moment.imageUrl && !imagePreview
                      ? "Current image will be kept if not changed."
                      : "Upload a new image for this moment."}
                  </FormDescription>
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
                    <Input placeholder="e.g. Team celebration" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Active Status</FormLabel>
                    <FormDescription>
                      Only active moments will be displayed on the public website.
                    </FormDescription>
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
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">
                {moment ? "Update Moment" : "Add Moment"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 