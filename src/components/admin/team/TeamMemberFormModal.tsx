
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
  avatar: z.any().optional(),
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
    },
  });

  useEffect(() => {
    if (member) {
      form.reset({
        name: member.name,
        role: member.role,
        avatar: null, // Reset file input
      });
    } else {
      form.reset({ name: "", role: "", avatar: null });
    }
  }, [member, form, isOpen]);

  const onSubmit = (values: MemberFormValues) => {
    setIsSubmitting(true);
    // In a real app, you would handle file upload to a storage service (e.g., Firebase Storage)
    // and get back a URL. For this simulation, we'll use a placeholder if a new file is selected.
    setTimeout(() => {
        const newAvatarUrl = values.avatar && values.avatar.length > 0
            ? "https://placehold.co/40x40.png" // Placeholder for new upload
            : member?.avatar; // Keep old avatar if no new one is uploaded

        const dataToSave = {
            name: values.name,
            role: values.role,
            id: member?.id || Date.now(),
            avatar: newAvatarUrl || "https://placehold.co/40x40.png"
        };
        onSave(dataToSave as TeamMember);
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
                    <FormLabel>Avatar</FormLabel>
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
