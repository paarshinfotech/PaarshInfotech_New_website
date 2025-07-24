
"use client";

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ImSpinner2 } from 'react-icons/im';

interface SiteImage {
  _id?: string;
  page: string;
  section: string;
  alt: string;
  imageUrl: string;
  hint: string;
}

const formSchema = z.object({
  section: z.string().min(3, 'Section identifier is required (e.g., hero_banner).'),
  alt: z.string().min(1, 'Alt text is required.'),
  hint: z.string().optional(),
  imageFile: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ImageFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: FormValues) => Promise<void>;
  image: SiteImage | null;
  page: string;
}

export function ImageFormModal({ isOpen, onOpenChange, onSave, image, page }: ImageFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      section: '',
      alt: '',
      hint: '',
    },
  });

  useEffect(() => {
    if (image) {
      form.reset({
        section: image.section,
        alt: image.alt,
        hint: image.hint || '',
      });
      setPreview(image.imageUrl);
    } else {
      form.reset({
        section: `${page}_`,
        alt: '',
        hint: '',
      });
      setPreview(null);
    }
  }, [image, page, form, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    form.setValue('imageFile', e.target.files);
  };
  
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    const file = values.imageFile?.[0];

    if (!file && !image) {
      form.setError('imageFile', { message: 'An image is required.' });
      setIsSubmitting(false);
      return;
    }

    try {
        let imageUrl = image?.imageUrl;
        if(file) {
            imageUrl = await convertToBase64(file);
        }
      
      await onSave({ ...values, imageUrl });
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{image ? 'Edit Image' : 'Add New Image'}</DialogTitle>
          <DialogDescription>
            {image ? `Update the details for the ${image.section} image.` : `Upload a new image for the ${page} page.`}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {preview && (
              <div className="relative aspect-video w-full rounded-md overflow-hidden bg-muted/30 border">
                <Image src={preview} alt="Image preview" fill className="object-cover" />
              </div>
            )}
            <FormField
              control={form.control}
              name="imageFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Identifier</FormLabel>
                  <FormControl><Input {...field} disabled={!!image} placeholder="e.g., home_hero_banner" /></FormControl>
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
                  <FormControl><Input {...field} placeholder="Descriptive alt text for accessibility" /></FormControl>
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
                  <FormControl><Input {...field} placeholder="e.g., team collaboration" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
