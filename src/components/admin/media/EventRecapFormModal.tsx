
'use client';

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import type { EventRecap } from "@/lib/mediaData";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const galleryItemSchema = z.object({
    src: z.string(),
    alt: z.string().min(1, "Alt text is required"),
    hint: z.string().min(1, "Hint is required"),
});

const formSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, "Title is required."),
  date: z.string().min(3, "Date is required."),
  description: z.string().min(10, "Description is required."),
  hint: z.string().min(2, "AI hint is required."),
  imageFile: z.any().optional(),
  gallery: z.array(galleryItemSchema),
});

type FormValues = z.infer<typeof formSchema>;

interface EventRecapFormModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: FormValues) => void;
  item: EventRecap | null;
}

export function EventRecapFormModal({ isOpen, onOpenChange, onSave, item }: EventRecapFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        gallery: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "gallery"
  });

  useEffect(() => {
    if (item) {
      form.reset({
        id: item.id,
        title: item.title,
        date: item.date,
        description: item.description,
        hint: item.hint,
        gallery: item.gallery,
      });
    } else {
      form.reset({
        id: undefined,
        title: "",
        date: "",
        description: "",
        hint: "",
        gallery: []
      });
    }
  }, [item, form, isOpen]);

  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
        // In a real app, you'd handle file uploads here and update URLs.
        const dataToSave = {
            ...values,
            image: item?.image || "https://placehold.co/600x400.png",
        };
        onSave(dataToSave as any);
        setIsSubmitting(false);
        onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{item ? 'Edit Event Recap' : 'Add New Event Recap'}</DialogTitle>
          <DialogDescription>
            Fill in the details for the event and manage its photo gallery.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-grow overflow-hidden flex flex-col">
            <ScrollArea className="flex-grow pr-6 -mr-6">
              <div className="grid md:grid-cols-2 gap-6 py-4">
                  <div className="space-y-4">
                      <FormField control={form.control} name="title" render={({ field }) => (
                          <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="date" render={({ field }) => (
                          <FormItem><FormLabel>Date</FormLabel><FormControl><Input {...field} placeholder="e.g. December 15, 2023" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="description" render={({ field }) => (
                          <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} rows={4} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="imageFile" render={({ field }) => (
                          <FormItem>
                              <FormLabel>Cover Image (16:9)</FormLabel>
                              <FormControl><Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} /></FormControl>
                              <FormMessage />
                          </FormItem>
                      )} />
                       <FormField control={form.control} name="hint" render={({ field }) => (
                          <FormItem><FormLabel>Cover Image AI Hint</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                  </div>
                  <div className="space-y-4">
                      <FormLabel>Gallery Images</FormLabel>
                      <div className="space-y-4 rounded-md border p-4 max-h-96 overflow-y-auto">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 items-end p-2 border rounded-md">
                                <Image src={field.src} alt={field.alt} width={64} height={64} className="aspect-square object-cover rounded-md" />
                                <div className="flex-grow space-y-2">
                                     <FormField control={form.control} name={`gallery.${index}.alt`} render={({ field }) => (
                                        <FormItem><FormLabel className="text-xs">Alt Text</FormLabel><FormControl><Input {...field} className="h-8"/></FormControl><FormMessage /></FormItem>
                                    )} />
                                     <FormField control={form.control} name={`gallery.${index}.hint`} render={({ field }) => (
                                        <FormItem><FormLabel className="text-xs">AI Hint</FormLabel><FormControl><Input {...field} className="h-8"/></FormControl><FormMessage /></FormItem>
                                    )} />
                                </div>
                                <Button type="button" variant="destructive" size="icon" className="h-8 w-8" onClick={() => remove(index)}><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        ))}
                         <Button type="button" variant="outline" className="w-full" onClick={() => append({ src: 'https://placehold.co/800x600.png', alt: '', hint: '' })}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Gallery Image
                        </Button>
                      </div>
                      <FormMessage>{form.formState.errors.gallery?.message}</FormMessage>
                  </div>
              </div>
            </ScrollArea>
            <DialogFooter className="pt-4 border-t mt-auto flex-shrink-0">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
