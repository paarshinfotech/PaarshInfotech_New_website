
'use client';

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Client name is required."),
  industry: z.string().min(2, "Industry is required."),
  since: z.string().regex(/^\d{4}$/, "Must be a valid year."),
  logo: z.any().optional(),
});

type ClientFormValues = z.infer<typeof formSchema>;

interface ClientFormModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: any) => void;
  client: { id: number; name: string; industry: string; since: string; logo: string; } | null;
}

export function ClientFormModal({ isOpen, onOpenChange, onSave, client }: ClientFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      industry: "",
      since: "",
    },
  });

  useEffect(() => {
    if (client) {
      form.reset({
          name: client.name,
          industry: client.industry,
          since: client.since,
          logo: null,
      });
    } else {
      form.reset({ name: "", industry: "", since: "", logo: null });
    }
  }, [client, form, isOpen]);

  const onSubmit = (values: ClientFormValues) => {
    setIsSubmitting(true);
    // Simulate API call for upload
    setTimeout(() => {
        const dataToSave = {
            ...values,
            id: client?.id,
            logo: values.logo && values.logo.length > 0 ? values.logo : client?.logo,
        };
        onSave(dataToSave);
        setIsSubmitting(false);
        onOpenChange(false);
    }, 1000)
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{client ? "Edit Client" : "Add New Client"}</DialogTitle>
              <DialogDescription>
                {client ? "Update the details for this client." : "Enter the details for the new client."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl><Input placeholder="e.g. TechCorp" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl><Input placeholder="e.g. Technology" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="since"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Since (Year)</FormLabel>
                    <FormControl><Input placeholder="e.g. 2021" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Logo</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
