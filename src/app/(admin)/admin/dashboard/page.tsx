"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Pie,
  PieChart,
  Line,
  LineChart,
} from "recharts";

import { FaUsers, FaBriefcase, FaRegCommentDots, FaRegFileAlt, FaUserGraduate } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ContactViewModal } from "@/components/admin/contacts/ContactViewModal";
import type { Contact } from "@/app/(admin)/admin/contacts/page";

const siteTrafficData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const siteTrafficConfig = {
  desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
  mobile: { label: "Mobile", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const userDemographicsData = [
  { country: "USA", value: 45, fill: "var(--color-usa)" },
  { country: "India", value: 25, fill: "var(--color-india)" },
  { country: "UK", value: 15, fill: "var(--color-uk)" },
  { country: "Canada", value: 10, fill: "var(--color-canada)" },
  { country: "Other", value: 5, fill: "var(--color-other)" },
];
const userDemographicsConfig = {
  value: { label: "Users" },
  usa: { label: "USA", color: "hsl(var(--chart-1))" },
  india: { label: "India", color: "hsl(var(--chart-2))" },
  uk: { label: "UK", color: "hsl(var(--chart-3))" },
  canada: { label: "Canada", color: "hsl(var(--chart-4))" },
  other: { label: "Other", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

const engagementRateData = [
  { date: "2024-01", rate: 58 },
  { date: "2024-02", rate: 62 },
  { date: "2024-03", rate: 65 },
  { date: "2024-04", rate: 60 },
  { date: "2024-05", rate: 70 },
  { date: "2024-06", rate: 72 },
];
const engagementRateConfig = {
  rate: { label: "Engagement Rate", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

const trafficSourceData = [
  { source: "Organic", visitors: 2475, fill: "var(--color-organic)" },
  { source: "Social", visitors: 3856, fill: "var(--color-social)" },
  { source: "Referral", visitors: 1123, fill: "var(--color-referral)" },
  { source: "Direct", visitors: 980, fill: "var(--color-direct)" },
];
const trafficSourceConfig = {
  visitors: { label: "Visitors" },
  organic: { label: "Organic", color: "hsl(var(--chart-1))" },
  social: { label: "Social", color: "hsl(var(--chart-2))" },
  referral: { label: "Referral", color: "hsl(var(--chart-3))" },
  direct: { label: "Direct", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

export default function DashboardPage() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [registrationCount, setRegistrationCount] = useState<number>(0);
  const [visitorStats, setVisitorStats] = useState<{
    totalVisits: number;
    uniqueVisitors: number;
    growthPercentage: number;
  }>({ totalVisits: 0, uniqueVisitors: 0, growthPercentage: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch recent contacts
        const contactsResponse = await fetch('/api/contact');
        if (contactsResponse.ok) {
          const contactsData = await contactsResponse.json();
          // Get the 3 most recent contacts sorted by date
          const sortedContacts = contactsData
            .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3)
            .map((contact: any, index: number) => ({
              id: index + 1,
              _id: contact._id,
              name: contact.name,
              email: contact.email,
              subject: contact.message.substring(0, 50) + (contact.message.length > 50 ? '...' : ''),
              date: new Date(contact.date).toISOString().split('T')[0],
              status: contact.status,
              message: contact.message,
            }));
          setRecentContacts(sortedContacts);
        }

        // Fetch registration count
        const registrationsResponse = await fetch('/api/register?limit=1');
        if (registrationsResponse.ok) {
          const registrationsData = await registrationsResponse.json();
          if (registrationsData.success && registrationsData.pagination) {
            setRegistrationCount(registrationsData.pagination.total || 0);
          }
        }

        // Fetch visitor statistics
        // Get current month stats
        const now = new Date();
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        
        // Get last month stats
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
        
        const [currentMonthResponse, lastMonthResponse] = await Promise.all([
          fetch(`/api/visitors?statsOnly=true&startDate=${currentMonthStart.toISOString()}&endDate=${currentMonthEnd.toISOString()}`),
          fetch(`/api/visitors?statsOnly=true&startDate=${lastMonthStart.toISOString()}&endDate=${lastMonthEnd.toISOString()}`)
        ]);
        
        if (currentMonthResponse.ok && lastMonthResponse.ok) {
          const currentMonthData = await currentMonthResponse.json();
          const lastMonthData = await lastMonthResponse.json();
          
          const currentVisits = currentMonthData.data?.uniqueVisitors || 0;
          const lastVisits = lastMonthData.data?.uniqueVisitors || 0;
          
          const growthPercentage = lastVisits > 0 
            ? Math.round(((currentVisits - lastVisits) / lastVisits) * 100)
            : 0;
          
          setVisitorStats({
            totalVisits: currentMonthData.data?.totalVisits || 0,
            uniqueVisitors: currentVisits,
            growthPercentage,
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleView = (contact: Contact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              A comprehensive overview of your website's performance.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Visitors
              </CardTitle>
              <FaUsers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "..." : visitorStats.uniqueVisitors.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {isLoading ? "Loading..." : (
                  visitorStats.growthPercentage >= 0 
                    ? `+${visitorStats.growthPercentage}% from last month`
                    : `${visitorStats.growthPercentage}% from last month`
                )}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Internship Registrations
              </CardTitle>
              <FaUserGraduate className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "..." : registrationCount}
              </div>
              <p className="text-xs text-muted-foreground">Total registrations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Open Positions
              </CardTitle>
              <FaRegFileAlt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">2 new this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Services
              </CardTitle>
              <FaBriefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Rate</CardTitle>
              <CardDescription>
                User engagement over the last 6 months.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={engagementRateConfig}
                className="min-h-[250px] w-full"
              >
                <LineChart
                  data={engagementRateData}
                  margin={{ top: 5, right: 20, left: -10, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="var(--color-rate)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>
                How users are finding your site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={trafficSourceConfig}
                className="min-h-[250px] w-full"
              >
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="visitors" />}
                  />
                  <Pie
                    data={trafficSourceData}
                    dataKey="visitors"
                    nameKey="source"
                  />
                </PieChart>
              </ChartContainer>
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
              <ChartContainer
                config={siteTrafficConfig}
                className="min-h-[300px] w-full"
              >
                <BarChart accessibilityLayer data={siteTrafficData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Demographics</CardTitle>
              <CardDescription>
                Distribution of users by country.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={userDemographicsConfig}
                className="min-h-[300px] w-full"
              >
                <BarChart
                  data={userDemographicsData}
                  layout="vertical"
                  margin={{ right: 10 }}
                >
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" hide />
                  <XAxis
                    dataKey="country"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="value" layout="vertical" radius={5} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Recent Contact Requests</CardTitle>
              <CardDescription>
                A quick view of the latest messages.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-muted-foreground">Loading contacts...</p>
                </div>
              ) : recentContacts.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-muted-foreground">No recent contacts</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80%]">From</TableHead>
                      <TableHead className="w-[20%] text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentContacts.map((contact) => (
                      <TableRow key={contact._id} className="h-[60px]">
                        <TableCell className="py-3">
                          <div className="font-medium text-sm truncate">{contact.name}</div>
                          <div className="text-xs text-muted-foreground truncate mt-0.5">
                            {contact.email}
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleView(contact)}
                            className="min-w-[60px]"
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <CardFooter className="justify-end pt-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/contacts">
                  View All
                  <GoArrowRight className="ml-2 h-4 w-4" />
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
  );
}
