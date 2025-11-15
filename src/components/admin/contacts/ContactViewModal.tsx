"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  date: string;
  status: "New" | "Read" | "Archived";
}

interface ContactViewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  contact: Contact | null;
}

export function ContactViewModal({ isOpen, onOpenChange, contact }: ContactViewModalProps) {
  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{contact.message.slice(0, 50)}...</DialogTitle>
          <DialogDescription>
            Message from <span className="font-semibold text-foreground">{contact.name}</span> on {format(new Date(contact.date), "PP")}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Email:</span>
              <p className="text-foreground">{contact.email}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Phone:</span>
              <p className="text-foreground">{contact.phone || "N/A"}</p>
            </div>
          </div>
          <div>
            <span className="font-medium text-muted-foreground text-sm">Message:</span>
            <ScrollArea className="max-h-[50vh] rounded-md border p-4 mt-2">
              <p className="text-sm text-foreground whitespace-pre-wrap">
                {contact.message}
              </p>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}