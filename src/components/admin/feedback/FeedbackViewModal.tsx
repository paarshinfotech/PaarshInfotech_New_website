
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Feedback } from "@/lib/feedbackData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface FeedbackViewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  feedback: Feedback | null;
}

export function FeedbackViewModal({ isOpen, onOpenChange, feedback }: FeedbackViewModalProps) {
  if (!feedback) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Feedback from {feedback.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 pt-1">
            <Badge variant={feedback.source === 'Customer' ? 'default' : (feedback.source === 'Team Member' ? 'secondary' : 'outline')}>{feedback.source}</Badge>
            <span>•</span>
            <span>Received on {feedback.date}</span>
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] rounded-md border p-4">
          <p className="text-sm text-foreground whitespace-pre-wrap">
            {feedback.content}
          </p>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
