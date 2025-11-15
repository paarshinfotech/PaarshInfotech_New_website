"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosMore } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { FaBoxArchive } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { ContactViewModal } from "@/components/admin/contacts/ContactViewModal";
import { useToast } from "@/hooks/use-toast";
import {
  useGetContactsQuery,
  useUpdateContactStatusMutation,
  useDeleteContactMutation,
} from "../../../../services/api";
import { format } from "date-fns";

export interface Contact {
  id: Number;
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  status: "New" | "Read" | "Archived";
}

export default function ContactsManagementPage() {
  const { toast } = useToast();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number | "all">(10);

  const {
    data: contacts = [],
    isLoading: contactsLoading,
    error: contactsError,
  } = useGetContactsQuery(undefined);
  const [updateContactStatus] = useUpdateContactStatusMutation();
  const [deleteContact] = useDeleteContactMutation();

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;
    
    const query = searchQuery.toLowerCase();
    return contacts.filter((contact: Contact) => {
      return (
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.message.toLowerCase().includes(query) ||
        contact.subject?.toLowerCase().includes(query)
      );
    });
  }, [contacts, searchQuery]);

  // Calculate pagination
  const totalPages = itemsPerPage === "all" ? 1 : Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = itemsPerPage === "all" ? 0 : (currentPage - 1) * itemsPerPage;
  const endIndex = itemsPerPage === "all" ? filteredContacts.length : startIndex + itemsPerPage;
  const paginatedContacts = filteredContacts.slice(startIndex, endIndex);

  // Reset to page 1 when search query or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage]);

    // Cleanup effect to ensure no lingering overlays
  useEffect(() => {
    return () => {
      document.body.style.pointerEvents = '';
      document.body.style.overflow = '';
    };
  }, []);

  // Monitor modal states and ensure proper cleanup
  useEffect(() => {
    if (!isViewModalOpen && !isDeleteAlertOpen) {
      const timer = setTimeout(() => {
        document.body.style.pointerEvents = '';
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isViewModalOpen, isDeleteAlertOpen]);

  const handleUpdateStatus = async (
    contactId: string,
    status: "Read" | "Archived" | "New"
  ) => {
    try {
      await updateContactStatus({ _id: contactId, status }).unwrap();
      toast({
        title: "Status Updated",
        description: `Contact status has been updated to ${status}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update contact status.",
        variant: "destructive",
      });
    }
  };

  const handleView = (contact: Contact) => {
    setSelectedContact(contact);
    if (contact.status !== "Read") {
      handleUpdateStatus(contact._id, "Read");
    }
    setIsViewModalOpen(true);
  };

  const handleDelete = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedContact) {
      try {
        await deleteContact(selectedContact._id).unwrap();
        toast({
          title: "Contact Deleted",
          description: `Message from ${selectedContact.name} has been deleted.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete contact.",
          variant: "destructive",
        });
      }
    }
    setIsDeleteAlertOpen(false);
    setSelectedContact(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
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

  if (contactsLoading) {
    return <div>Loading...</div>;
  }

  if (contactsError) {
    return <div>Error: Failed to load contacts</div>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Contact Submissions</CardTitle>
          <CardDescription>
            View and manage messages from your contact form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search Bar and Entries Selector */}
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by name, email, or message..."
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
            Showing {paginatedContacts.length > 0 ? startIndex + 1 : 0} to{" "}
            {Math.min(endIndex, filteredContacts.length)} of {filteredContacts.length} contacts
            {searchQuery && ` (filtered from ${contacts.length} total)`}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedContacts.length > 0 ? (
                paginatedContacts.map((contact: Contact) => (
                  <TableRow key={contact._id}>
                    <TableCell>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {contact.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {contact.phone || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {contact.message}
                    </TableCell>
                    <TableCell>{format(new Date(contact.date), "PP")}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          contact.status === "New"
                            ? "default"
                            : contact.status === "Read"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {contact.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <IoIosMore className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleView(contact)}>
                            <IoEyeOutline className="mr-2 h-4 w-4" />
                            View Message
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUpdateStatus(contact._id, "Read")}
                            disabled={contact.status === "Read"}
                          >
                            <FaCheck className="mr-2 h-4 w-4" />
                            Mark as Read
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleUpdateStatus(contact._id, "Archived")}
                          >
                            <FaBoxArchive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(contact)}
                            className="text-destructive"
                          >
                            <FaTrash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {searchQuery ? "No contacts found matching your search." : "No contacts available."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft className="h-4 w-4 mr-1" />
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
                        onClick={() => handlePageChange(page as number)}
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
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <FaChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <ContactViewModal
        isOpen={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        contact={selectedContact}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={
          selectedContact
            ? `the message: "${selectedContact.message.slice(0, 30)}..."`
            : "the selected message"
        }
      />
    </>
  );
}