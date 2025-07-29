"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { Quote } from "@/app/(admin)/admin/quotes/page";

interface QuoteViewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  quote: Quote | null;
}

export function QuoteViewModal({ isOpen, onOpenChange, quote }: QuoteViewModalProps) {
  if (!quote) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Quote Request Details</DialogTitle>
          <DialogDescription>
            From <span className="font-semibold text-foreground">{quote.name}</span> ({quote.email}) on {format(new Date(quote.createdAt), "PPp")}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div>
              <h4 className="font-semibold text-foreground mb-1">Contact</h4>
              <p className="text-sm text-muted-foreground">{quote.phone}</p>
            </div>
            <div>
                <h4 className="font-semibold text-foreground mb-2">Interested Services</h4>
                <div className="flex flex-wrap gap-2">
                    {quote.services.map(service => (
                        <Badge key={service} variant="secondary">{service}</Badge>
                    ))}
                </div>
            </div>
             <div>
                <h4 className="font-semibold text-foreground mb-2">Message</h4>
                <ScrollArea className="max-h-[40vh] rounded-md border p-4">
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                        {quote.message}
                    </p>
                </ScrollArea>
             </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
