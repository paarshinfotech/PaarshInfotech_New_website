"use client";

import { useState, useEffect, useMemo } from "react";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FaGlobe, FaUsers, FaSearch } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import { TbTrendingUp } from "react-icons/tb";
import { 
  Loader2, 
  Filter, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  Download,
  RefreshCw 
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useGetVisitorAnalyticsQuery } from "@/services/api";

interface Visitor {
  _id: string;
  sessionId: string;
  ipAddress: string;
  page: string;
  deviceType: string;
  browser: string;
  os: string;
  source: string;
  referrer: string;
  country: string;
  city: string;
  timeSpent: number;
  timestamp: string;
}

interface Filters {
  deviceType: string;
  source: string;
  browser: string;
  os: string;
  country: string;
  startDate: string;
  endDate: string;
  page: string;
}

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

const userDemographicsData = [
  { country: "USA", value: 45 },
  { country: "India", value: 25 },
  { country: "UK", value: 15 },
  { country: "Canada", value: 10 },
  { country: "Other", value: 5 },
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

export default function AnalyticsPage() {
  const { toast } = useToast();
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState<number | "all">(10);

  const {data : VisitorAnalyticsData, isLoading : isVisitorAnalyticsLoading} = useGetVisitorAnalyticsQuery(undefined); 
  console.log("VisitorAnalyticsData:", VisitorAnalyticsData);

  // Statistics
  const [stats, setStats] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
    mobileVisits: 0,
    desktopVisits: 0,
    bounceRate: 45.6,
    topCountry: 'Unknown',
  });

  // Filters
  const [filters, setFilters] = useState<Filters>({
    deviceType: '',
    source: '',
    browser: '',
    os: '',
    country: '',
    startDate: '',
    endDate: '',
    page: '',
  });

  const [activeFilters, setActiveFilters] = useState<Filters>({
    deviceType: '',
    source: '',
    browser: '',
    os: '',
    country: '',
    startDate: '',
    endDate: '',
    page: '',
  });

  // Fetch visitor data
  const fetchVisitors = async (page = 1) => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage === "all" ? "1000" : itemsPerPage.toString(),
      });

      // Add active filters to query
      Object.entries(activeFilters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });

      const response = await fetch(`/api/visitors?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch visitors');
      }

      const data = await response.json();
      
      if (data.success) {
        setVisitors(data.data);
        setCurrentPage(data.pagination.page);
        setTotalPages(data.pagination.pages);
        setTotalRecords(data.pagination.total);
      }
    } catch (error) {
      console.error('Error fetching visitors:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch visitor data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const queryParams = new URLSearchParams({ statsOnly: 'true' });
      
      if (activeFilters.startDate) queryParams.append('startDate', activeFilters.startDate);
      if (activeFilters.endDate) queryParams.append('endDate', activeFilters.endDate);

      const response = await fetch(`/api/visitors?${queryParams}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const visitorData = data.data;
          const mobilePercentage = visitorData.totalVisits > 0 
            ? Math.round((visitorData.mobileVisits / visitorData.totalVisits) * 100) 
            : 0;
          
          setStats({
            totalVisits: visitorData.totalVisits,
            uniqueVisitors: visitorData.uniqueVisitors,
            mobileVisits: mobilePercentage,
            desktopVisits: visitorData.desktopVisits,
            bounceRate: 45.6, // Can be calculated based on time spent
            topCountry: 'India', // Can be fetched from visits by country
          });
        }
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // useEffect(() => {
  //   fetchVisitors(1);
  //   fetchStats();
  // }, [activeFilters, limit]);

     // Use VisitorAnalyticsData for visitors table and pagination
  useEffect(() => {
    if (VisitorAnalyticsData && VisitorAnalyticsData.success) {
      setVisitors(VisitorAnalyticsData.data);
      setIsLoading(false);
    } else {
      setVisitors([]);
      setIsLoading(false);
    }
  }, [VisitorAnalyticsData]);

  // Filter visitors based on search query
  const filteredVisitors = useMemo(() => {
    if (!searchQuery.trim()) return visitors;
    
    const query = searchQuery.toLowerCase();
    return visitors.filter((visitor: Visitor) => {
      return (
        visitor.page.toLowerCase().includes(query) ||
        visitor.deviceType.toLowerCase().includes(query) ||
        visitor.browser.toLowerCase().includes(query) ||
        visitor.os.toLowerCase().includes(query) ||
        visitor.source.toLowerCase().includes(query) ||
        visitor.country.toLowerCase().includes(query) ||
        visitor.city.toLowerCase().includes(query) ||
        visitor.ipAddress.toLowerCase().includes(query)
      );
    });
  }, [visitors, searchQuery]);

  // Calculate pagination
  const totalPagesCalculated = itemsPerPage === "all" ? 1 : Math.ceil(filteredVisitors.length / itemsPerPage);
  const startIndex = itemsPerPage === "all" ? 0 : (currentPage - 1) * itemsPerPage;
  const endIndex = itemsPerPage === "all" ? filteredVisitors.length : startIndex + itemsPerPage;
  const paginatedVisitors = filteredVisitors.slice(startIndex, endIndex);

  // Update totalPages and totalRecords based on filtered data
  useEffect(() => {
    setTotalRecords(filteredVisitors.length);
    setTotalPages(totalPagesCalculated);
  }, [filteredVisitors, totalPagesCalculated]);

  // Reset to page 1 when search query or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage]);

  // Navigation handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handleApplyFilters = () => {
    setActiveFilters({ ...filters });
    setCurrentPage(1);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    const emptyFilters: Filters = {
      deviceType: '',
      source: '',
      browser: '',
      os: '',
      country: '',
      startDate: '',
      endDate: '',
      page: '',
    };
    setFilters(emptyFilters);
    setActiveFilters(emptyFilters);
    setShowFilters(false);
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['Session ID', 'IP Address', 'Page', 'Device', 'Browser', 'OS', 'Source', 'Country', 'Time Spent (s)', 'Timestamp'];
    const csvContent = [
      headers.join(','),
      ...visitors.map(v => [
        v.sessionId,
        v.ipAddress,
        v.page,
        v.deviceType,
        v.browser,
        v.os,
        v.source,
        v.country,
        v.timeSpent,
        format(new Date(v.timestamp), 'yyyy-MM-dd HH:mm:ss')
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visitor-analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: 'Export Successful',
      description: 'Visitor data has been exported to CSV',
    });
  };

  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          An overview of your website's performance.
        </p>
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
              {isLoading ? "..." : stats.uniqueVisitors.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.totalVisits.toLocaleString()} total visits
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <TbTrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bounceRate}%</div>
            <p className="text-xs text-muted-foreground">
              Based on engagement
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mobile Users</CardTitle>
            <FiSmartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.mobileVisits}%</div>
            <p className="text-xs text-muted-foreground">
              Of total traffic
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Country</CardTitle>
            <FaGlobe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.topCountry}</div>
            <p className="text-xs text-muted-foreground">
              Primary traffic source
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Site Traffic - Last 6 Months</CardTitle>
            <CardDescription>Desktop vs. Mobile</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={siteTrafficConfig}
              className="min-h-[250px] w-full"
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
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>How users are finding your site.</CardDescription>
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
            <CardTitle>User Demographics</CardTitle>
            <CardDescription>Distribution of users by country.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={userDemographicsConfig}
              className="min-h-[250px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={userDemographicsData}
                layout="vertical"
                margin={{ left: 10 }}
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
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="value" layout="vertical" radius={5}></Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Visitor Records Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Visitor Records</CardTitle>
              <CardDescription>
                Detailed visitor tracking and analytics data
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchVisitors(currentPage)}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                disabled={visitors.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>

        {showFilters && (
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4 mb-4 p-4 border rounded-lg bg-muted/50">
              <div className="space-y-2">
                <label className="text-sm font-medium">Device Type</label>
                <Select
                  value={filters.deviceType}
                  onValueChange={(value) => setFilters({ ...filters, deviceType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Devices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Devices</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Source</label>
                <Select
                  value={filters.source}
                  onValueChange={(value) => setFilters({ ...filters, source: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Sources</SelectItem>
                    <SelectItem value="direct">Direct</SelectItem>
                    <SelectItem value="organic">Organic</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Browser</label>
                <Select
                  value={filters.browser}
                  onValueChange={(value) => setFilters({ ...filters, browser: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Browsers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Browsers</SelectItem>
                    <SelectItem value="Chrome">Chrome</SelectItem>
                    <SelectItem value="Firefox">Firefox</SelectItem>
                    <SelectItem value="Safari">Safari</SelectItem>
                    <SelectItem value="Edge">Edge</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Operating System</label>
                <Select
                  value={filters.os}
                  onValueChange={(value) => setFilters({ ...filters, os: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All OS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All OS</SelectItem>
                    <SelectItem value="Windows">Windows</SelectItem>
                    <SelectItem value="macOS">macOS</SelectItem>
                    <SelectItem value="Linux">Linux</SelectItem>
                    <SelectItem value="Android">Android</SelectItem>
                    <SelectItem value="iOS">iOS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Page URL</label>
                <Input
                  placeholder="e.g., /about"
                  value={filters.page}
                  onChange={(e) => setFilters({ ...filters, page: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Records per page</label>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => setItemsPerPage(value === "all" ? "all" : parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-4 flex gap-2 justify-end">
                <Button variant="outline" onClick={handleClearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
                <Button onClick={handleApplyFilters}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        )}

        <CardContent>
          {/* Search Bar and Entries Selector */}
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by page, device, browser, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {searchQuery && (
              <Button
                variant="ghost"
                onClick={() => setSearchQuery("")}
                className="text-sm"
              >
                Clear
              </Button>
            )}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Show:</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => setItemsPerPage(value === "all" ? "all" : parseInt(value))}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground whitespace-nowrap">entries</span>
            </div>
          </div>

          {/* Results Info */}
          <div className="text-sm text-muted-foreground mb-2">
            Showing {paginatedVisitors.length > 0 ? startIndex + 1 : 0} to{" "}
            {Math.min(endIndex, filteredVisitors.length)} of {filteredVisitors.length} records
            {searchQuery && ` (filtered from ${visitors.length} total)`}
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Page</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Browser</TableHead>
                  <TableHead>OS</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Time Spent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                      <p className="mt-2 text-sm text-muted-foreground">Loading visitor data...</p>
                    </TableCell>
                  </TableRow>
                ) : paginatedVisitors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      {searchQuery ? "No visitor records found matching your search." : "No visitor records found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedVisitors.map((visitor) => (
                    <TableRow key={visitor._id}>
                      <TableCell className="font-mono text-xs">
                        {format(new Date(visitor.timestamp), 'MMM dd, yyyy HH:mm')}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {visitor.page}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {visitor.deviceType}
                        </Badge>
                      </TableCell>
                      <TableCell>{visitor.browser}</TableCell>
                      <TableCell>{visitor.os}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            visitor.source === 'organic' ? 'default' :
                            visitor.source === 'social' ? 'secondary' :
                            visitor.source === 'referral' ? 'outline' :
                            'secondary'
                          }
                          className="capitalize"
                        >
                          {visitor.source}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {visitor.country !== 'unknown' ? (
                          <div className="text-sm">
                            <div className="font-medium">{visitor.country}</div>
                            {visitor.city !== 'unknown' && (
                              <div className="text-muted-foreground text-xs">{visitor.city}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {visitor.timeSpent > 0 ? (
                          <span>{visitor.timeSpent}s</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                
                <div className="flex gap-1">
                  {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-2 py-1">
                        ...
                      </span>
                    ) : (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => goToPage(page as number)}
                        className="min-w-[2.5rem]"
                      >
                        {page}
                      </Button>
                    )
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
