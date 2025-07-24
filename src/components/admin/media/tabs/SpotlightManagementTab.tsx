'use client';

import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImSpinner2 } from "react-icons/im";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useGetMediaItemsQuery, useAddMediaItemMutation, useUpdateMediaItemMutation } from '@/services/api';

interface SpotlightManagementTabProps {
    item: any;
    setItem: React.Dispatch<React.SetStateAction<any>>;
}

const formSchema = z.object({
  name: z.string().min(2, "Name is required."),
  role: z.string().min(2, "Role is required."),
  quote: z.string().min(10, "Quote is required."),
  hint: z.string().min(2, "AI hint is required."),
  avatarFile: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function SpotlightManagementTab({ item: propItem, setItem: setPropItem }: SpotlightManagementTabProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // RTK Query hooks
    const { data: spotlightData } = useGetMediaItemsQuery('spotlight');
    const [addMediaItem] = useAddMediaItemMutation();
    const [updateMediaItem] = useUpdateMediaItemMutation();

    // Update local state when RTK query data changes
    useEffect(() => {
        if (spotlightData?.[0]) {
            setPropItem(spotlightData[0]);
        }
    }, [spotlightData, setPropItem]);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: propItem?.employeeName || '',
            role: propItem?.position || '',
            quote: propItem?.quote || '',
            hint: propItem?.hint || '',
        },
    });

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const onSubmit = async (values: FormValues) => {
        try {
            setIsSubmitting(true);

            let imageBase64: string | undefined;
            if (values.avatarFile?.[0]) {
                imageBase64 = await convertToBase64(values.avatarFile[0]);
            }

            const formData = {
                type: 'spotlight',
                title: values.name,
                description: values.quote,
                employeeName: values.name,
                position: values.role,
                quote: values.quote,
                hint: values.hint,
                published: true,
            };

            if (propItem?._id) {
                // Update existing spotlight
                await updateMediaItem({
                    _id: propItem._id,
                    ...formData,
                    ...(imageBase64 ? { imageBase64 } : {})
                }).unwrap();
            } else {
                // Add new spotlight
                if (!imageBase64) {
                    throw new Error('Employee photo is required');
                }
                await addMediaItem({
                    ...formData,
                    imageBase64
                }).unwrap();
            }

            toast({
                title: "Success",
                description: "Employee spotlight has been updated successfully.",
            });
        } catch (error) {
            console.error('Failed to save spotlight:', error);
            toast({
                title: "Error",
                description: "Failed to save employee spotlight.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
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
                                        {propItem?.imageUrl && (
                                            <Image 
                                                src={propItem.imageUrl} 
                                                alt={propItem.employeeName} 
                                                width={200} 
                                                height={200} 
                                                className="rounded-lg object-cover" 
                                            />
                                        )}
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
