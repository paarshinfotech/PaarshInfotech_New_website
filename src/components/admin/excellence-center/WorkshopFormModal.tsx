"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { IoClose } from "react-icons/io5";

const formSchema = z.object({
  title: z.string().min(3, "Title is required."),
  date: z.string().min(1, "Date is required."),
  location: z.string().min(3, "Location is required."),
  presenter: z.string().min(2, "Presenter name is required."),
  description: z.string().optional(),
  topics: z.array(z.string()).optional(),
  status: z.enum(["Upcoming", "Completed", "Cancelled"]),
});

interface WorkshopFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: any) => void;
  workshop: any | null;
}

export function WorkshopFormModal({ isOpen, onOpenChange, onSave, workshop }: WorkshopFormModalProps) {
  const { toast } = useToast();
  const [topicInput, setTopicInput] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { 
        title: "", 
        date: "", 
        location: "",
        presenter: "", 
        description: "",
        topics: [],
        status: "Upcoming"
    },
  });

  useEffect(() => {
    if (workshop) {
      form.reset({
        ...workshop,
        date: new Date(workshop.date).toISOString().split('T')[0], // Format date for input
      });
    } else {
      form.reset({
        title: "",
        date: "",
        location: "",
        presenter: "",
        description: "",
        topics: [],
        status: "Upcoming"
      });
    }
  }, [workshop, form]);

  const handleTopicKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTopic = topicInput.trim();
      const currentTopics = form.getValues('topics') || [];
      if (newTopic && !currentTopics.includes(newTopic)) {
        form.setValue('topics', [...currentTopics, newTopic]);
      }
      setTopicInput('');
    }
  };

  const removeTopic = (topicToRemove: string) => {
    const currentTopics = form.getValues('topics') || [];
    form.setValue('topics', currentTopics.filter(topic => topic !== topicToRemove));
  };


  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{workshop ? "Edit Workshop" : "Add Workshop"}</DialogTitle>
          <DialogDescription>
            {workshop ? "Update the details of this workshop." : "Add a new workshop or event."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl><Input type="date" {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Upcoming">Upcoming</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
            </div>
             <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl><Input {...field} placeholder="e.g., Online or College Name" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="presenter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Presenter / Speaker</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="topics"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Topics Covered</FormLabel>
                    <FormControl>
                    <div>
                        <Input
                        placeholder="Type a topic and press Enter"
                        value={topicInput}
                        onChange={(e) => setTopicInput(e.target.value)}
                        onKeyDown={handleTopicKeyDown}
                        />
                        <div className="mt-2 flex flex-wrap gap-2">
                        {field.value?.map((topic) => (
                            <Badge key={topic} variant="secondary">
                            {topic}
                            <button
                                type="button"
                                onClick={() => removeTopic(topic)}
                                className="ml-2 rounded-full p-0.5 hover:bg-destructive/20"
                            >
                                <IoClose className="h-3 w-3" />
                            </button>
                            </Badge>
                        ))}
                        </div>
                    </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">{workshop ? "Update" : "Add"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
