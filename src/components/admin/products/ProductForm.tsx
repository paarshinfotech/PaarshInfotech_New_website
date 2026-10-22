
"use client";

import { useState } from "react";
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
import { LuVideo, LuImage } from "react-icons/lu";
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

const createFormSchema = (isEditing: boolean) =>
  z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    id: z
      .string()
      .optional()
      .refine((s) => !s || !s.includes(" "), "Slug cannot contain spaces"),
    tagline: z.string().min(10, "Tagline is required"),
    description: z.string().min(20, "Description is required"),
    heroImageBase64: isEditing
      ? z.string().optional()
      : z.string().min(1, "Hero image is required"),
    videoUrl: z.string().optional(),
    videoThumbnail: z.string().optional(),
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
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const [isThumbnailUploading, setIsThumbnailUploading] = useState(false);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [videoUploadStatus, setVideoUploadStatus] = useState("");

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(createFormSchema(!!product)),
    defaultValues: product
      ? {
          name: product.name || "",
          id: product.id || (product.name ? product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : ""),
          tagline: product.tagline || "",
          description: product.description || "",
          heroImageBase64: product.heroImageBase64 || "",
          videoUrl: product.videoUrl || "",
          videoThumbnail: product.videoThumbnail || "",
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
          videoUrl: "",
          videoThumbnail: "",
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
      if (file.size > 10 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Image file size must be less than 10MB",
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

  const handleVideoFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSizeBytes = 500 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      toast({
        variant: "destructive",
        title: "Video Too Large",
        description: "Video size must be under 500MB.",
      });
      return;
    }

    const totalMb = (file.size / (1024 * 1024)).toFixed(1);

    try {
      setIsVideoUploading(true);
      setVideoUploadProgress(0);
      setVideoUploadStatus(`Preparing upload of ${file.name} (${totalMb} MB)...`);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", "products-video");

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/upload");

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            const loadedMb = (e.loaded / (1024 * 1024)).toFixed(1);
            setVideoUploadProgress(percent);
            setVideoUploadStatus(`Uploading: ${percent}% (${loadedMb} MB / ${totalMb} MB)...`);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const res = JSON.parse(xhr.responseText);
              if (res.success && res.data?.url) {
                form.setValue("videoUrl", res.data.url, { shouldValidate: true, shouldDirty: true });
                toast({
                  title: "Video Uploaded Successfully",
                  description: `Uploaded ${file.name} (${totalMb} MB)`,
                });
                resolve();
              } else {
                reject(new Error(res.error || "Failed to process uploaded file"));
              }
            } catch (err) {
              reject(err);
            }
          } else {
            let errorMsg = `Server error: status ${xhr.status}`;
            try {
              const errJson = JSON.parse(xhr.responseText);
              if (errJson.error) errorMsg = errJson.error;
            } catch {}
            reject(new Error(errorMsg));
          }
        };

        xhr.onerror = () => reject(new Error("Network connection error during video upload."));
        xhr.ontimeout = () => reject(new Error("Video upload timed out."));
        xhr.timeout = 15 * 60 * 1000;
        xhr.send(formData);
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message || "Failed to upload video",
      });
    } finally {
      setIsVideoUploading(false);
      setVideoUploadProgress(0);
      setVideoUploadStatus("");
      event.target.value = "";
    }
  };

  const handleThumbnailFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Thumbnail image size must be less than 10MB",
      });
      return;
    }

    try {
      setIsThumbnailUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", "products-thumbnail");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || "Failed to upload thumbnail photo");
      }

      form.setValue("videoThumbnail", result.data.url, { shouldValidate: true, shouldDirty: true });
      toast({
        title: "Photo Uploaded",
        description: "Video thumbnail photo uploaded successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message || "Failed to upload photo",
      });
    } finally {
      setIsThumbnailUploading(false);
      event.target.value = "";
    }
  };

  const onSubmit = async (values: ProductFormValues) => {
    try {
      const slug = values.id?.trim() || values.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const payload: any = {
        _id: product?._id,
        id: slug,
        name: values.name,
        tagline: values.tagline,
        description: values.description,
        features: values.features,
      };

      // Handle heroImageBase64
      if (values.heroImageBase64) {
        if (values.heroImageBase64.startsWith('data:image') || values.heroImageBase64 !== product?.heroImageBase64) {
          payload.heroImageBase64 = values.heroImageBase64;
        }
      }

      // Handle videoUrl and videoThumbnail
      if (values.videoUrl !== undefined) payload.videoUrl = values.videoUrl;
      if (values.videoThumbnail !== undefined) payload.videoThumbnail = values.videoThumbnail;

      // Handle gallery images
      payload.gallery = values.gallery.map((item, index) => {
        const newItem: any = { alt: item.alt, hint: item.hint };
        if (item.srcBase64?.startsWith('data:image')) {
          newItem.srcBase64 = item.srcBase64;
        } else if (product?.gallery[index]?.src) {
          newItem.src = product.gallery[index].src;
        }
        return newItem;
      });

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
      if (error?.data?.error) errorMessage = error.data.error;
      else if (error?.data?.message) errorMessage = error.data.message;
      else if (typeof error?.error === "string") errorMessage = error.error;
      else if (error?.message) errorMessage = error.message;

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
          <Button
            type="submit"
            disabled={isAdding || isUpdating || isVideoUploading || isThumbnailUploading}
          >
            {(isAdding || isUpdating || isVideoUploading || isThumbnailUploading) && (
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
                  <FormLabel>Hero Image (Product Main Photo)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "heroImageBase64")}
                      />
                      {field.value && (
                        <div className="relative inline-block mt-2">
                          <img
                            src={field.value}
                            alt="Hero image preview"
                            className="h-32 w-32 object-cover rounded border shadow-sm"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => form.setValue("heroImageBase64", "", { shouldDirty: true })}
                            className="mt-1 h-7 text-xs"
                          >
                            <FaTrash className="mr-1 h-3 w-3" /> Clear Image
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Video & Thumbnail Section */}
            <div className="pt-5 border-t space-y-5">
              <div>
                <h3 className="text-base font-semibold flex items-center gap-2 text-foreground">
                  <LuVideo className="h-5 w-5 text-primary" />
                  Product Action Video &amp; Preview Photo
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Upload demo video (up to 500MB) and a cover photo shown under &quot;See Our Products in Action&quot;.
                </p>
              </div>

              {/* Video Upload */}
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold flex items-center gap-2">
                      Upload Product Demo Video
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Input
                          type="file"
                          accept="video/*,.mp4,.webm,.ogg,.mov"
                          onChange={handleVideoFileChange}
                          disabled={isVideoUploading}
                        />

                        {isVideoUploading && (
                          <div className="space-y-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-between text-xs font-semibold text-primary">
                              <span className="flex items-center gap-1.5">
                                <ImSpinner2 className="h-3.5 w-3.5 animate-spin" />
                                {videoUploadStatus || "Uploading video file..."}
                              </span>
                              <span>{videoUploadProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                              <div
                                className="bg-primary h-2.5 rounded-full transition-all duration-150"
                                style={{ width: `${videoUploadProgress}%` }}
                              />
                            </div>
                            <p className="text-[11px] text-muted-foreground">
                              Please keep this tab open until upload completes.
                            </p>
                          </div>
                        )}

                        {field.value && (
                          <div className="space-y-2 pt-1">
                            <div className="relative aspect-video max-w-md rounded-lg overflow-hidden bg-black border shadow-md">
                              <video
                                key={field.value}
                                src={field.value}
                                controls
                                preload="metadata"
                                className="w-full h-full object-contain"
                              >
                                Your browser does not support the video tag.
                              </video>
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => form.setValue("videoUrl", "", { shouldDirty: true })}
                              className="h-8 text-xs"
                            >
                              <FaTrash className="mr-1.5 h-3 w-3" /> Remove Video
                            </Button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Thumbnail Upload */}
              <FormField
                control={form.control}
                name="videoThumbnail"
                render={({ field }) => (
                  <FormItem className="pt-3 border-t">
                    <FormLabel className="text-sm font-semibold flex items-center gap-2">
                      <LuImage className="h-4 w-4 text-primary" />
                      Upload Video Cover Photo (Thumbnail)
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailFileChange}
                          disabled={isThumbnailUploading}
                        />
                        {isThumbnailUploading && (
                          <div className="flex items-center gap-2 text-sm text-primary font-medium py-1">
                            <ImSpinner2 className="h-4 w-4 animate-spin" />
                            <span>Uploading cover photo, please wait...</span>
                          </div>
                        )}
                        {field.value && (
                          <div className="space-y-2 pt-1">
                            <div className="relative aspect-video max-w-sm rounded-lg overflow-hidden border shadow-sm bg-black">
                              <img
                                src={field.value}
                                alt="Video Thumbnail Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => form.setValue("videoThumbnail", "", { shouldDirty: true })}
                              className="h-8 text-xs"
                            >
                              <FaTrash className="mr-1.5 h-3 w-3" /> Remove Photo
                            </Button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>
              Detail the key features of this product. Icons will be assigned automatically.
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
            <CardDescription>Showcase images of the product interface</CardDescription>
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
                    render={({ field: imageField }) => (
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
                            />
                            {imageField.value && (
                              <img
                                src={imageField.value}
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
