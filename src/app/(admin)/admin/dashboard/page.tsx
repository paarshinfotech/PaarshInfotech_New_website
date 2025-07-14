
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Line, LineChart } from "recharts"
import { TrendingUp, Users, Smartphone, Globe, Briefcase, FileText, MessageSquare } from "lucide-react"

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

const newContactsData = [
  { month: "January", contacts: 18 },
  { month: "February", contacts: 30 },
  { month: "March", contacts: 23 },
  { month: "April", contacts: 27 },
  { month: "May", contacts: 20 },
  { month: "June", contacts: 32 },
]

const newContactsConfig = {
  contacts: {
    label: "Contacts",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig


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
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Site Traffic - Last 6 Months</CardTitle>
                        <CardDescription>Desktop vs. Mobile</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={siteTrafficConfig} className="min-h-[250px] w-full">
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
                
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>New Contacts per Month</CardTitle>
                        <CardDescription>Tracks new messages received via contact form.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ChartContainer config={newContactsConfig} className="h-[300px] w-full">
                           <BarChart data={newContactsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            </div>
        </div>
    )
}
