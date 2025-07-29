"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useGetCareerTestimonialsQuery } from "@/services/api";

const formSchema = z.object({
  avatarBase64: z.string().optional(),
  quote: z.string().min(10, "Quote is required."),
  name: z.string().min(2, "Name is required."),
  role: z.string().min(2, "Role is required."),
  hint: z.string().optional(),
  order: z.number().min(1, "Order must be at least 1"),
});

interface CareerTestimonial {
  _id?: string;
  quote: string;
  name: string;
  role: string;
  avatar?: string;
  hint?: string;
  order: number;
}

interface CareerTestimonialFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: any) => void;
  item: CareerTestimonial | null;
}

export function CareerTestimonialFormModal({ isOpen, onOpenChange, onSave, item }: CareerTestimonialFormModalProps) {
  const { data: existingTestimonials = {data: []} } = useGetCareerTestimonialsQuery(undefined, { skip: !isOpen });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { quote: "", name: "", role: "", hint: "", order: 10 },
  });

  useEffect(() => {
    if (isOpen) {
      if (item) {
        setImagePreview(item.avatar || null);
        form.reset({ quote: item.quote, name: item.name, role: item.role, hint: item.hint || "", order: item.order });
      } else {
        const maxOrder = existingTestimonials.data.length > 0 ? Math.max(...existingTestimonials.data.map((i: any) => i.order)) : 0;
        setImagePreview(null);
        form.reset({ quote: "", name: "", role: "", hint: "", order: maxOrder + 10 });
      }
    }
  }, [item, existingTestimonials, form, isOpen]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!values.avatarBase64 && !item) {
        form.setError("avatarBase64", { message: "Avatar is required" });
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
        form.setValue("avatarBase64", base64, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{item ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
          <DialogDescription>{item ? "Update testimonial details." : "Add a new success story."}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="avatarBase64"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      {imagePreview && (
                        <Image src={imagePreview} alt={form.getValues("name") || "Preview"} width={80} height={80} className="rounded-full border" />
                      )}
                      <Input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="e.g. Priya Sharma" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField control={form.control} name="role" render={({ field }) => (
              <FormItem><FormLabel>Role</FormLabel><FormControl><Input placeholder="e.g. Former Intern, now Software Engineer" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="quote" render={({ field }) => (
              <FormItem><FormLabel>Quote</FormLabel><FormControl><Textarea placeholder="Enter testimonial..." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="hint" render={({ field }) => (
              <FormItem><FormLabel>AI Hint (Optional)</FormLabel><FormControl><Input placeholder="e.g. professional woman" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="order" render={({ field }) => (
              <FormItem><FormLabel>Display Order</FormLabel><FormControl><Input type="number" min="1" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} /></FormControl><FormMessage /></FormItem>
            )} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">{item ? "Update" : "Add"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
