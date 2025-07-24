'use client';

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ImSpinner2 } from "react-icons/im";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  hint: z.string().min(2, "AI hint is required.").max(40, "Hint is too long."),
  image: z.any().optional(),
  date: z.string().min(1, "Date is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface BtsFormModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: { title: string; description: string; hint: string; date: string; image?: string }) => void;
  item: any | null;
}

export function BtsFormModal({ isOpen, onOpenChange, onSave, item }: BtsFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (item) {
      form.reset({
        title: item.title,
        description: item.description,
        hint: item.hint || '',
        date: new Date(item.date).toISOString().split('T')[0],
      });
    }
  }, [item, form]);

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
      let base64Image: string | undefined;
      
      if (values.image && values.image.length > 0) {
        base64Image = await convertToBase64(values.image[0]);
      }

      await onSave({
        title: values.title,
        description: values.description,
        hint: values.hint,
        date: values.date,
        image: base64Image,
      });

      onOpenChange(false);
      if (!item) {
        form.reset();
      }
    } catch (error) {
      console.error('Error processing form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{item ? `Edit "${item.title}" Card` : 'Add New BTS Card'}</DialogTitle>
              <DialogDescription>
                {item ? 'Update the content for this card' : 'Add a new card'} in the "A Day in the Life" section.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} rows={3} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="date" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl><Input type="date" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
              <FormField control={form.control} name="image" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image {item ? '(Optional)' : '(Required)'}</FormLabel>
                    <FormControl><Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} /></FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
              <FormField control={form.control} name="hint" render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI Hint</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />}
                {item ? 'Save Changes' : 'Add Card'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
