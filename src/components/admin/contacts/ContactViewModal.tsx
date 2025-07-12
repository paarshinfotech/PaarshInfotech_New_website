
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Contact } from "@/app/(admin)/admin/contacts/page";
import { ScrollArea } from "@/components/ui/scroll-area";

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
          <DialogTitle>{contact.subject}</DialogTitle>
          <DialogDescription>
            Message from <span className="font-semibold text-foreground">{contact.name}</span> ({contact.email}) on {contact.date}.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] rounded-md border p-4">
          <p className="text-sm text-foreground whitespace-pre-wrap">
            {contact.message}
          </p>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
