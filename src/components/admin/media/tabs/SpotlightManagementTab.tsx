'use client';

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImSpinner2 } from "react-icons/im";
import Image from "next/image";
import type { EmployeeSpotlightItem } from '@/lib/mediaData';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface SpotlightManagementTabProps {
    item: EmployeeSpotlightItem;
    setItem: React.Dispatch<React.SetStateAction<EmployeeSpotlightItem>>;
}

const formSchema = z.object({
  name: z.string().min(2, "Name is required."),
  role: z.string().min(2, "Role is required."),
  quote: z.string().min(10, "Quote is required."),
  hint: z.string().min(2, "AI hint is required."),
  avatarFile: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function SpotlightManagementTab({ item, setItem }: SpotlightManagementTabProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: item.name,
            role: item.role,
            quote: item.quote,
            hint: item.hint,
        },
    });

    const onSubmit = (values: FormValues) => {
        setIsSubmitting(true);
        setTimeout(() => {
            const newAvatarUrl = values.avatarFile && values.avatarFile.length > 0
                ? "https://placehold.co/400x400.png"
                : item.avatar;
            
            const updatedItem = {
                ...item,
                ...values,
                avatar: newAvatarUrl,
            };
            
            setItem(updatedItem);
            
            toast({
                title: "Success",
                description: "Employee spotlight has been updated successfully.",
            });

            setIsSubmitting(false);
        }, 1000);
    };
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Employee Spotlight</CardTitle>
                        <CardDescription>Manage the featured employee on the Media page.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-1 space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Employee Photo</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col items-center gap-4">
                                        <Image src={item.avatar} alt={item.name} width={200} height={200} className="rounded-lg object-cover" />
                                        <FormField control={form.control} name="avatarFile" render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="sr-only">Avatar</FormLabel>
                                                <FormControl><Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="md:col-span-2 space-y-4">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="role" render={({ field }) => (
                                    <FormItem><FormLabel>Role</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="quote" render={({ field }) => (
                                    <FormItem><FormLabel>Quote</FormLabel><FormControl><Textarea {...field} rows={4} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="hint" render={({ field }) => (
                                    <FormItem><FormLabel>AI Hint for Photo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )} />

                                 <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}
