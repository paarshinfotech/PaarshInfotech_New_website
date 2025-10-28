'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Filter, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, RefreshCw, MoreVertical, Trash2, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Registration {
  _id: string;
  fullName: string;
  email: string;
  contactNumber: string;
  address: string;
  college: { _id: string; name: string; location?: string };
  internshipType: { _id: string; name: string };
  attendanceMode: { _id: string; name: string };
  joiningDate: string;
  internshipDuration: { _id: string; name: string; durationInMonths: number };
  hasLaptop: boolean;
  referralName?: string;
  internshipNote?: string;
  resumeUrl: string;
  paymentScreenshotUrl: string;
  registrationNumber: string;
  createdAt: string;
}

interface College {
  _id: string;
  name: string;
  location?: string;
}

interface InternshipType {
  _id: string;
  name: string;
}

interface Mode {
  _id: string;
  name: string;
}

interface Duration {
  _id: string;
  name: string;
  durationInMonths: number;
}

interface Filters {
  college: string;
  internshipType: string;
  attendanceMode: string;
  duration: string;
  hasLaptop: string;
  joiningDateFrom: string;
  joiningDateTo: string;
}

export default function RegistrationsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState<string | null>(null);
  
  // Filter options data
  const [colleges, setColleges] = useState<College[]>([]);
  const [internshipTypes, setInternshipTypes] = useState<InternshipType[]>([]);
  const [modes, setModes] = useState<Mode[]>([]);
  const [durations, setDurations] = useState<Duration[]>([]);
  
  // Filters state
  const [filters, setFilters] = useState<Filters>({
    college: '',
    internshipType: '',
    attendanceMode: '',
    duration: '',
    hasLaptop: '',
    joiningDateFrom: '',
    joiningDateTo: '',
  });
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchFilterOptions();
    
    // Add keyboard shortcuts
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector<HTMLInputElement>('input[type="text"]')?.focus();
      }
      // Ctrl/Cmd + F to toggle filters
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        setShowFilters(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [pagination.page, pagination.limit]);

  const fetchFilterOptions = async () => {
    try {
      const [collegesRes, typesRes, modesRes, durationsRes] = await Promise.all([
        fetch('/api/colleges'),
        fetch('/api/internship-types'),
        fetch('/api/modes'),
        fetch('/api/durations'),
      ]);

      const [collegesData, typesData, modesData, durationsData] = await Promise.all([
        collegesRes.json(),
        typesRes.json(),
        modesRes.json(),
        durationsRes.json(),
      ]);

      if (collegesData.success) setColleges(collegesData.data);
      if (typesData.success) setInternshipTypes(typesData.data);
      if (modesData.success) setModes(modesData.data);
      if (durationsData.success) setDurations(durationsData.data);
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
    }
  };

  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      // Build query params
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      if (filters.college) params.append('college', filters.college);
      if (filters.internshipType) params.append('internshipType', filters.internshipType);
      if (filters.attendanceMode) params.append('attendanceMode', filters.attendanceMode);
      if (filters.duration) params.append('duration', filters.duration);
      if (filters.hasLaptop) params.append('hasLaptop', filters.hasLaptop);
      if (filters.joiningDateFrom) params.append('joiningDateFrom', filters.joiningDateFrom);
      if (filters.joiningDateTo) params.append('joiningDateTo', filters.joiningDateTo);

      const response = await fetch(`/api/register?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setRegistrations(data.data);
        setPagination(data.pagination);
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load registrations',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchRegistrations();
  };

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchRegistrations();
  };

  const clearFilters = () => {
    setFilters({
      college: '',
      internshipType: '',
      attendanceMode: '',
      duration: '',
      hasLaptop: '',
      joiningDateFrom: '',
      joiningDateTo: '',
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
    // Will trigger fetchRegistrations through useEffect
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit: string) => {
    setPagination((prev) => ({ ...prev, limit: parseInt(newLimit), page: 1 }));
  };

  const goToFirstPage = () => handlePageChange(1);
  const goToLastPage = () => handlePageChange(pagination.pages);

  const viewDetails = (registration: Registration) => {
    setSelectedRegistration(registration);
    setDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setRegistrationToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!registrationToDelete) return;

    try {
      const response = await fetch(`/api/register/${registrationToDelete}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: 'Registration deleted successfully',
        });
        fetchRegistrations();
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete registration',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setRegistrationToDelete(null);
    }
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(v => v !== '').length;
  };

  const exportToCSV = () => {
    if (registrations.length === 0) {
      toast({
        title: 'No Data',
        description: 'There are no registrations to export',
        variant: 'destructive',
      });
      return;
    }

    // Create CSV headers
    const headers = [
      'Registration Number',
      'Full Name',
      'Email',
      'Contact Number',
      'Address',
      'College',
      'College Location',
      'Internship Type',
      'Attendance Mode',
      'Duration',
      'Joining Date',
      'Has Laptop',
      'Referral Name',
      'Internship Note',
      'Registration Date',
      'Registration Time'
    ];

    // Create CSV rows with proper date formatting
    const rows = registrations.map(reg => {
      const joiningDate = new Date(reg.joiningDate);
      const registrationDate = new Date(reg.createdAt);
      
      return [
        reg.registrationNumber,
        reg.fullName,
        reg.email,
        reg.contactNumber,
        reg.address,
        reg.college.name,
        reg.college.location || '',
        reg.internshipType.name,
        reg.attendanceMode.name,
        reg.internshipDuration.name,
        format(joiningDate, 'dd-MMM-yyyy'),
        reg.hasLaptop ? 'Yes' : 'No',
        reg.referralName || '',
        reg.internshipNote || '',
        format(registrationDate, 'dd-MMM-yyyy'),
        format(registrationDate, 'hh:mm a')
      ];
    });

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `registrations_${format(new Date(), 'yyyy-MM-dd_HHmmss')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Export Successful',
      description: `Exported ${registrations.length} registrations to CSV`,
    });
  };

  if (isLoading && registrations.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Quick Stats */}
        {!isLoading && registrations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{pagination.total}</div>
                <p className="text-xs text-muted-foreground">Total Registrations</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {new Set(registrations.map(r => r.college._id)).size}
                </div>
                <p className="text-xs text-muted-foreground">Unique Colleges</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {new Set(registrations.map(r => r.internshipType._id)).size}
                </div>
                <p className="text-xs text-muted-foreground">Internship Types</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {registrations.filter(r => r.hasLaptop).length}
                </div>
                <p className="text-xs text-muted-foreground">With Laptop</p>
              </CardContent>
            </Card>
          </div>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Internship Registrations</CardTitle>
                <CardDescription>
                  View and manage all internship registrations
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={fetchRegistrations}
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button
                  onClick={exportToCSV}
                  variant="outline"
                  size="sm"
                  disabled={registrations.length === 0}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Search and Filter Controls */}
            <div className="space-y-4 mb-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Search by name, email, registration number, or college..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button onClick={handleSearch} variant="secondary">
                  Search
                </Button>
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant={showFilters ? "default" : "outline"}
                  className="relative"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {getActiveFiltersCount() > 0 && (
                    <Badge variant="destructive" className="ml-2 px-1.5 py-0 h-5 min-w-5">
                      {getActiveFiltersCount()}
                    </Badge>
                  )}
                </Button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <Card className="border">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {/* College Filter */}
                      <div className="space-y-1">
                        <label className="text-xs font-medium">College</label>
                        <Select
                          value={filters.college || 'all'}
                          onValueChange={(value) => handleFilterChange('college', value === 'all' ? '' : value)}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="All Colleges" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Colleges</SelectItem>
                            {colleges.map((college) => (
                              <SelectItem key={college._id} value={college._id}>
                                {college.name}
                                {college.location && ` (${college.location})`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Internship Type Filter */}
                      <div className="space-y-1">
                        <label className="text-xs font-medium">Internship Type</label>
                        <Select
                          value={filters.internshipType || 'all'}
                          onValueChange={(value) => handleFilterChange('internshipType', value === 'all' ? '' : value)}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            {internshipTypes.map((type) => (
                              <SelectItem key={type._id} value={type._id}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Attendance Mode Filter */}
                      <div className="space-y-1">
                        <label className="text-xs font-medium">Attendance Mode</label>
                        <Select
                          value={filters.attendanceMode || 'all'}
                          onValueChange={(value) => handleFilterChange('attendanceMode', value === 'all' ? '' : value)}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="All Modes" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Modes</SelectItem>
                            {modes.map((mode) => (
                              <SelectItem key={mode._id} value={mode._id}>
                                {mode.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Duration Filter */}
                      <div className="space-y-1">
                        <label className="text-xs font-medium">Duration</label>
                        <Select
                          value={filters.duration || 'all'}
                          onValueChange={(value) => handleFilterChange('duration', value === 'all' ? '' : value)}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="All Durations" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Durations</SelectItem>
                            {durations.map((duration) => (
                              <SelectItem key={duration._id} value={duration._id}>
                                {duration.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Has Laptop Filter */}
                      <div className="space-y-1">
                        <label className="text-xs font-medium">Has Laptop</label>
                        <Select
                          value={filters.hasLaptop || 'all'}
                          onValueChange={(value) => handleFilterChange('hasLaptop', value === 'all' ? '' : value)}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="All" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Joining Date From */}
                      <div className="space-y-1">
                        <label className="text-xs font-medium">Joining From</label>
                        <Input
                          type="date"
                          className="h-9"
                          value={filters.joiningDateFrom}
                          onChange={(e) => handleFilterChange('joiningDateFrom', e.target.value)}
                        />
                      </div>

                      {/* Joining Date To */}
                      <div className="space-y-1">
                        <label className="text-xs font-medium">Joining To</label>
                        <Input
                          type="date"
                          className="h-9"
                          value={filters.joiningDateTo}
                          onChange={(e) => handleFilterChange('joiningDateTo', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button onClick={applyFilters} size="sm" className="flex-1">
                        Apply Filters
                      </Button>
                      <Button onClick={clearFilters} variant="outline" size="sm" className="flex-1">
                        Clear Filters
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Results Summary */}
            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reg. Number</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-[180px]">Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>College</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Joining Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                      </TableCell>
                    </TableRow>
                  ) : registrations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                        No registrations found
                      </TableCell>
                    </TableRow>
                  ) : (
                    registrations.map((registration) => (
                      <TableRow key={registration._id}>
                        <TableCell className="font-medium">
                          {registration.registrationNumber}
                        </TableCell>
                        <TableCell>{registration.fullName}</TableCell>
                        <TableCell>
                          <div className="max-w-[180px] truncate" title={registration.email}>
                            {registration.email}
                          </div>
                        </TableCell>
                        <TableCell>{registration.contactNumber}</TableCell>
                        <TableCell>
                          <div className="max-w-[200px] truncate" title={registration.college.name}>
                            {registration.college.name}
                          </div>
                        </TableCell>
                        <TableCell>{registration.internshipType.name}</TableCell>
                        <TableCell>
                          {format(new Date(registration.joiningDate), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => viewDetails(registration)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteClick(registration._id)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {registrations.length > 0 ? ((pagination.page - 1) * pagination.limit) + 1 : 0} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} registrations
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground">Rows per page:</label>
                <Select value={pagination.limit.toString()} onValueChange={handleLimitChange}>
                  <SelectTrigger className="w-20 h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Enhanced Pagination */}
            {pagination.pages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                <div className="text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.pages}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToFirstPage}
                    disabled={pagination.page === 1}
                    title="First Page"
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    title="Previous Page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                      let pageNum;
                      if (pagination.pages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.page <= 3) {
                        pageNum = i + 1;
                      } else if (pagination.page >= pagination.pages - 2) {
                        pageNum = pagination.pages - 4 + i;
                      } else {
                        pageNum = pagination.page - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={pagination.page === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(pageNum)}
                          className="w-9"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    title="Next Page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToLastPage}
                    disabled={pagination.page === pagination.pages}
                    title="Last Page"
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide">
          <DialogHeader>
            <DialogTitle>Registration Details</DialogTitle>
            <DialogDescription>
              Complete information about the registration
            </DialogDescription>
          </DialogHeader>
          
          {selectedRegistration && (
            <div className="space-y-6">
              {/* Registration Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Registration Number</h4>
                  <p className="text-lg font-medium">{selectedRegistration.registrationNumber}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Registration Date</h4>
                  <p>{format(new Date(selectedRegistration.createdAt), 'MMM dd, yyyy HH:mm')}</p>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Full Name</h4>
                    <p>{selectedRegistration.fullName}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Email</h4>
                    <p>{selectedRegistration.email}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Contact Number</h4>
                    <p>{selectedRegistration.contactNumber}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Address</h4>
                    <p>{selectedRegistration.address}</p>
                  </div>
                </div>
              </div>

              {/* Academic & Internship Details */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Academic & Internship Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">College</h4>
                    <p>{selectedRegistration.college.name}</p>
                    {selectedRegistration.college.location && (
                      <p className="text-sm text-muted-foreground">{selectedRegistration.college.location}</p>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Internship Type</h4>
                    <p>{selectedRegistration.internshipType.name}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Attendance Mode</h4>
                    <p>{selectedRegistration.attendanceMode.name}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Duration</h4>
                    <p>{selectedRegistration.internshipDuration.name}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Joining Date</h4>
                    <p>{format(new Date(selectedRegistration.joiningDate), 'MMM dd, yyyy')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground">Has Laptop</h4>
                    <p>{selectedRegistration.hasLaptop ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              {(selectedRegistration.referralName || selectedRegistration.internshipNote) && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Additional Information</h3>
                  <div className="space-y-2">
                    {selectedRegistration.referralName && (
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground">Referral Name</h4>
                        <p>{selectedRegistration.referralName}</p>
                      </div>
                    )}
                    {selectedRegistration.internshipNote && (
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground">Internship Note</h4>
                        <p>{selectedRegistration.internshipNote}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Documents */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Documents</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Resume</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(selectedRegistration.resumeUrl, '_blank')}
                    >
                      View Resume
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Payment Screenshot</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(selectedRegistration.paymentScreenshotUrl, '_blank')}
                    >
                      View Payment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the registration
              from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
