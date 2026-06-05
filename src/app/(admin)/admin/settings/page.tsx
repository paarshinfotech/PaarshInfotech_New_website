'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { LuLoader } from "react-icons/lu";
import { Eye, EyeOff } from "lucide-react";

const ADMIN_PROFILE_KEY = 'admin_profile';

interface AdminProfile {
    name: string;
    email: string;
    username: string;
    password: string;
}

const defaultProfile: AdminProfile = {
    name: 'Admin User',
    email: 'admin@example.com',
    username: 'paarshinfotech.com',
    password: 'PaarshInfotech#5891',
};

function loadProfile(): AdminProfile {
    if (typeof window === 'undefined') return defaultProfile;
    try {
        const stored = localStorage.getItem(ADMIN_PROFILE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return { ...defaultProfile, ...parsed };
        }
    } catch { }
    return defaultProfile;
}

function saveProfile(profile: AdminProfile) {
    localStorage.setItem(ADMIN_PROFILE_KEY, JSON.stringify(profile));
}

export default function SettingsPage() {
    const { settings, setSetting } = useSiteSettings();
    const { toast } = useToast();

    // Initialize directly from localStorage to avoid stale-state mismatch
    const [profile, setProfile] = useState<AdminProfile>(() => loadProfile());
    const [isProfileSaving, setIsProfileSaving] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordSaving, setIsPasswordSaving] = useState(false);

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleProfileSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProfileSaving(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        saveProfile(profile);
        toast({ title: "Profile Updated", description: "Your profile information has been saved." });
        // Re-sync profile state from localStorage after save
        setProfile(loadProfile());
        setIsProfileSaving(false);
    };

    // Keep password in localStorage in sync with the profile object
    const persistProfile = (updated: AdminProfile) => {
        setProfile(updated);
        saveProfile(updated);
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();

        // Always compare against the latest stored password from localStorage
        const storedProfile = loadProfile();
        if (currentPassword !== storedProfile.password) {
            toast({ variant: "destructive", title: "Incorrect Password", description: "The current password you entered is wrong." });
            return;
        }
        if (newPassword.length < 6) {
            toast({ variant: "destructive", title: "Password Too Short", description: "New password must be at least 6 characters." });
            return;
        }
        if (newPassword !== confirmPassword) {
            toast({ variant: "destructive", title: "Passwords Don't Match", description: "New password and confirmation do not match." });
            return;
        }

        setIsPasswordSaving(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        const updatedProfile = { ...storedProfile, password: newPassword };
        persistProfile(updatedProfile);

        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        toast({ title: "Password Changed", description: "Your password has been updated successfully." });
        setIsPasswordSaving(false);
    };

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your admin account and website settings.</p>
            </div>

            {/* Admin Profile */}
            <Card>
                <CardHeader>
                    <CardTitle>Admin Profile</CardTitle>
                    <CardDescription>Update your personal information.</CardDescription>
                </CardHeader>
                <form onSubmit={handleProfileSave}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={profile.name}
                                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                            />
                        </div>
                        <Button type="submit" disabled={isProfileSaving}>
                            {isProfileSaving && <LuLoader className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </CardContent>
                </form>
            </Card>

            {/* Change Password */}
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Set a new password for your account.</CardDescription>
                </CardHeader>
                <form onSubmit={handlePasswordChange}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <div className="relative">
                                <Input
                                    id="current-password"
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="new-password"
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirm-password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <Button type="submit" disabled={isPasswordSaving}>
                            {isPasswordSaving && <LuLoader className="mr-2 h-4 w-4 animate-spin" />}
                            Update Password
                        </Button>
                    </CardContent>
                </form>
            </Card>

            {/* Frontend Visibility */}
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
