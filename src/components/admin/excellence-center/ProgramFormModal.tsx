
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { IoClose } from "react-icons/io5";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description is required."),
  tags: z.array(z.string()).min(1, "At least one tag is required."),
  icon: z.string().optional(),
});

interface ProgramFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: any) => void;
  program: any | null;
}

export function ProgramFormModal({ isOpen, onOpenChange, onSave, program }: ProgramFormModalProps) {
  const { toast } = useToast();
  const [tagInput, setTagInput] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "", tags: [], icon: "LuBookOpen" },
  });

  useEffect(() => {
    if (program) {
      form.reset({
        title: program.title,
        description: program.description,
        tags: program.tags,
        icon: program.icon || "LuBookOpen"
      });
    } else {
      form.reset({ title: "", description: "", tags: [], icon: "LuBookOpen" });
    }
  }, [program, form]);

  // Cleanup effect to ensure no lingering overlays
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        document.body.style.pointerEvents = '';
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      const currentTags = form.getValues('tags');
      if (newTag && !currentTags.includes(newTag)) {
        form.setValue('tags', [...currentTags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues('tags');
    form.setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
  };


  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <DialogHeader>
          <DialogTitle>{program ? "Edit Program" : "Add Program"}</DialogTitle>
          <DialogDescription>
            {program ? "Update the details of this program." : "Add a new program offered."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Title</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
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
                  <FormControl><Textarea {...field} placeholder="Describe the program..." /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                    <div>
                        <Input
                        placeholder="Type a tag and press Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        />
                        <div className="mt-2 flex flex-wrap gap-2">
                        {field.value.map((tag) => (
                            <Badge key={tag} variant="secondary">
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-2 rounded-full p-0.5 hover:bg-destructive/20"
                            >
                                <IoClose className="h-3 w-3" />
                            </button>
                            </Badge>
                        ))}
                        </div>
                    </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">{program ? "Update" : "Add"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
