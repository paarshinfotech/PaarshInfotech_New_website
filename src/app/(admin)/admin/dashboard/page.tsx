

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Users, Briefcase, FileText, MessageSquare, ArrowRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ContactViewModal } from "@/components/admin/contacts/ContactViewModal"
import type { Contact } from "@/app/(admin)/admin/contacts/page"

const siteTrafficData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
const siteTrafficConfig = {
  desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
  mobile: { label: "Mobile", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig

const userDemographicsData = [
  { country: "USA", value: 45, fill: "var(--color-usa)" },
  { country: "India", value: 25, fill: "var(--color-india)" },
  { country: "UK", value: 15, fill: "var(--color-uk)" },
  { country: "Canada", value: 10, fill: "var(--color-canada)" },
  { country: "Other", value: 5, fill: "var(--color-other)" },
]
const userDemographicsConfig = {
    value: { label: "Users" },
    usa: { label: "USA", color: "hsl(var(--chart-1))" },
    india: { label: "India", color: "hsl(var(--chart-2))" },
    uk: { label: "UK", color: "hsl(var(--chart-3))" },
    canada: { label: "Canada", color: "hsl(var(--chart-4))" },
    other: { label: "Other", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig

const recentContacts: Contact[] = [
    { id: 1, name: "John Doe", email: "john@example.com", subject: "Web Development Inquiry", date: "2024-05-20", status: "New", message: "Hi, I would like to inquire about your web development services for my new e-commerce project." },
    { id: 2, name: "Jane Smith", email: "jane@example.com", subject: "Question about AI services", date: "2024-05-19", status: "Read", message: "Could you provide more details on your AI and ML offerings?" },
    { id: 3, name: "Peter Jones", email: "peter@example.com", subject: "Partnership Proposal", date: "2024-05-18", status: "Archived", message: "We are a marketing agency interested in a strategic partnership." },
]

export default function DashboardPage() {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const handleView = (contact: Contact) => {
        setSelectedContact(contact);
        setIsViewModalOpen(true);
    }

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground">A comprehensive overview of your website's performance.</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12,345</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">New Contacts</CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+150</div>
                            <p className="text-xs text-muted-foreground">+12.5% this month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">7</div>
                            <p className="text-xs text-muted-foreground">2 new this week</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">6</div>
                            <p className="text-xs text-muted-foreground">All systems operational</p>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                     <Card>
                        <CardHeader>
                            <CardTitle>Site Traffic - Last 6 Months</CardTitle>
                            <CardDescription>Desktop vs. Mobile</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={siteTrafficConfig} className="min-h-[300px] w-full">
                                <BarChart accessibilityLayer data={siteTrafficData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>User Demographics</CardTitle>
                            <CardDescription>Distribution of users by country.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={userDemographicsConfig} className="min-h-[300px] w-full">
                               <BarChart data={userDemographicsData} layout="vertical" margin={{ right: 10 }}>
                                    <CartesianGrid horizontal={false} />
                                    <XAxis type="number" hide />
                                    <XAxis dataKey="country" type="category" tickLine={false} axisLine={false} />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                    <Bar dataKey="value" layout="vertical" radius={5} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Recent Contact Requests</CardTitle>
                            <CardDescription>A quick view of the latest messages.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>From</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentContacts.map((contact) => (
                                        <TableRow key={contact.id}>
                                            <TableCell>
                                                <div className="font-medium">{contact.name}</div>
                                                <div className="text-sm text-muted-foreground">{contact.email}</div>
                                            </TableCell>
                                            <TableCell>{contact.subject}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" onClick={() => handleView(contact)}>View</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="justify-end pt-4">
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/admin/contacts">
                                    View All
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            <ContactViewModal
                isOpen={isViewModalOpen}
                onOpenChange={setIsViewModalOpen}
                contact={selectedContact}
            />
        </>
    )
}

