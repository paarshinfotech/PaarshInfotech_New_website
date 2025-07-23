"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
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
import { LuLoader, LuTrash2 } from "react-icons/lu";

import { useToast } from "@/hooks/use-toast";
import type { Service } from "@/lib/servicesData";
import { useRouter } from "next/navigation";

const offeringSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  slug: z.string().min(3, "Slug must be at least 3 characters."),
  description: z.string().min(10, "Short description is required."),
  overview: z.string().min(20, "Overview is required."),
  heroImage: z.string().url("Must be a valid URL."),
  offerings: z.array(offeringSchema),
  techStack: z.object({
    frontend: z.string(),
    backend: z.string(),
    database: z.string(),
    tools: z.string(),
  }),
  testimonial: z.object({
    quote: z.string().min(10, "Quote is required."),
    name: z.string().min(2, "Name is required."),
    role: z.string().min(2, "Role is required."),
    avatar: z.string().url("Must be a valid URL."),
  }),
  gallery: z.array(
    z.object({
      src: z.string().url("Must be a valid URL."),
      alt: z.string().min(1, "Alt text is required."),
      dataAiHint: z.string(),
    })
  ),
  industries: z.string(),
});

type ServiceFormValues = z.infer<typeof formSchema>;

interface ServiceFormProps {
  service?: Service;
}

export function ServiceForm({ service }: ServiceFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: service
      ? {
          ...service,
          techStack: {
            frontend: service.techStack.frontend.join(", "),
            backend: service.techStack.backend.join(", "),
            database: service.techStack.database.join(", "),
            tools: service.techStack.tools.join(", "),
          },
          industries: service.industries.join(", "),
        }
      : {
          title: "",
          slug: "",
          description: "",
          overview: "",
          heroImage: "https://placehold.co/600x400.png",
          offerings: [],
          techStack: { frontend: "", backend: "", database: "", tools: "" },
          testimonial: {
            quote: "",
            name: "",
            role: "",
            avatar: "https://placehold.co/100x100.png",
          },
          gallery: [],
          industries: "",
        },
  });

  const {
    fields: offeringsFields,
    append: appendOffering,
    remove: removeOffering,
  } = useFieldArray({
    control: form.control,
    name: "offerings",
  });

  const {
    fields: galleryFields,
    append: appendGallery,
    remove: removeGallery,
  } = useFieldArray({
    control: form.control,
    name: "gallery",
  });

  const onSubmit = (values: ServiceFormValues) => {
    console.log("Form Submitted:", values);
    toast({
      title: `Service ${service ? "Updated" : "Created"}!`,
      description: `The service "${values.title}" has been saved successfully.`,
    });
    // In a real app, you would API call here, then redirect.
    router.push("/admin/services");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {service ? "Edit Service" : "Create New Service"}
          </h1>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <LuLoader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save {service ? "Changes" : "Service"}
          </Button>
        </div>

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Core details of the service.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., web-development" />
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
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overview</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} />
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

        {/* Offerings */}
        <Card>
          <CardHeader>
            <CardTitle>Service Offerings</CardTitle>
            <CardDescription>
              Detail what this service includes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {offeringsFields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-4 items-start p-4 border rounded-md relative"
              >
                <div className="grid gap-2 flex-1">
                  <FormField
                    control={form.control}
                    name={`offerings.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Offering Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`offerings.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Offering Description</FormLabel>
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
                  onClick={() => removeOffering(index)}
                >
                  <LuTrash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => appendOffering({ title: "", description: "" })}
            >
              <GoPlusCircle className="mr-2 h-4 w-4" /> Add Offering
            </Button>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
            <CardDescription>
              Enter technologies as comma-separated values.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="techStack.frontend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frontend</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="React, Next.js, TypeScript"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="techStack.backend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Backend</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Node.js, Python, Django" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="techStack.database"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Database</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="PostgreSQL, MongoDB" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="techStack.tools"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tools</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Docker, Git, Webpack" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Testimonial */}
        <Card>
          <CardHeader>
            <CardTitle>Client Testimonial</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="testimonial.quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quote</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="testimonial.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="testimonial.role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Role</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="testimonial.avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Avatar URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Gallery */}
        <Card>
          <CardHeader>
            <CardTitle>Project Gallery</CardTitle>
            <CardDescription>
              Showcase images of projects related to this service.
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
                    name={`gallery.${index}.dataAiHint`}
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
                  <LuTrash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendGallery({
                  src: "https://placehold.co/600x400.png",
                  alt: "",
                  dataAiHint: "",
                })
              }
            >
              <GoPlusCircle className="mr-2 h-4 w-4" /> Add Gallery Image
            </Button>
          </CardContent>
        </Card>

        {/* Industries */}
        <Card>
          <CardHeader>
            <CardTitle>Industries Served</CardTitle>
            <CardDescription>
              Enter industries as comma-separated values.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="industries"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industries</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="E-commerce, Healthcare, Education"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
