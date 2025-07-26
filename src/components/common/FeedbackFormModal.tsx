"use client";

import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { useAddTestimonialMutation } from "@/services/api";
import { LuStar, LuCheck } from "react-icons/lu";

const feedbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  designation: z.string().min(2, "Designation must be at least 2 characters").max(100, "Designation must be less than 100 characters"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  feedback: z.string().min(10, "Feedback must be at least 10 characters").max(1000, "Feedback must be less than 1000 characters"),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

interface FeedbackFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FeedbackFormModal({ isOpen, onOpenChange }: FeedbackFormModalProps) {
  const { toast } = useToast();
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(5);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [addTestimonial] = useAddTestimonialMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      designation: "",
      rating: 5,
      feedback: "",
    },
  });

  const onSubmit = async (data: FeedbackFormData) => {
    try {
      // Get the next order number (max order + 10)
      const nextOrder = 10; // Default for first testimonial
      
      await addTestimonial({
        ...data,
        order: nextOrder,
        isActive: false, // New submissions are inactive by default for admin review
      }).unwrap();

      setIsSubmitted(true);
      reset();
      setSelectedRating(5);
      
      toast({
        title: "Thank You!",
        description: "Your feedback has been submitted successfully. We'll review it shortly.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    setValue("rating", rating);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
      if (isSubmitted) {
        setIsSubmitted(false);
      }
    }
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
            className={`h-8 w-8 transition-colors ${
              isFilled ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        </button>
      );
    });
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md text-center">
          <div className="flex flex-col items-center space-y-4 py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <LuCheck className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle>Thank You!</DialogTitle>
            <DialogDescription>
              Your feedback has been submitted successfully. We appreciate you taking the time to share your experience with us.
            </DialogDescription>
            <Button onClick={handleClose} className="mt-4">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Experience</DialogTitle>
          <DialogDescription>
            We'd love to hear about your experience with Paarsh Infotech. Your feedback helps us improve and grow.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="designation">Your Role/Designation *</Label>
            <Input
              id="designation"
              {...register("designation")}
              placeholder="e.g., Software Engineer, CEO, Intern, etc."
            />
            {errors.designation && (
              <p className="text-sm text-red-500">{errors.designation.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>How would you rate your experience? *</Label>
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
            <Label htmlFor="feedback">Your Feedback *</Label>
            <Textarea
              id="feedback"
              {...register("feedback")}
              placeholder="Tell us about your experience with Paarsh Infotech..."
              rows={4}
            />
            {errors.feedback && (
              <p className="text-sm text-red-500">{errors.feedback.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 