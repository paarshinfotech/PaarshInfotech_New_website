"use client";

import { useState } from "react";
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
  _id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: "New" | "Read" | "Archived";
}

export default function ContactsManagementPage() {
  const { toast } = useToast();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const {
    data: contacts = [],
    isLoading: contactsLoading,
    error: contactsError,
  } = useGetContactsQuery(undefined);
  const [updateContactStatus] = useUpdateContactStatusMutation();
  const [deleteContact] = useDeleteContactMutation();

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact: Contact) => (
                <TableRow key={contact._id}>
                  <TableCell>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {contact.email}
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
              ))}
            </TableBody>
          </Table>
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