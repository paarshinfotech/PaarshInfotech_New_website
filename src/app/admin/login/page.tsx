
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { toast } = useToast();
    const { login } = useAuth();

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            const success = login(username, password);
            if (success) {
                toast({
                    title: "Login Successful",
                    description: "Redirecting to the dashboard...",
                });
                router.push('/admin/dashboard');
            } else {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: "Invalid username or password. Please try again.",
                });
                setIsLoading(false);
            }
        }, 1000);
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
                            <Label htmlFor="username">Username</Label>
                            <Input 
                                id="username" 
                                type="text" 
                                placeholder="admin" 
                                required 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" 
                                type="password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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
