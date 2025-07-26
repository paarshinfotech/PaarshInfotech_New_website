
"use client";

import { useForm, useFieldArray } from "react-hook-form";
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
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { GoPlusCircle } from "react-icons/go";
import { LuLoader } from "react-icons/lu";
import { useToast } from "@/hooks/use-toast";
import { Service } from "@/lib/servicesData";
import { useRouter } from "next/navigation";
import { useAddServiceMutation, useUpdateServiceMutation } from "@/services/api";
import { FaTrash } from "react-icons/fa";
import { iconMap, iconOptions } from "@/lib/iconsMap";
import React from "react";
import { Switch } from "@/components/ui/switch";
import Select from "react-select";

// Helper function to convert file to base64
const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Options for techStack and industries (can be extended based on your needs)
const techOptions = {
  frontend: [
    { value: "React", label: "React" },
    { value: "Next.js", label: "Next.js" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "Tailwind CSS", label: "Tailwind CSS" },
    { value: "Vue.js", label: "Vue.js" },
  ],
  backend: [
    { value: "Node.js", label: "Node.js" },
    { value: "Python", label: "Python" },
    { value: "Django", label: "Django" },
    { value: "Express", label: "Express" },
  ],
  database: [
    { value: "PostgreSQL", label: "PostgreSQL" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "MySQL", label: "MySQL" },
  ],
  tools: [
    { value: "Docker", label: "Docker" },
    { value: "Git", label: "Git" },
    { value: "Webpack", label: "Webpack" },
    { value: "Jenkins", label: "Jenkins" },
  ],
};

const industryOptions = [
  { value: "E-commerce", label: "E-commerce" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Education", label: "Education" },
  { value: "Finance", label: "Finance" },
  { value: "Technology", label: "Technology" },
];

interface ServiceFormValues {
  title: string;
  slug: string;
  description: string;
  overview: string;
  heroImageBase64: string;
  Icon: string | null;
  offerings: Array<{ title: string; description: string; Icon: string | null }>;
  whyChooseUs: Array<{ title: string; description: string; Icon: string | null }>;
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    tools: string[];
  };
  process: Array<{ title: string; description: string; Icon: string | null }>;
  impact: Array<{ title: string; metric: string; description: string; Icon: string | null }>;
  testimonial: {
    quote: string;
    name: string;
    role: string;
    avatarBase64: string;
  };
  gallery: Array<{ srcBase64: string; alt: string; dataAiHint: string }>;
  industries: string[];
  published: boolean;
}

interface ServiceFormProps {
  service?: Service;
}

interface ServiceResponse {
  success: boolean;
  message: string;
  data: Service;
}

export function ServiceForm({ service }: ServiceFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [addService, { isLoading: isAdding }] = useAddServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const form = useForm<ServiceFormValues>({
    defaultValues: service
      ? {
          title: service.title || "",
          slug: service.slug || "",
          description: service.description || "",
          overview: service.overview || "",
          heroImageBase64: service.heroImageBase64 || "",
          Icon: service.Icon || null,
          offerings: service.offerings || [{ title: "", description: "", Icon: null }],
          whyChooseUs: service.whyChooseUs || [{ title: "", description: "", Icon: null }],
          techStack: {
            frontend: service.techStack?.frontend || [],
            backend: service.techStack?.backend || [],
            database: service.techStack?.database || [],
            tools: service.techStack?.tools || [],
          },
          process: service.process || [{ title: "", description: "", Icon: null }],
          impact: service.impact || [{ title: "", metric: "", description: "", Icon: null }],
          testimonial: {
            quote: service.testimonial?.quote || "",
            name: service.testimonial?.name || "",
            role: service.testimonial?.role || "",
            avatarBase64: service.testimonial?.avatarBase64 || "",
          },
          gallery: service.gallery
            ? service.gallery.map((item) => ({
                srcBase64: item.srcBase64 || "",
                alt: item.alt || "",
                dataAiHint: item.dataAiHint || "",
              }))
            : [{ srcBase64: "", alt: "", dataAiHint: "" }],
          industries: service.industries || [],
          published: service.published || false,
        }
      : {
          title: "",
          slug: "",
          description: "",
          overview: "",
          heroImageBase64: "",
          Icon: null,
          offerings: [{ title: "", description: "", Icon: null }],
          whyChooseUs: [{ title: "", description: "", Icon: null }],
          techStack: { frontend: [], backend: [], database: [], tools: [] },
          process: [{ title: "", description: "", Icon: null }],
          impact: [{ title: "", metric: "", description: "", Icon: null }],
          testimonial: {
            quote: "",
            name: "",
            role: "",
            avatarBase64: "",
          },
          gallery: [{ srcBase64: "", alt: "", dataAiHint: "" }],
          industries: [],
          published: false,
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
    fields: whyChooseUsFields,
    append: appendWhyChooseUs,
    remove: removeWhyChooseUs,
  } = useFieldArray({
    control: form.control,
    name: "whyChooseUs",
  });

  const {
    fields: processFields,
    append: appendProcess,
    remove: removeProcess,
  } = useFieldArray({
    control: form.control,
    name: "process",
  });

  const {
    fields: impactFields,
    append: appendImpact,
    remove: removeImpact,
  } = useFieldArray({
    control: form.control,
    name: "impact",
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
          description: "Image file size must be less than 5MB.",
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
          description: "Failed to process image.",
        });
      }
    }
  };

  const onSubmit = async (values: ServiceFormValues) => {
    console.log("Form submission values:", JSON.stringify(values, null, 2));
    try {
      const payload = {
        id: service?._id,
        ...values,
        techStack: {
          frontend: values.techStack.frontend,
          backend: values.techStack.backend,
          database: values.techStack.database,
          tools: values.techStack.tools,
        },
        testimonial: {
          quote: values.testimonial.quote,
          name: values.testimonial.name,
          role: values.testimonial.role,
          avatarBase64: values.testimonial.avatarBase64,
        },
        gallery: values.gallery.map((item) => ({
          srcBase64: item.srcBase64,
          alt: item.alt,
          dataAiHint: item.dataAiHint,
        })),
        industries: values.industries,
      };

      const result = service
        ? await updateService(payload).unwrap()
        : await addService(payload).unwrap();

      toast({
        title: `Service ${service ? "Updated" : "Created"}!`,
        description: `The service "${values.title}" has been saved successfully.`,
      });

      router.push("/admin/services");
    } catch (error: any) {
      console.error("Error from RTK Query:", error);
      let errorMessage = "Something went wrong while saving the service.";
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
            {service ? "Edit Service" : "Create New Service"}
          </h1>
          <Button type="submit" disabled={isAdding || isUpdating}>
            {(isAdding || isUpdating) && (
              <LuLoader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save {service ? "Changes" : "Service"}
          </Button>
        </div>

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
                    <Input {...field} placeholder="e.g., Web Development" required />
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
                    <Input
                      {...field}
                      placeholder="e.g., web-development"
                      disabled={!!service}
                      required
                    />
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
                    <Textarea
                      {...field}
                      placeholder="e.g., Creating responsive, powerful, and user-friendly websites..."
                      required
                    />
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
                    <Textarea
                      {...field}
                      rows={5}
                      placeholder="e.g., We build high-performance websites..."
                      required
                    />
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
                        required={!service}
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
            <FormField
              control={form.control}
              name="Icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <select
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value || null)}
                        className="block w-full p-2 border rounded"
                      >
                        <option value="">Select an icon</option>
                        {iconOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {field.value && iconMap[field.value] && (
                        <span className="text-xl">
                          {React.createElement(iconMap[field.value], { className: "h-5 w-5" })}
                        </span>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormLabel>Published</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Offerings</CardTitle>
            <CardDescription>Detail what this service includes (e.g., Custom Web Applications).</CardDescription>
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
                          <Input
                            {...field}
                            placeholder="e.g., Custom Web Applications"
                            required
                          />
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
                          <Textarea
                            {...field}
                            placeholder="e.g., Tailored solutions to meet your unique business requirements."
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`offerings.${index}.Icon`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <select
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(e.target.value || null)}
                              className="block w-full p-2 border rounded"
                            >
                              <option value="">Select an icon</option>
                              {iconOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            {field.value && iconMap[field.value] && (
                              <span className="text-xl">
                                {React.createElement(iconMap[field.value], { className: "h-5 w-5" })}
                              </span>
                            )}
                          </div>
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
                  <FaTrash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => appendOffering({ title: "", description: "", Icon: null })}
            >
              <GoPlusCircle className="mr-2 h-4 w-4" /> Add Offering
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why Choose Us</CardTitle>
            <CardDescription>Highlight the unique advantages (e.g., Expert Team).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {whyChooseUsFields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-4 items-start p-4 border rounded-md relative"
              >
                <div className="grid gap-2 flex-1">
                  <FormField
                    control={form.control}
                    name={`whyChooseUs.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Expert Team" required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`whyChooseUs.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="e.g., Our developers are experts in modern web technologies."
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`whyChooseUs.${index}.Icon`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <select
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(e.target.value || null)}
                              className="block w-full p-2 border rounded"
                            >
                              <option value="">Select an icon</option>
                              {iconOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            {field.value && iconMap[field.value] && (
                              <span className="text-xl">
                                {React.createElement(iconMap[field.value], { className: "h-5 w-5" })}
                              </span>
                            )}
                          </div>
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
                  onClick={() => removeWhyChooseUs(index)}
                >
                  <FaTrash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => appendWhyChooseUs({ title: "", description: "", Icon: null })}
            >
              <GoPlusCircle className="mr-2 h-4 w-4" /> Add Why Choose Us
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
            <CardDescription>Select technologies for each category.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="techStack.frontend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frontend Technologies</FormLabel>
                  <FormControl>
                    <Select
                      isMulti
                      options={techOptions.frontend}
                      value={techOptions.frontend.filter((option) =>
                        field.value.includes(option.value)
                      )}
                      onChange={(selected) =>
                        field.onChange(selected.map((option) => option.value))
                      }
                      placeholder="Select frontend technologies..."
                      classNamePrefix="select"
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
                  <FormLabel>Backend Technologies</FormLabel>
                  <FormControl>
                    <Select
                      isMulti
                      options={techOptions.backend}
                      value={techOptions.backend.filter((option) =>
                        field.value.includes(option.value)
                      )}
                      onChange={(selected) =>
                        field.onChange(selected.map((option) => option.value))
                      }
                      placeholder="Select backend technologies..."
                      classNamePrefix="select"
                    />
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
                  <FormLabel>Databases</FormLabel>
                  <FormControl>
                    <Select
                      isMulti
                      options={techOptions.database}
                      value={techOptions.database.filter((option) =>
                        field.value.includes(option.value)
                      )}
                      onChange={(selected) =>
                        field.onChange(selected.map((option) => option.value))
                      }
                      placeholder="Select databases..."
                      classNamePrefix="select"
                    />
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
                    <Select
                      isMulti
                      options={techOptions.tools}
                      value={techOptions.tools.filter((option) =>
                        field.value.includes(option.value)
                      )}
                      onChange={(selected) =>
                        field.onChange(selected.map((option) => option.value))
                      }
                      placeholder="Select tools..."
                      classNamePrefix="select"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Process</CardTitle>
            <CardDescription>Outline the steps involved (e.g., Discover, Design).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {processFields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-4 items-start p-4 border rounded-md relative"
              >
                <div className="grid gap-2 flex-1">
                  <FormField
                    control={form.control}
                    name={`process.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Discover" required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`process.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="e.g., Understanding your vision, goals, and requirements."
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`process.${index}.Icon`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <select
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(e.target.value || null)}
                              className="block w-full p-2 border rounded"
                            >
                              <option value="">Select an icon</option>
                              {iconOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            {field.value && iconMap[field.value] && (
                              <span className="text-xl">
                                {React.createElement(iconMap[field.value], { className: "h-5 w-5" })}
                              </span>
                            )}
                          </div>
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
                  onClick={() => removeProcess(index)}
                >
                  <FaTrash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => appendProcess({ title: "", description: "", Icon: null })}
            >
              <GoPlusCircle className="mr-2 h-4 w-4" /> Add Process Step
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impact</CardTitle>
            <CardDescription>Showcase measurable impact (e.g., Increased User Engagement).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {impactFields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-4 items-start p-4 border rounded-md relative"
              >
                <div className="grid gap-2 flex-1">
                  <FormField
                    control={form.control}
                    name={`impact.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., Increased User Engagement"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`impact.${index}.metric`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Metric</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., +45%" required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`impact.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="e.g., With intuitive UI/UX and fast load times."
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`impact.${index}.Icon`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <select
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(e.target.value || null)}
                              className="block w-full p-2 border rounded"
                            >
                              <option value="">Select an icon</option>
                              {iconOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            {field.value && iconMap[field.value] && (
                              <span className="text-xl">
                                {React.createElement(iconMap[field.value], { className: "h-5 w-5" })}
                              </span>
                            )}
                          </div>
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
                  onClick={() => removeImpact(index)}
                >
                  <FaTrash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => appendImpact({ title: "", metric: "", description: "", Icon: null })}
            >
              <GoPlusCircle className="mr-2 h-4 w-4" /> Add Impact
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Testimonial</CardTitle>
            <CardDescription>Provide a client quote and details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="testimonial.quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quote</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="e.g., Paarsh Infotech transformed our online presence..."
                      required
                    />
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
                    <Input {...field} placeholder="e.g., Rohan Gupta" required />
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
                    <Input
                      {...field}
                      placeholder="e.g., Marketing Director, Creative Solutions"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="testimonial.avatarBase64"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Avatar</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "testimonial.avatarBase64")}
                        required={!service}
                      />
                      {field.value && (
                        <img
                          src={field.value}
                          alt="Avatar preview"
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
            <CardTitle>Project Gallery</CardTitle>
            <CardDescription>Showcase images of projects (e.g., E-commerce dashboard).</CardDescription>
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
                              onChange={(e) => handleFileChange(e, `gallery.${index}.srcBase64`)}
                              required={!service}
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
                          <Input
                            {...field}
                            placeholder="e.g., E-commerce dashboard"
                            required
                          />
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
                            placeholder="e.g., dashboard analytics"
                            required
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
                  dataAiHint: "",
                })
              }
            >
              <GoPlusCircle className="mr-2 h-4 w-4" /> Add Gallery Image
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Industries Served</CardTitle>
            <CardDescription>Select industries served by this service.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="industries"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industries</FormLabel>
                  <FormControl>
                    <Select
                      isMulti
                      options={industryOptions}
                      value={industryOptions.filter((option) =>
                        field.value.includes(option.value)
                      )}
                      onChange={(selected) =>
                        field.onChange(selected.map((option) => option.value))
                      }
                      placeholder="Select industries..."
                      classNamePrefix="select"
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
