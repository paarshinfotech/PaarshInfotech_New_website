
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ArrowUpRight, Briefcase, FileText, MessageSquare, Users } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

const stats = [
    { title: "Total Contacts", value: "3", icon: MessageSquare },
    { title: "Open Positions", value: "7", icon: FileText },
    { title: "Active Services", value: "6", icon: Briefcase },
    { title: "Team Members", value: "4", icon: Users },
]

const chartData = [
  { month: "January", contacts: 18 },
  { month: "February", contacts: 30 },
  { month: "March", contacts: 23 },
  { month: "April", contacts: 27 },
  { month: "May", contacts: 20 },
  { month: "June", contacts: 32 },
]

const chartConfig = {
  contacts: {
    label: "Contacts",
    color: "hsl(var(--primary))",
  },
}

const recentContacts = [
    { name: "John Doe", email: "john@example.com", avatar: "https://placehold.co/40x40.png" },
    { name: "Jane Smith", email: "jane@example.com", avatar: "https://placehold.co/40x40.png" },
    { name: "Peter Jones", email: "peter@example.com", avatar: "https://placehold.co/40x40.png" },
]

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">Here's a quick overview of your website.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map(stat => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>New Contacts per Month</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                           <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Bar dataKey="contacts" fill="var(--color-contacts)" radius={8} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Contacts</CardTitle>
                        <CardDescription>You have {recentContacts.length} new messages.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentContacts.map(contact => (
                            <div key={contact.email} className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={contact.avatar} alt="Avatar" />
                                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{contact.name}</p>
                                    <p className="text-sm text-muted-foreground">{contact.email}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                    <div className="p-6 pt-2">
                         <Button size="sm" className="w-full" asChild>
                            <Link href="/admin/contacts">
                                View All
                                <ArrowUpRight className="h-4 w-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
