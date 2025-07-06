"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { getSmartReply } from "@/app/actions";

const services = [
  { id: "web", label: "Web Development" },
  { id: "software", label: "Software Development" },
  { id: "mobile", label: "Mobile App Development" },
  { id: "ecommerce", label: "E-commerce Solutions" },
  { id: "ai_ml", label: "AI and ML" },
  { id: "ui_ux", label: "UI/UX Design" },
] as const;

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Please describe your project briefly." }),
  services: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one service.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function QuoteForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [smartReply, setSmartReply] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      services: [],
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setSmartReply(null);
    setError(null);

    const reply = await getSmartReply({
        clientMessage: values.message,
        selectedServices: values.services,
    });
    
    if(reply.success) {
        setSmartReply(reply.content);
    } else {
        setError(reply.error || 'An unexpected error occurred.');
    }

    setIsLoading(false);
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Fill out the form below to get your quote.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl><Input placeholder="your.email@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="services" render={() => (
                <FormItem>
                  <FormLabel>Services of Interest</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {services.map((item) => (
                      <FormField key={item.id} control={form.control} name="services" render={({ field }) => (
                        <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.label)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.label])
                                  : field.onChange(field.value?.filter((value) => value !== item.label));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item.label}</FormLabel>
                        </FormItem>
                      )} />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl><Textarea placeholder="Tell us about your project requirements..." {...field} rows={5} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Quote & AI Reply
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {smartReply && (
        <Card>
            <CardHeader>
                <CardTitle>AI-Generated Follow-Up Email</CardTitle>
                <CardDescription>Here's a personalized draft you can use to follow up.</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea readOnly value={smartReply} rows={8} className="bg-secondary" />
            </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-destructive">
            <CardHeader>
                <CardTitle className="text-destructive">Error</CardTitle>
            </Header>
            <CardContent>
                <p>{error}</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
