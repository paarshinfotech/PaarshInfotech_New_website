'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ImSpinner2 } from "react-icons/im";

const formSchema = z.object({
  alt: z.string().min(3, "Alt text must be at least 3 characters."),
  hint: z.string().min(2, "AI hint is required.").max(40, "Hint is too long."),
  image: z.any().refine((files) => files?.length === 1, "An image is required."),
});

type FormValues = z.infer<typeof formSchema>;

interface SliderImageFormModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: FormValues) => void;
}

export function SliderImageFormModal({ isOpen, onOpenChange, onSave }: SliderImageFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alt: "",
      hint: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
        onSave(values);
        setIsSubmitting(false);
        onOpenChange(false);
        form.reset();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Image to Slider</DialogTitle>
              <DialogDescription>
                Upload a new image for the "Best Office Moments" carousel.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField control={form.control} name="image" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image File (16:9 ratio recommended)</FormLabel>
                    <FormControl><Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)}/></FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
              <FormField control={form.control} name="alt" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alt Text</FormLabel>
                    <FormControl><Input placeholder="e.g., Team celebrating a milestone" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
              <FormField control={form.control} name="hint" render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI Hint</FormLabel>
                    <FormControl><Input placeholder="e.g., company anniversary" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />}
                Upload
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
