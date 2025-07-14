
'use client';

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Loader2, Calendar as CalendarIcon, X } from "lucide-react";
import type { Job } from "@/app/(admin)/admin/careers/page";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  location: z.string().min(2, "Location is required."),
  type: z.enum(['Full-Time', 'Internship'], { required_error: "Job type is required." }),
  status: z.enum(['Open', 'Closed', 'Scheduled'], { required_error: "Status is required." }),
  description: z.string().min(10, "Description is required."),
  skills: z.array(z.string()).min(1, "At least one skill is required."),
  publishDate: z.date({ required_error: "A publish date is required."}),
});

type JobFormValues = z.infer<typeof formSchema>;

interface JobFormModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: any) => void;
  job: Job | null;
}

export function JobFormModal({ isOpen, onOpenChange, onSave, job }: JobFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const form = useForm<JobFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      type: "Full-Time",
      status: "Open",
      description: "",
      skills: [],
      publishDate: new Date(),
    },
  });

  useEffect(() => {
    if (job) {
      form.reset({
        title: job.title,
        location: job.location,
        type: job.type,
        status: job.status,
        description: job.description,
        skills: job.skills,
        publishDate: job.publishDate,
      });
    } else {
      form.reset({
        title: "",
        location: "",
        type: "Full-Time",
        status: "Open",
        description: "",
        skills: [],
        publishDate: new Date(),
      });
    }
  }, [job, form, isOpen]);
  
  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (newSkill && !form.getValues('skills').includes(newSkill)) {
        form.setValue('skills', [...form.getValues('skills'), newSkill]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    form.setValue('skills', form.getValues('skills').filter(skill => skill !== skillToRemove));
  };


  const onSubmit = (values: JobFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        const dataToSave = {
            ...values,
            id: job?.id,
            // In a real app, you might re-calculate this on the server
            status: values.publishDate > new Date() && values.status !== 'Closed' ? 'Scheduled' : values.status,
        };
        onSave(dataToSave);
        setIsSubmitting(false);
        onOpenChange(false);
    }, 1000)
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{job ? "Edit Job Opening" : "Add New Job Opening"}</DialogTitle>
              <DialogDescription>
                Fill out the details for the job posting. You can schedule it to be published in the future.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl><Input placeholder="e.g. Senior React Developer" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid grid-cols-2 gap-4">
                     <FormField control={form.control} name="location" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl><Input placeholder="e.g. Nashik, India" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="type" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-2 pt-2">
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl><RadioGroupItem value="Full-Time" /></FormControl>
                                        <FormLabel className="font-normal">Full-Time</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl><RadioGroupItem value="Internship" /></FormControl>
                                        <FormLabel className="font-normal">Internship</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                
                 <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl><Textarea placeholder="Describe the role and responsibilities..." {...field} rows={5}/></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="skills" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                     <FormControl>
                        <div>
                             <Input 
                                placeholder="Type a skill and press Enter"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={handleSkillKeyDown}
                             />
                            <div className="mt-2 flex flex-wrap gap-2">
                                {field.value.map((skill) => (
                                    <Badge key={skill} variant="secondary">
                                        {skill}
                                        <button type="button" onClick={() => removeSkill(skill)} className="ml-2 rounded-full p-0.5 hover:bg-destructive/20">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid grid-cols-2 gap-4">
                     <FormField control={form.control} name="publishDate" render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Publish Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                             <FormDescription>
                                The date this job will be visible to the public.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="status" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Open">Open</SelectItem>
                                    <SelectItem value="Closed">Closed</SelectItem>
                                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                'Scheduled' status will be auto-set if Publish Date is in the future.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
            </div>
            <DialogFooter className="pt-4 border-t">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Job
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

