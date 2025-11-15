"use client";

import { useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import {
    LuFlag,
    LuBriefcase,
    LuBuilding2,
    LuRocket,
    LuGlobe,
    LuStar,
    LuTarget,
    LuTrendingUp,
  } from "react-icons/lu";

const formSchema = z.object({
  year: z.string().regex(/^\d{4}$/, "Must be a 4-digit year."),
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description is required."),
  icon: z.string().min(1, "Icon is required."),
});

const iconOptions = [
    { value: "LuFlag", label: "Flag", icon: LuFlag },
    { value: "LuBriefcase", label: "Briefcase", icon: LuBriefcase },
    { value: "LuBuilding2", label: "Building", icon: LuBuilding2 },
    { value: "LuRocket", label: "Rocket", icon: LuRocket },
    { value: "LuGlobe", label: "Globe", icon: LuGlobe },
    { value: "LuStar", label: "Star", icon: LuStar },
    { value: "LuTarget", label: "Target", icon: LuTarget },
    { value: "LuTrendingUp", label: "Trending Up", icon: LuTrendingUp },
  ];

interface ECJourneyFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: any) => void;
  milestone: any | null;
}

export function ECJourneyFormModal({ isOpen, onOpenChange, onSave, milestone }: ECJourneyFormModalProps) {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { year: "", title: "", description: "", icon: "LuFlag" },
  });

  useEffect(() => {
    if (milestone) {
      form.reset(milestone);
    } else {
      form.reset({ year: "", title: "", description: "", icon: "LuFlag" });
    }
  }, [milestone, form]);

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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <DialogHeader>
          <DialogTitle>{milestone ? "Edit Milestone" : "Add Milestone"}</DialogTitle>
          <DialogDescription>
            {milestone ? "Update the details of this milestone." : "Add a new milestone to the journey."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl><Input {...field} placeholder="e.g., 2024" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
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
                  <FormControl><Textarea {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {iconOptions.map((option) => {
                        const IconComponent = option.icon;
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4" />
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">{milestone ? "Update" : "Add"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
