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
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface Registration {
  _id: string;
  fullName: string;
  email: string;
  contactNumber: string;
  address: string;
  college: { name: string; location?: string };
  internshipType: { name: string };
  attendanceMode: { name: string };
  joiningDate: string;
  internshipDuration: { name: string; durationInMonths: number };
  hasLaptop: boolean;
  referralName?: string;
  internshipNote?: string;
  resumeUrl: string;
  paymentScreenshotUrl: string;
  registrationNumber: string;
  createdAt: string;
}

export default function RegistrationsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchRegistrations();
  }, [pagination.page]);

  useEffect(() => {
    filterRegistrations();
  }, [searchQuery, registrations]);

  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/register?page=${pagination.page}&limit=${pagination.limit}`);
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

  const filterRegistrations = () => {
    if (!searchQuery.trim()) {
      setFilteredRegistrations(registrations);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = registrations.filter((reg) =>
      reg.fullName.toLowerCase().includes(query) ||
      reg.email.toLowerCase().includes(query) ||
      reg.contactNumber.includes(query) ||
      reg.registrationNumber.toLowerCase().includes(query) ||
      reg.college.name.toLowerCase().includes(query)
    );
    setFilteredRegistrations(filtered);
  };

  const viewDetails = (registration: Registration) => {
    setSelectedRegistration(registration);
    setDialogOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
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
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Internship Registrations</CardTitle>
            <CardDescription>
              View and manage all internship registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="mb-6">
              <Input
                placeholder="Search by name, email, registration number, or college..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reg. Number</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>College</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Joining Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground">
                        No registrations found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRegistrations.map((registration) => (
                      <TableRow key={registration._id}>
                        <TableCell className="font-medium">
                          {registration.registrationNumber}
                        </TableCell>
                        <TableCell>{registration.fullName}</TableCell>
                        <TableCell>{registration.email}</TableCell>
                        <TableCell>{registration.contactNumber}</TableCell>
                        <TableCell>{registration.college.name}</TableCell>
                        <TableCell>{registration.internshipType.name}</TableCell>
                        <TableCell>
                          {format(new Date(registration.joiningDate), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewDetails(registration)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.pages} ({pagination.total} total registrations)
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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
    </div>
  );
}
