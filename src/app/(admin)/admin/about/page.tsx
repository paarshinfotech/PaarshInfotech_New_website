"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JourneyMilestonesManagement } from "@/components/admin/about/JourneyMilestonesManagement";
import { CultureMomentsManagement } from "@/components/admin/about/CultureMomentsManagement";
import { TestimonialsManagement } from "@/components/admin/about/TestimonialsManagement";

export default function AboutManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About Page Management</h1>
        <p className="text-muted-foreground">
          Manage the content sections of your public About page.
        </p>
      </div>

      <Tabs defaultValue="journey">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="journey">Our Journey</TabsTrigger>
          <TabsTrigger value="culture">Moments That Matter</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="journey" className="mt-6">
          <JourneyMilestonesManagement />
        </TabsContent>

        <TabsContent value="culture" className="mt-6">
          <CultureMomentsManagement />
        </TabsContent>

        <TabsContent value="testimonials" className="mt-6">
          <TestimonialsManagement />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>About Page Settings</CardTitle>
              <CardDescription>
                Configure display settings for the About page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Settings management features coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 