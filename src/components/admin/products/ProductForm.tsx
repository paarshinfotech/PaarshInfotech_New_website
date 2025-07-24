"use client";

import { useForm, useFieldArray } from "react-hook-form";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { GoPlusCircle } from "react-icons/go";
import { ImSpinner2 } from "react-icons/im";
import { FaTrash } from "react-icons/fa";

import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/productsData";
import { useRouter } from "next/navigation";
import { useAddProductMutation, useUpdateProductMutation } from "@/services/api";

const featureSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

const galleryItemSchema = z.object({
  src: z.string().url("Must be a valid URL."),
  alt: z.string().min(1, "Alt text is required."),
  hint: z.string(),
});

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  id: z
    .string()
    .min(3, "Slug/ID must be at least 3 characters.")
    .refine((s) => !s.includes(" "), "Slug cannot contain spaces."),
  tagline: z.string().min(10, "Tagline is required."),
  description: z.string().min(20, "Description is required."),
  heroImage: z.string().url("Must be a valid URL."),
  features: z.array(featureSchema),
  gallery: z.array(galleryItemSchema),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  product?: Product;
}

export function ProductForm({ product }: ProductFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: product
      ? {
          ...product,
          features: product.features.map((f) => ({
            title: f.title,
            description: f.description,
          })),
        }
      : {
          name: "",
          id: "",
          tagline: "",
          description: "",
          heroImage: "https://placehold.co/1200x800.png",
          features: [],
          gallery: [],
        },
  });

  const {
    fields: featuresFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const {
    fields: galleryFields,
    append: appendGallery,
    remove: removeGallery,
  } = useFieldArray({
    control: form.control,
    name: "gallery",
  });

  const [_ADDPRODUCT] = useAddProductMutation();
  const [_EDITPRODUCT] = useUpdateProductMutation();

  const onSubmit = async (values: ProductFormValues) => {
    
    if (product) {
     const result = await _EDITPRODUCT({ _id: product._id , ...values }).unwrap();
    } else {
      const result = await _ADDPRODUCT(values).unwrap();
    }

    toast({
      title: `Product ${product ? "Updated" : "Created"}!`,
      description: `The product "${values.name}" has been saved successfully.`,
    });
    router.push("/admin/products");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {product ? "Edit Product" : "Create New Product"}
          </h1>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save {product ? "Changes" : "Product"}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Core details of the product.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug / ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., paarsh-crm"
                      disabled={!!product}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tagline</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="heroImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>
              Detail the key features of this product. Icons will be assigned
              automatically.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {featuresFields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-4 items-start p-4 border rounded-md relative"
              >
                <div className="grid gap-2 flex-1">
                  <FormField
                    control={form.control}
                    name={`features.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feature Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`features.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feature Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeFeature(index)}
                >
                  <FaTrash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => appendFeature({ title: "", description: "" })}
            >
              <GoPlusCircle className="mr-2 h-4 w-4" /> Add Feature
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Gallery</CardTitle>
            <CardDescription>
              Showcase images of the product interface.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {galleryFields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-4 items-start p-4 border rounded-md relative"
              >
                <div className="grid gap-2 flex-1">
                  <FormField
                    control={form.control}
                    name={`gallery.${index}.src`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`gallery.${index}.alt`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alt Text</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`gallery.${index}.hint`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>AI Hint</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g. dashboard analytics"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeGallery(index)}
                >
                  <FaTrash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendGallery({
                  src: "https://placehold.co/800x600.png",
                  alt: "",
                  hint: "",
                })
              }
            >
              <GoPlusCircle className="mr-2 h-4 w-4" /> Add Gallery Image
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
