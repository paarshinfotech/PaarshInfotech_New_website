// src/app/(admin)/admin/excellence-center/feedbacks/page.tsx
"use client";

import { TestimonialsManagement } from "@/components/admin/about/TestimonialsManagement";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FeedbacksPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Feedbacks Management</CardTitle>
                <CardDescription>Manage testimonials and feedback from partners and students related to the Excellence Center.</CardDescription>
            </CardHeader>
            <CardContent>
                <TestimonialsManagement />
            </CardContent>
        </Card>
    );
}
