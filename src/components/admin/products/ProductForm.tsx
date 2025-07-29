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

// Helper function to convert file to base64
const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const featureSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

const galleryItemSchema = z.object({
  srcBase64: z.string().min(1, "Image is required"),
  alt: z.string().min(1, "Alt text is required"),
  hint: z.string(),
});

const createFormSchema = (isEditing: boolean) =>
  z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    id: z
      .string()
      .min(3, "Slug/ID must be at least 3 characters")
      .refine((s) => !s.includes(" "), "Slug cannot contain spaces"),
    tagline: z.string().min(10, "Tagline is required"),
    description: z.string().min(20, "Description is required"),
    heroImageBase64: isEditing
      ? z.string().optional()
      : z.string().min(1, "Hero image is required"),
    features: z.array(featureSchema),
    gallery: z.array(
      z.object({
        srcBase64: isEditing
          ? z.string().optional()
          : z.string().min(1, "Image is required"),
        alt: z.string().min(1, "Alt text is required"),
        hint: z.string(),
      })
    ),
  });

type ProductFormValues = z.infer<ReturnType<typeof createFormSchema>>;

interface ProductFormProps {
  product?: Product;
}

export function ProductForm({ product }: ProductFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(createFormSchema(!!product)),
    defaultValues: product
      ? {
          name: product.name || "",
          id: product.id || "",
          tagline: product.tagline || "",
          description: product.description || "",
          heroImageBase64: product.heroImageBase64 || "",
          features: product.features.map((f) => ({
            title: f.title,
            description: f.description,
          })),
          gallery: product.gallery.map((g) => ({
            srcBase64: g.srcBase64 || "",
            alt: g.alt || "",
            hint: g.hint || "",
          })),
        }
      : {
          name: "",
          id: "",
          tagline: "",
          description: "",
          heroImageBase64: "",
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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Image file size must be less than 5MB",
        });
        return;
      }
      try {
        const base64 = await convertFileToBase64(file);
        form.setValue(fieldName as any, base64, { shouldValidate: true });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to process image",
        });
      }
    }
  };

  const onSubmit = async (values: ProductFormValues) => {
    try {
      const payload = {
        _id: product?._id,
        ...values,
        heroImageBase64: values.heroImageBase64 || product?.heroImageBase64 || "",
        gallery: values.gallery.map((item, index) => ({
          srcBase64: item.srcBase64 || product?.gallery[index]?.srcBase64 || "",
          alt: item.alt,
          hint: item.hint,
        })),
      };

      const result = product
        ? await updateProduct(payload).unwrap()
        : await addProduct(payload).unwrap();

      toast({
        title: `Product ${product ? "Updated" : "Created"}!`,
        description: `The product "${values.name}" has been saved successfully`,
      });
      router.push("/admin/products");
    } catch (error: any) {
      let errorMessage = "Something went wrong while saving the product";
      if (error?.data?.error) {
        errorMessage = error.data.error;
      } else if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (typeof error?.error === "string") {
        errorMessage = error.error;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {product ? "Edit Product" : "Create New Product"}
          </h1>
          <Button type="submit" disabled={isAdding || isUpdating}>
            {(isAdding || isUpdating) && (
              <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save {product ? "Changes" : "Product"}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Core details of the product</CardDescription>
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
              name="heroImageBase64"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Image</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "heroImageBase64")}
                        required={!product}
                      />
                      {field.value && (
                        <img
                          src={field.value}
                          alt="Hero image preview"
                          className="mt-2 h-32 w-32 object-cover rounded"
                        />
                      )}
                    </div>
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
              Showcase images of the product interface
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
                    name={`gallery.${index}.srcBase64`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileChange(e, `gallery.${index}.srcBase64`)
                              }
                              required={!product}
                            />
                            {field.value && (
                              <img
                                src={field.value}
                                alt="Gallery image preview"
                                className="mt-2 h-32 w-32 object-cover rounded"
                              />
                            )}
                          </div>
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
                            placeholder="e.g., dashboard analytics"
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
                  srcBase64: "",
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