'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
    const { settings, setSetting } = useSiteSettings();

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your admin account and website settings.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Admin Profile</CardTitle>
                    <CardDescription>Update your personal information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Admin User" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="admin@example.com" />
                    </div>
                     <Button>Save Changes</Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Set a new password for your account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                    </div>
                     <Button>Update Password</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Frontend Visibility</CardTitle>
                    <CardDescription>Control which sections are visible on the public website.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label>Show Leadership Section</Label>
                            <p className="text-xs text-muted-foreground">
                                Display the Chairman, CEO, and CFO on the About page.
                            </p>
                        </div>
                        <Switch
                            checked={settings.showLeadership}
                            onCheckedChange={(checked) => setSetting('showLeadership', checked)}
                        />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label>Show Team Members Section</Label>
                            <p className="text-xs text-muted-foreground">
                                Display the grid of team members on the About page.
                            </p>
                        </div>
                         <Switch
                            checked={settings.showTeam}
                            onCheckedChange={(checked) => setSetting('showTeam', checked)}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
