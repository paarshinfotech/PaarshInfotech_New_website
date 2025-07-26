// src/app/(admin)/admin/excellence-center/journey/page.tsx
"use client";

import { JourneyMilestonesManagement } from "@/components/admin/about/JourneyMilestonesManagement";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function JourneyPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Journey/Milestones Management</CardTitle>
                <CardDescription>Manage the journey timeline for the Excellence Center program.</CardDescription>
            </CardHeader>
            <CardContent>
                <JourneyMilestonesManagement />
            </CardContent>
        </Card>
    );
}
