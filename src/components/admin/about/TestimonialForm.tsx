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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { LuStar } from "react-icons/lu";

const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  designation: z.string().min(2, "Designation must be at least 2 characters").max(100, "Designation must be less than 100 characters"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  feedback: z.string().min(10, "Feedback must be at least 10 characters").max(1000, "Feedback must be less than 1000 characters"),
  order: z.number().min(1, "Order must be at least 1"),
  isActive: z.boolean(),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

interface TestimonialFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: TestimonialFormData) => void;
  testimonial?: {
    _id: string;
    name: string;
    designation: string;
    rating: number;
    feedback: string;
    order: number;
    isActive: boolean;
  } | null;
}

export function TestimonialForm({ isOpen, onOpenChange, onSave, testimonial }: TestimonialFormProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(5);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      designation: "",
      rating: 5,
      feedback: "",
      order: 1,
      isActive: true,
    },
  });

  const isActive = watch("isActive");

  useEffect(() => {
    if (testimonial) {
      setValue("name", testimonial.name);
      setValue("designation", testimonial.designation);
      setValue("rating", testimonial.rating);
      setValue("feedback", testimonial.feedback);
      setValue("order", testimonial.order);
      setValue("isActive", testimonial.isActive);
      setSelectedRating(testimonial.rating);
    } else {
      reset();
      setSelectedRating(5);
    }
  }, [testimonial, setValue, reset]);

  const onSubmit = (data: TestimonialFormData) => {
    onSave(data);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    setValue("rating", rating);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starNumber = i + 1;
      const isFilled = starNumber <= (hoveredRating || selectedRating);
      
      return (
        <button
          key={i}
          type="button"
          className="p-1"
          onMouseEnter={() => setHoveredRating(starNumber)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => handleRatingChange(starNumber)}
        >
          <LuStar
            className={`h-6 w-6 transition-colors ${
              isFilled ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        </button>
      );
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {testimonial ? "Edit Testimonial" : "Add New Testimonial"}
          </DialogTitle>
          <DialogDescription>
            {testimonial
              ? "Update the testimonial details below."
              : "Fill in the details to add a new testimonial."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="designation">Designation *</Label>
            <Input
              id="designation"
              {...register("designation")}
              placeholder="e.g., Software Engineer, CEO, etc."
            />
            {errors.designation && (
              <p className="text-sm text-red-500">{errors.designation.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex items-center gap-2">
              {renderStars()}
              <span className="text-sm text-muted-foreground ml-2">
                ({selectedRating}/5)
              </span>
            </div>
            {errors.rating && (
              <p className="text-sm text-red-500">{errors.rating.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback *</Label>
            <Textarea
              id="feedback"
              {...register("feedback")}
              placeholder="Enter the testimonial feedback..."
              rows={4}
            />
            {errors.feedback && (
              <p className="text-sm text-red-500">{errors.feedback.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="order">Display Order *</Label>
            <Input
              id="order"
              type="number"
              {...register("order", { valueAsNumber: true })}
              placeholder="Enter display order"
              min="1"
            />
            {errors.order && (
              <p className="text-sm text-red-500">{errors.order.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isActive">Active Status</Label>
            <Switch
              id="isActive"
              checked={isActive}
              onCheckedChange={(checked) => setValue("isActive", checked)}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : testimonial ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 