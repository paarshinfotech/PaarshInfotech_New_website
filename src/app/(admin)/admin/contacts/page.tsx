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

import { GoPlusCircle } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { LuArchive } from "react-icons/lu";
import { FaTrashCan } from "react-icons/fa6";

import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { ContactViewModal } from "@/components/admin/contacts/ContactViewModal";

const initialContacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Web Development Inquiry",
    date: "2024-05-20",
    status: "New",
    message:
      "Hi, I would like to inquire about your web development services for my new e-commerce project. It's a platform for selling handmade crafts and I need a full solution including payment gateways.",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Question about AI services",
    date: "2024-05-19",
    status: "Read",
    message:
      "Could you provide more details on your AI and ML offerings? I'm particularly interested in predictive analytics for customer churn.",
  },
  {
    id: 3,
    name: "Peter Jones",
    email: "peter@example.com",
    subject: "Partnership Proposal",
    date: "2024-05-18",
    status: "Archived",
    message:
      "We are a marketing agency interested in a strategic partnership to offer web development services to our clients. Let's schedule a call to discuss potential synergies.",
  },
];

export type Contact = (typeof initialContacts)[0];

export default function ContactsManagementPage() {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const handleUpdateStatus = (
    contactId: number,
    status: "Read" | "Archived" | "New"
  ) => {
    setContacts(
      contacts.map((c) => (c.id === contactId ? { ...c, status } : c))
    );
  };

  const handleView = (contact: Contact) => {
    setSelectedContact(contact);
    handleUpdateStatus(contact.id, "Read");
    setIsViewModalOpen(true);
  };

  const handleDelete = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = () => {
    if (selectedContact) {
      setContacts(contacts.filter((c) => c.id !== selectedContact.id));
    }
    setIsDeleteAlertOpen(false);
    setSelectedContact(null);
  };

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
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {contact.email}
                    </div>
                  </TableCell>
                  <TableCell>{contact.subject}</TableCell>
                  <TableCell>{contact.date}</TableCell>
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
                          onClick={() => handleUpdateStatus(contact.id, "Read")}
                          disabled={contact.status === "Read"}
                        >
                          <FaCheck className="mr-2 h-4 w-4" />
                          Mark as Read
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateStatus(contact.id, "Archived")
                          }
                        >
                          <LuArchive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(contact)}
                          className="text-destructive"
                        >
                          <FaTrashCan className="mr-2 h-4 w-4" />
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
            ? `the message from ${selectedContact.name}`
            : "the selected message"
        }
      />
    </>
  );
}
