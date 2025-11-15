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
import { Switch } from "@/components/ui/switch";

interface TeamCategory {
  _id?: string;
  name: string;
  allowMultiple: boolean;
}

const formSchema = z.object({
  name: z.string().min(2, "Category name is required."),
  allowMultiple: z.boolean().default(false),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: CategoryFormValues & { _id?: string }) => void;
  category: TeamCategory | null;
}

export function CategoryFormModal({
  isOpen,
  onOpenChange,
  onSave,
  category,
}: CategoryFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      allowMultiple: false,
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        allowMultiple: category.allowMultiple,
      });
    } else {
      form.reset({ name: "", allowMultiple: false });
    }
  }, [category, form, isOpen]);

  const onSubmit = (values: CategoryFormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const dataToSave = {
        ...values,
        _id: category?._id,
      };
      onSave(dataToSave);
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {category ? "Edit Category" : "Add New Category"}
              </DialogTitle>
              <DialogDescription>
                {category
                  ? "Update the details for this category."
                  : "Enter the details for the new category."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Lead Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allowMultiple"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Allow Multiple Members</FormLabel>
                      <p className="text-[0.8rem] text-muted-foreground">
                        Can more than one team member be assigned to this
                        category?
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
