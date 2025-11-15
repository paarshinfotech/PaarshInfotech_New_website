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
import { ImSpinner2 } from "react-icons/im";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface TeamMember {
  _id?: string;
  name: string;
  categoryId: string;
  avatar: string;
  published: boolean;
}

interface TeamCategory {
  _id: string;
  name: string;
  allowMultiple: boolean;
}

const formSchema = z.object({
  name: z.string().min(2, "Name is required."),
  categoryId: z.string({ required_error: "Please select a category." }),
  avatar: z.any().optional(),
  published: z.boolean().optional(),
});

type MemberFormValues = z.infer<typeof formSchema>;

interface TeamMemberFormModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: MemberFormValues & { _id?: string }) => void;
  member: TeamMember | null;
  categories: TeamCategory[];
  teamMembers: TeamMember[];
}

export function TeamMemberFormModal({
  isOpen,
  onOpenChange,
  onSave,
  member,
  categories,
  teamMembers,
}: TeamMemberFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categoryId: undefined,
      avatar: null,
      published: true,
    },
  });

  useEffect(() => {
    if (member) {
      form.reset({
        name: member.name,
        categoryId: member.categoryId,
        avatar: null,
        published: member.published,
      });
    } else {
      form.reset({ name: "", categoryId: undefined, avatar: null, published: true });
    }
  }, [member, form, isOpen]);

  const isCategoryFilled = (categoryId: string) => {
    const category = categories.find((c) => c._id === categoryId);
    if (!category || category.allowMultiple) {
      return false; // Category allows multiple members or doesn't exist
    }
    // Check if another member already has this category
    return teamMembers.some(
      (m) => m.categoryId === categoryId && m._id !== member?._id
    );
  };

  // Helper function to convert file to base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (values: MemberFormValues) => {
    setIsSubmitting(true);
    try {
      let newAvatarUrl = member?.avatar || "https://placehold.co/40x40.png";
      
      // Check if a new avatar file was selected
      if (values.avatar && values.avatar.length > 0) {
        const file = values.avatar[0];
        try {
          // Convert the selected file to base64
          newAvatarUrl = await convertToBase64(file);
        } catch (error) {
          console.error("Error converting image to base64:", error);
          // Fallback to placeholder if conversion fails
          newAvatarUrl = "https://placehold.co/40x40.png";
        }
      }

      const dataToSave = {
        ...values,
        _id: member?._id,
        avatar: newAvatarUrl,
        published: values.published ?? member?.published ?? true,
      };
      
      await onSave(dataToSave);
    } finally {
      setIsSubmitting(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {member ? "Edit Team Member" : "Add New Team Member"}
              </DialogTitle>
              <DialogDescription>
                {member
                  ? "Update the details for this team member."
                  : "Enter the details for the new team member."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. John Doe" {...field} />
                    </FormControl>
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role / category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem
                            key={cat._id}
                            value={cat._id}
                            disabled={isCategoryFilled(cat._id)}
                          >
                            {cat.name} {isCategoryFilled(cat._id) && "(Filled)"}
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
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Published</FormLabel>
                      <p className="text-[0.8rem] text-muted-foreground">
                        Make this team member visible on the site.
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
                  <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
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