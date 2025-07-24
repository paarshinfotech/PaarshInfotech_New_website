"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { useUpdateSiteImageMutation } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { LuUpload } from 'react-icons/lu';
import { ImSpinner2 } from 'react-icons/im';
import { cn } from '@/lib/utils';

interface ImageUploadCardProps {
  title: string;
  description: string;
  imageData: {
    section: string;
    alt: string;
    imageUrl: string;
    hint?: string;
  };
  aspectRatio?: string;
}

const formSchema = z.object({
  alt: z.string().min(1, 'Alt text is required.'),
  hint: z.string().optional(),
  imageFile: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ImageUploadCard({ title, description, imageData, aspectRatio = 'aspect-video' }: ImageUploadCardProps) {
  const { toast } = useToast();
  const [updateSiteImage, { isLoading }] = useUpdateSiteImageMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(imageData.imageUrl);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alt: imageData.alt,
      hint: imageData.hint || '',
      imageFile: null,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (!values.imageFile || values.imageFile.length === 0) {
      toast({
        title: 'No Image Selected',
        description: 'Please select an image file to upload.',
        variant: 'destructive',
      });
      return;
    }

    const payload = {
      section: imageData.section,
      alt: values.alt,
      hint: values.hint,
      imageUrl: imagePreview, // The base64 string from preview
    };

    try {
      await updateSiteImage(payload).unwrap();
      toast({
        title: 'Image Updated',
        description: `${title} has been updated successfully.`,
      });
      form.reset({ ...values, imageFile: null }); // Clear file input after submission
    } catch (err) {
      toast({
        title: 'Update Failed',
        description: 'There was an error updating the image.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={cn('relative w-full rounded-md overflow-hidden bg-muted/30 border', aspectRatio)}>
              {imagePreview && <Image src={imagePreview} alt={form.watch('alt')} fill className="object-cover" />}
            </div>
            <FormField
              control={form.control}
              name="imageFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Image File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        handleFileChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alt Text</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Hint</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LuUpload className="mr-2 h-4 w-4" />
              )}
              Update Image
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
