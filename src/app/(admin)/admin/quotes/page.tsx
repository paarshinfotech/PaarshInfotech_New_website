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
import { FaTrash } from "react-icons/fa6";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { QuoteViewModal } from "@/components/admin/quotes/QuoteViewModal";
import { useToast } from "@/hooks/use-toast";
import {
  useGetQuotesQuery,
  useDeleteQuoteMutation,
} from "../../../../services/api";
import { format } from "date-fns";
import { AdminTableSkeleton } from "@/components/ui/skeletons";

export interface Quote {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  services: string[];
  createdAt: string;
}

export default function QuotesManagementPage() {
  const { toast } = useToast();
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const {
    data: quotes = [],
    isLoading,
    error,
  } = useGetQuotesQuery(undefined);
  const [deleteQuote] = useDeleteQuoteMutation();

  const handleView = (quote: Quote) => {
    setSelectedQuote(quote);
    setIsViewModalOpen(true);
  };

  const handleDelete = (quote: Quote) => {
    setSelectedQuote(quote);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedQuote) {
      try {
        await deleteQuote(selectedQuote._id).unwrap();
        toast({
          title: "Quote Deleted",
          description: `Quote from ${selectedQuote.name} has been deleted.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete quote.",
          variant: "destructive",
        });
      }
    }
    setIsDeleteAlertOpen(false);
    setSelectedQuote(null);
  };

  if (isLoading) {
    return <AdminTableSkeleton title="Quote Requests" />;
  }

  if (error) {
    return <div>Error: Failed to load quotes.</div>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Quote Requests</CardTitle>
          <CardDescription>
            View and manage quote requests from your website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote: Quote) => (
                <TableRow key={quote._id}>
                  <TableCell>
                    <div className="font-medium">{quote.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {quote.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {quote.phone}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {quote.message}
                  </TableCell>
                  <TableCell className="max-w-xs">
                     <div className="flex flex-wrap gap-1">
                        {quote.services.map(service => (
                            <Badge key={service} variant="secondary">{service}</Badge>
                        ))}
                    </div>
                  </TableCell>
                  <TableCell>{format(new Date(quote.createdAt), "PP")}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleView(quote)}>
                          <IoEyeOutline className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(quote)}
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

      <QuoteViewModal
        isOpen={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        quote={selectedQuote}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={
          selectedQuote ? `the quote from ${selectedQuote.name}` : "the selected quote"
        }
      />
    </>
  );
}
