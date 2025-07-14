
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { Pie, PieChart, Line, LineChart, CartesianGrid, XAxis } from "recharts"
import { Users, Briefcase, FileText, MessageSquare, ArrowRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const trafficSourceData = [
  { source: "Organic", visitors: 2475, fill: "var(--color-organic)" },
  { source: "Social", visitors: 3856, fill: "var(--color-social)" },
  { source: "Referral", visitors: 1123, fill: "var(--color-referral)" },
  { source: "Direct", visitors: 980, fill: "var(--color-direct)" },
]
const trafficSourceConfig = {
  visitors: { label: "Visitors" },
  organic: { label: "Organic", color: "hsl(var(--chart-1))" },
  social: { label: "Social", color: "hsl(var(--chart-2))" },
  referral: { label: "Referral", color: "hsl(var(--chart-3))" },
  direct: { label: "Direct", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig

const engagementRateData = [
  { date: "2024-01", rate: 58 },
  { date: "2024-02", rate: 62 },
  { date: "2024-03", rate: 65 },
  { date: "2024-04", rate: 60 },
  { date: "2024-05", rate: 70 },
  { date: "2024-06", rate: 72 },
]
const engagementRateConfig = {
  rate: { label: "Engagement Rate", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig

const recentContacts = [
    { name: "John Doe", email: "john@example.com", subject: "Web Development Inquiry", date: "2 hours ago" },
    { name: "Jane Smith", email: "jane@example.com", subject: "Question about AI services", date: "1 day ago" },
    { name: "Peter Jones", email: "peter@example.com", subject: "Partnership Proposal", date: "2 days ago" },
]

export default function DashboardPage() {
    return (
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
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Traffic Sources</CardTitle>
                         <CardDescription>How users find your site.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={trafficSourceConfig} className="min-h-[250px] w-full">
                            <PieChart>
                                <ChartTooltip content={<ChartTooltipContent nameKey="visitors" />} />
                                <Pie data={trafficSourceData} dataKey="visitors" nameKey="source" />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Engagement Rate</CardTitle>
                        <CardDescription>User engagement trend.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={engagementRateConfig} className="min-h-[250px] w-full">
                            <LineChart data={engagementRateData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                                <Line type="monotone" dataKey="rate" stroke="var(--color-rate)" strokeWidth={2} dot={true} />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                
                <Card className="lg:col-span-2">
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
                                    <TableRow key={contact.email}>
                                        <TableCell>
                                            <div className="font-medium">{contact.name}</div>
                                            <div className="text-sm text-muted-foreground">{contact.email}</div>
                                        </TableCell>
                                        <TableCell>{contact.subject}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">View</Button>
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
    )
}
