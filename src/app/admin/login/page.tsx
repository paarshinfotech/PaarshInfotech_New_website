
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            // In a real app, you'd handle auth state here (e.g., with Context or a library)
            router.push('/admin/dashboard');
        }, 1500);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-secondary">
            <Card className="w-full max-w-sm">
                <form onSubmit={handleLogin}>
                    <CardHeader>
                        <CardTitle className="text-2xl">Admin Login</CardTitle>
                        <CardDescription>
                            Enter your credentials to access the dashboard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="admin@example.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign in
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
