"use client";

import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useGetJourneyMilestonesQuery } from "@/services/api";
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
  year: z.string().regex(/^\d{4}$/, "Year must be a 4-digit number"),
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description cannot exceed 500 characters"),
  icon: z.string().min(1, "Please select an icon"),
  order: z.number().min(1, "Order must be at least 1"),
  isActive: z.boolean(),
});

interface JourneyMilestone {
  _id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
}

interface JourneyMilestoneFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: any) => void;
  milestone: JourneyMilestone | null;
}

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

export function JourneyMilestoneForm({
  isOpen,
  onOpenChange,
  onSave,
  milestone,
}: JourneyMilestoneFormProps) {
  const { data: existingMilestones = [] } = useGetJourneyMilestonesQuery(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: "",
      title: "",
      description: "",
      icon: "LuFlag",
      order: 1,
      isActive: true,
    },
  });

  useEffect(() => {
    if (milestone) {
      form.reset({
        year: milestone.year,
        title: milestone.title,
        description: milestone.description,
        icon: milestone.icon,
        order: milestone.order,
        isActive: milestone.isActive,
      });
    } else {
      // Set default order for new milestone
      const maxOrder = existingMilestones.length > 0 
        ? Math.max(...existingMilestones.map((m: any) => m.order))
        : 0;
      form.reset({
        year: "",
        title: "",
        description: "",
        icon: "LuFlag",
        order: maxOrder + 10, // Use increments of 10
        isActive: true,
      });
    }
  }, [milestone, existingMilestones, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(values);
  };

  const handleClose = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {milestone ? "Edit Journey Milestone" : "Add Journey Milestone"}
          </DialogTitle>
          <DialogDescription>
            {milestone 
              ? "Update the details of this journey milestone."
              : "Add a new milestone to your company's journey timeline."
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="2024" {...field} />
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
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Foundation Laid" {...field} />
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
                    <Textarea
                      placeholder="Describe this milestone..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
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

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Active Status</FormLabel>
                    <FormDescription>
                      Only active milestones will be displayed on the public website.
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
                {milestone ? "Update Milestone" : "Add Milestone"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 