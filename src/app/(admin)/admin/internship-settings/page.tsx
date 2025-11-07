'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Pencil, Trash2, MoreVertical, Eye, Download, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface College {
  _id: string;
  name: string;
  location?: string;
  isActive: boolean;
}

interface InternshipType {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

interface Duration {
  _id: string;
  name: string;
  durationInMonths: number;
  isActive: boolean;
}

interface Mode {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export default function InternshipSettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [colleges, setColleges] = useState<College[]>([]);
  const [internshipTypes, setInternshipTypes] = useState<InternshipType[]>([]);
  const [durations, setDurations] = useState<Duration[]>([]);
  const [modes, setModes] = useState<Mode[]>([]);
  
  // Search states for each tab
  const [collegeSearch, setCollegeSearch] = useState('');
  const [typeSearch, setTypeSearch] = useState('');
  const [durationSearch, setDurationSearch] = useState('');
  const [modeSearch, setModeSearch] = useState('');
  
  // Pagination states
  const [collegePage, setCollegePage] = useState(1);
  const [typePage, setTypePage] = useState(1);
  const [durationPage, setDurationPage] = useState(1);
  const [modePage, setModePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const [termsContent, setTermsContent] = useState('');
  const [refundContent, setRefundContent] = useState('');
  const [isSavingPolicy, setIsSavingPolicy] = useState(false);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'college' | 'type' | 'duration' | 'mode'>('college');
  const [editingItem, setEditingItem] = useState<any>(null);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: string; id: string; name: string } | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    durationInMonths: '',
  });

  // Helper function to convert text to Title Case
  const toTitleCase = (text: string): string => {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => {
        // Keep words like "of", "and", "the" lowercase unless they're the first word
        const lowercaseWords = ['of', 'and', 'the', 'in', 'at', 'for', 'a', 'an'];
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ')
      .trim();
  };

  // Cleanup effect to ensure no lingering overlays
  useEffect(() => {
    return () => {
      // Cleanup any potential stuck overlays when component unmounts
      document.body.style.pointerEvents = '';
      document.body.style.overflow = '';
    };
  }, []);

  // Monitor dialog states and ensure proper cleanup
  useEffect(() => {
    if (!dialogOpen && !deleteDialogOpen) {
      // Ensure body is not blocked when dialogs are closed
      const timer = setTimeout(() => {
        document.body.style.pointerEvents = '';
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [dialogOpen, deleteDialogOpen]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [collegesRes, typesRes, durationsRes, modesRes, policiesRes] = await Promise.all([
        fetch('/api/colleges'),
        fetch('/api/internship-types'),
        fetch('/api/durations'),
        fetch('/api/modes'),
        fetch('/api/internship-policies'),
      ]);

      const [collegesData, typesData, durationsData, modesData, policiesData] = await Promise.all([
        collegesRes.json(),
        typesRes.json(),
        durationsRes.json(),
        modesRes.json(),
        policiesRes.json(),
      ]);

      if (collegesData.success) setColleges(collegesData.data);
      if (typesData.success) setInternshipTypes(typesData.data);
      if (durationsData.success) setDurations(durationsData.data);
      if (modesData.success) setModes(modesData.data);
      
      if (policiesData.success) {
        const termsPolicy = policiesData.data.find((p: any) => p.type === 'terms');
        const refundPolicy = policiesData.data.find((p: any) => p.type === 'refund');
        if (termsPolicy) setTermsContent(termsPolicy.content);
        if (refundPolicy) setRefundContent(refundPolicy.content);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load data',
        variant: 'destructive',
      });
    }
  };

  const openDialog = (type: 'college' | 'type' | 'duration' | 'mode', item?: any) => {
    setDialogType(type);
    setEditingItem(item || null);
    
    if (item) {
      setFormData({
        name: item.name || '',
        location: item.location || '',
        description: item.description || '',
        durationInMonths: item.durationInMonths?.toString() || '',
      });
    } else {
      setFormData({
        name: '',
        location: '',
        description: '',
        durationInMonths: '',
      });
    }
    
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingItem(null);
    setFormData({
      name: '',
      location: '',
      description: '',
      durationInMonths: '',
    });
    // Ensure cleanup after dialog closes
    setTimeout(() => {
      document.body.style.pointerEvents = '';
      document.body.style.overflow = '';
    }, 150);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog();
    } else {
      setDialogOpen(open);
    }
  };

  const handleDeleteDialogOpenChange = (open: boolean) => {
    setDeleteDialogOpen(open);
    if (!open) {
      setItemToDelete(null);
      // Ensure cleanup after dialog closes
      setTimeout(() => {
        document.body.style.pointerEvents = '';
        document.body.style.overflow = '';
      }, 150);
    }
  };

  // Handle paste event for bulk adding
  const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    // Disable bulk paste when editing an existing item
    if (editingItem) {
      return; // Allow normal paste behavior for editing
    }
    
    const pastedText = e.clipboardData.getData('text');
    const lines = pastedText.split('\n').filter(line => line.trim() !== '');
    
    // If multiple lines are pasted, process them as bulk entries
    if (lines.length > 1) {
      e.preventDefault(); // Prevent default paste behavior
      
      const confirmed = confirm(
        `You are about to add ${lines.length} ${dialogType === 'college' ? 'colleges' : 
          dialogType === 'type' ? 'internship types' : 
          dialogType === 'duration' ? 'durations' : 'attendance modes'}. Continue?`
      );
      
      if (!confirmed) return;
      
      setIsLoading(true);
      let successCount = 0;
      let failCount = 0;
      
      try {
        const endpoint = {
          college: '/api/colleges',
          type: '/api/internship-types',
          duration: '/api/durations',
          mode: '/api/modes',
        }[dialogType];

        // Process each line
        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) continue;
          
          try {
            const payload: any = { name: toTitleCase(trimmedLine) };
            
            const response = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });

            const data = await response.json();
            
            if (data.success) {
              successCount++;
            } else {
              failCount++;
            }
          } catch (error) {
            failCount++;
          }
        }
        
        toast({
          title: 'Bulk Add Complete',
          description: `Successfully added ${successCount} items. ${failCount > 0 ? `Failed: ${failCount}` : ''}`,
          variant: successCount > 0 ? 'default' : 'destructive',
        });
        
        closeDialog();
        fetchAllData();
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to add items',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    } else if (lines.length === 1) {
      // Single line - apply title case formatting
      e.preventDefault();
      setFormData({ ...formData, name: toTitleCase(lines[0]) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = {
        college: '/api/colleges',
        type: '/api/internship-types',
        duration: '/api/durations',
        mode: '/api/modes',
      }[dialogType];

      const payload: any = { name: toTitleCase(formData.name) }; // Apply title case
      
      if (dialogType === 'college' && formData.location) {
        payload.location = toTitleCase(formData.location); // Apply title case to location too
      }
      if ((dialogType === 'type' || dialogType === 'mode') && formData.description) {
        payload.description = formData.description;
      }
      if (dialogType === 'duration') {
        payload.durationInMonths = parseInt(formData.durationInMonths);
      }
      
      if (editingItem) {
        payload._id = editingItem._id;
      }

      const response = await fetch(endpoint, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: `${editingItem ? 'Updated' : 'Created'} successfully`,
        });
        closeDialog();
        fetchAllData();
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (type: string, id: string, name: string) => {
    setItemToDelete({ type, id, name });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    try {
      const endpoint = {
        college: '/api/colleges',
        type: '/api/internship-types',
        duration: '/api/durations',
        mode: '/api/modes',
      }[itemToDelete.type as 'college' | 'type' | 'duration' | 'mode'];

      const response = await fetch(`${endpoint}?id=${itemToDelete.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: 'Deleted successfully',
        });
        fetchAllData();
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  // Filter and paginate data
  const filterAndPaginate = (items: any[], searchTerm: string, page: number) => {
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = filtered.slice(startIndex, endIndex);
    
    return {
      items: paginated,
      total: filtered.length,
      pages: Math.ceil(filtered.length / itemsPerPage),
      allFiltered: filtered,
    };
  };

  // Export to CSV
  const exportToCSV = (type: 'college' | 'type' | 'duration' | 'mode') => {
    const data = {
      college: colleges,
      type: internshipTypes,
      duration: durations,
      mode: modes,
    }[type];

    if (data.length === 0) {
      toast({
        title: 'No Data',
        description: 'There are no items to export',
        variant: 'destructive',
      });
      return;
    }

    let headers: string[] = [];
    let rows: string[][] = [];

    if (type === 'college') {
      headers = ['Name', 'Location', 'Active'];
      rows = data.map((item: any) => [
        item.name,
        item.location || '',
        item.isActive ? 'Yes' : 'No',
      ]);
    } else if (type === 'type' || type === 'mode') {
      headers = ['Name', 'Description', 'Active'];
      rows = data.map((item: any) => [
        item.name,
        item.description || '',
        item.isActive ? 'Yes' : 'No',
      ]);
    } else if (type === 'duration') {
      headers = ['Name', 'Duration (Months)', 'Active'];
      rows = data.map((item: any) => [
        item.name,
        item.durationInMonths?.toString() || '',
        item.isActive ? 'Yes' : 'No',
      ]);
    }

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${type}_${format(new Date(), 'yyyy-MM-dd_HHmmss')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Export Successful',
      description: `Exported ${data.length} items to CSV`,
    });
  };

  const savePolicy = async (type: 'terms' | 'refund') => {
    setIsSavingPolicy(true);
    try {
      const content = type === 'terms' ? termsContent : refundContent;
      
      const response = await fetch('/api/internship-policies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, content }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: `${type === 'terms' ? 'Terms & Conditions' : 'Refund Policy'} saved successfully`,
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save',
        variant: 'destructive',
      });
    } finally {
      setIsSavingPolicy(false);
    }
  };

  const renderTable = (
    items: any[],
    type: 'college' | 'type' | 'duration' | 'mode',
    columns: string[],
    searchTerm: string,
    setSearchTerm: (value: string) => void,
    currentPage: number,
    setCurrentPage: (page: number) => void
  ) => {
    const { items: paginatedItems, total, pages } = filterAndPaginate(items, searchTerm, currentPage);
    
    return (
      <div className="space-y-4">
        {/* Header with Search and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${type === 'college' ? 'colleges' : type === 'type' ? 'internship types' : type === 'duration' ? 'durations' : 'attendance modes'}...`}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 max-w-sm"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => exportToCSV(type)}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => openDialog(type)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col}>{col}</TableHead>
                ))}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center text-muted-foreground py-8">
                    {searchTerm ? 'No matching items found' : 'No items found'}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    {type === 'college' && <TableCell>{item.location || '-'}</TableCell>}
                    {(type === 'type' || type === 'mode') && <TableCell>{item.description || '-'}</TableCell>}
                    {type === 'duration' && <TableCell>{item.durationInMonths} months</TableCell>}
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
                          <DropdownMenuItem onClick={() => openDialog(type, item)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteClick(type, item._id, item.name)}
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

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, total)} of {total} items
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="text-sm">
                Page {currentPage} of {pages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Internship Settings</CardTitle>
            <CardDescription>
              Manage colleges, internship types, durations, and attendance modes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="colleges" className="space-y-4">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="colleges">Colleges</TabsTrigger>
                <TabsTrigger value="types">Internship Types</TabsTrigger>
                <TabsTrigger value="durations">Durations</TabsTrigger>
                <TabsTrigger value="modes">Attendance Modes</TabsTrigger>
                <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
                <TabsTrigger value="refund">Refund Policy</TabsTrigger>
              </TabsList>
              
              <TabsContent value="colleges">
                {renderTable(colleges, 'college', ['Name', 'Location'], collegeSearch, setCollegeSearch, collegePage, setCollegePage)}
              </TabsContent>
              
              <TabsContent value="types">
                {renderTable(internshipTypes, 'type', ['Name', 'Description'], typeSearch, setTypeSearch, typePage, setTypePage)}
              </TabsContent>
              
              <TabsContent value="durations">
                {renderTable(durations, 'duration', ['Name', 'Duration'], durationSearch, setDurationSearch, durationPage, setDurationPage)}
              </TabsContent>
              
              <TabsContent value="modes">
                {renderTable(modes, 'mode', ['Name', 'Description'], modeSearch, setModeSearch, modePage, setModePage)}
              </TabsContent>
              
              <TabsContent value="terms">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Terms & Conditions</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Define the terms and conditions that interns must accept during registration.
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="termsContent">Terms & Conditions Content *</Label>
                    <Textarea
                      id="termsContent"
                      value={termsContent}
                      onChange={(e) => setTermsContent(e.target.value)}
                      placeholder="Enter the terms and conditions..."
                      rows={15}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => savePolicy('terms')}
                      disabled={isSavingPolicy || !termsContent}
                    >
                      {isSavingPolicy ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Terms & Conditions'
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="refund">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Refund Policy</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Define the refund policy that interns must accept during registration.
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="refundContent">Refund Policy Content *</Label>
                    <Textarea
                      id="refundContent"
                      value={refundContent}
                      onChange={(e) => setRefundContent(e.target.value)}
                      placeholder="Enter the refund policy..."
                      rows={15}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => savePolicy('refund')}
                      disabled={isSavingPolicy || !refundContent}
                    >
                      {isSavingPolicy ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Refund Policy'
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Dialog for Add/Edit */}
      <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit' : 'Add New'}{' '}
              {dialogType === 'college' && 'College'}
              {dialogType === 'type' && 'Internship Type'}
              {dialogType === 'duration' && 'Duration'}
              {dialogType === 'mode' && 'Attendance Mode'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details below
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onPaste={handlePaste}
                  placeholder={editingItem ? "Enter name" : "Enter name (or paste multiple names, one per line)"}
                />
                {!editingItem && (
                  <p className="text-xs text-muted-foreground mt-3">
                    Tip: Paste multiple names (one per line) to add them all at once. Names will be auto-formatted to Title Case.
                  </p>
                )}
              </div>
              
              {dialogType === 'college' && (
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter location"
                  />
                </div>
              )}
              
              {(dialogType === 'type' || dialogType === 'mode') && (
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter description"
                  />
                </div>
              )}
              
              {dialogType === 'duration' && (
                <div>
                  <Label htmlFor="durationInMonths">Duration (in months) *</Label>
                  <Input
                    id="durationInMonths"
                    type="number"
                    required
                    value={formData.durationInMonths}
                    onChange={(e) => setFormData({ ...formData, durationInMonths: e.target.value })}
                    placeholder="Enter duration in months"
                    min="1"
                  />
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={handleDeleteDialogOpenChange}>
        <AlertDialogContent className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete <strong>{itemToDelete?.name}</strong> from the database.
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
