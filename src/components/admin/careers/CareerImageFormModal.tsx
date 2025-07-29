"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useGetCareerImagesQuery } from "@/services/api";

const formSchema = z.object({
  imageBase64: z.string().optional(),
  alt: z.string().min(2, "Alt text is required").max(100, "Max 100 chars"),
  hint: z.string().optional(),
  order: z.number().min(1, "Order must be at least 1"),
});

interface CareerImage {
  _id?: string;
  imageUrl?: string;
  alt: string;
  hint?: string;
  order: number;
}

interface CareerImageFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: any) => void;
  item: CareerImage | null;
}

export function CareerImageFormModal({ isOpen, onOpenChange, onSave, item }: CareerImageFormModalProps) {
  const { data: existingImages = {data: []} } = useGetCareerImagesQuery(undefined, { skip: !isOpen });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { alt: "", hint: "", order: 10 },
  });

  useEffect(() => {
    if (isOpen) {
      if (item) {
        setImagePreview(item.imageUrl || null);
        form.reset({ alt: item.alt, hint: item.hint || "", order: item.order });
      } else {
        const maxOrder = existingImages.data.length > 0 ? Math.max(...existingImages.data.map((i: any) => i.order)) : 0;
        setImagePreview(null);
        form.reset({ alt: "", hint: "", order: maxOrder + 10 });
      }
    }
  }, [item, existingImages, form, isOpen]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!values.imageBase64 && !item) {
        form.setError("imageBase64", { message: "Image is required" });
        return;
    }
    onSave(values);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        form.setValue("imageBase64", base64, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{item ? "Edit Image" : "Add Image"}</DialogTitle>
          <DialogDescription>{item ? "Update image details." : "Add a new image to the 'Life at Paarsh' section."}</DialogDescription>
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
                        <Image src={imagePreview} alt={form.getValues("alt") || "Preview"} width={100} height={100} className="rounded border" />
                      )}
                      <Input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="alt" render={({ field }) => (
              <FormItem><FormLabel>Alt Text</FormLabel><FormControl><Input placeholder="e.g. Team celebration" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="hint" render={({ field }) => (
              <FormItem><FormLabel>AI Hint (Optional)</FormLabel><FormControl><Input placeholder="e.g. office party" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="order" render={({ field }) => (
              <FormItem><FormLabel>Display Order</FormLabel><FormControl><Input type="number" min="1" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} /></FormControl><FormMessage /></FormItem>
            )} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">{item ? "Update Image" : "Add Image"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
