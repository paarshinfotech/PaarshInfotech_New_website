"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { LuLoader } from "react-icons/lu";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  name: z.string().min(2, "Client name is required."),
  industry: z.string().min(2, "Industry is required."),
  since: z.string().regex(/^\d{4}$/, "Must be a valid year."),
  logo: z.any().optional(),
  published: z.boolean().optional(),
});

type ClientFormValues = z.infer<typeof formSchema>;

interface ClientFormModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: ClientFormValues & { _id?: string }) => void;
  client: {
    _id?: string;
    name: string;
    industry: string;
    since: string;
    logo: string;
    published: boolean;
  } | null;
}

export function ClientFormModal({
  isOpen,
  onOpenChange,
  onSave,
  client,
}: ClientFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      industry: "",
      since: "",
      logo: null,
      published: true,
    },
  });

  useEffect(() => {
    if (client) {
      form.reset({
        name: client.name,
        industry: client.industry,
        since: client.since,
        logo: null,
        published: client.published,
      });
    } else {
      form.reset({ name: "", industry: "", since: "", logo: null, published: true });
    }
  }, [client, form, isOpen]);

  const onSubmit = async (values: ClientFormValues) => {
    setIsSubmitting(true);
    try {
      const newLogoUrl =
        values.logo && values.logo.length > 0
          ? "https://placehold.co/40x40.png"
          : client?.logo;
      const dataToSave = {
        ...values,
        _id: client?._id,
        logo: newLogoUrl || "https://placehold.co/40x40.png",
        published: values.published ?? client?.published ?? true,
      };
      await onSave(dataToSave);
    } finally {
      setIsSubmitting(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {client ? "Edit Client" : "Add New Client"}
              </DialogTitle>
              <DialogDescription>
                {client
                  ? "Update the details for this client."
                  : "Enter the details for the new client."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. TechCorp" {...field} />
                    </FormControl>
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
                    <FormControl>
                      <Input placeholder="e.g. Technology" {...field} />
                    </FormControl>
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
                    <FormControl>
                      <Input placeholder="e.g. 2021" {...field} />
                    </FormControl>
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
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Published</FormLabel>
                      <p className="text-[0.8rem] text-muted-foreground">
                        Make this client visible on the site.
                      </p>
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
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}