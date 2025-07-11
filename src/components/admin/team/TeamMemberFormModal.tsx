
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
import type { TeamMember } from "@/app/(admin)/admin/team/page";

const formSchema = z.object({
  name: z.string().min(2, "Name is required."),
  role: z.string().min(2, "Role is required."),
  avatar: z.string().url("Must be a valid URL.").optional().or(z.literal('')),
});

type MemberFormValues = z.infer<typeof formSchema>;

interface TeamMemberFormModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: TeamMember) => void;
  member: TeamMember | null;
}

export function TeamMemberFormModal({ isOpen, onOpenChange, onSave, member }: TeamMemberFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      avatar: "",
    },
  });

  useEffect(() => {
    if (member) {
      form.reset(member);
    } else {
      form.reset({ name: "", role: "", avatar: "" });
    }
  }, [member, form, isOpen]);

  const onSubmit = (values: MemberFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        const dataToSave = {
            ...values,
            id: member?.id || Date.now(),
            avatar: values.avatar || "https://placehold.co/40x40.png"
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
              <DialogTitle>{member ? "Edit Team Member" : "Add New Team Member"}</DialogTitle>
              <DialogDescription>
                {member ? "Update the details for this team member." : "Enter the details for the new team member."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="e.g. John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl><Input placeholder="e.g. Software Engineer" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl><Input placeholder="https://..." {...field} /></FormControl>
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
