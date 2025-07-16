
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
import { TeamMember, TeamCategory } from "@/lib/teamData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Name is required."),
  categoryId: z.string({ required_error: "Please select a category."}),
  avatar: z.any().optional(),
});

type MemberFormValues = z.infer<typeof formSchema>;

interface TeamMemberFormModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: any) => void;
  member: TeamMember | null;
  categories: TeamCategory[];
  teamMembers: TeamMember[];
}

export function TeamMemberFormModal({ isOpen, onOpenChange, onSave, member, categories, teamMembers }: TeamMemberFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (member) {
      form.reset({
        name: member.name,
        categoryId: String(member.categoryId),
        avatar: null,
      });
    } else {
      form.reset({ name: "", categoryId: undefined, avatar: null });
    }
  }, [member, form, isOpen]);

  const isCategoryFilled = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category || category.allowMultiple) {
      return false; // Category allows multiple members or doesn't exist
    }
    // Check if another member already has this category
    return teamMembers.some(m => m.categoryId === categoryId && m.id !== member?.id);
  };

  const onSubmit = (values: MemberFormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
        const newAvatarUrl = values.avatar && values.avatar.length > 0
            ? "https://placehold.co/40x40.png"
            : member?.avatar;

        const dataToSave = {
            ...values,
            id: member?.id,
            avatar: newAvatarUrl || "https://placehold.co/40x40.png"
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
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role / category" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {categories.map(cat => (
                                <SelectItem key={cat.id} value={String(cat.id)} disabled={isCategoryFilled(cat.id)}>
                                    {cat.name} {isCategoryFilled(cat.id) && "(Filled)"}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
