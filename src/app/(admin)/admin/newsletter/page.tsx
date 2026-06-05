"use client";

import { useState, useMemo, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FaSearch, FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { useToast } from "@/hooks/use-toast";
import {
    useGetNewsletterSubscribersQuery,
    useDeleteNewsletterSubscriberMutation,
} from "@/services/api";
import { format } from "date-fns";

interface Subscriber {
    _id: string;
    email: string;
    subscribedAt: string;
}

export default function NewsletterPage() {
    const { toast } = useToast();
    const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<number | "all">(10);

    const {
        data: subscribers = [],
        isLoading,
        error,
    } = useGetNewsletterSubscribersQuery(undefined);

    const [deleteSubscriber] = useDeleteNewsletterSubscriberMutation();

    // Filter subscribers by email
    const filteredSubscribers = useMemo(() => {
        if (!searchQuery.trim()) return subscribers;
        const query = searchQuery.toLowerCase();
        return (subscribers as Subscriber[]).filter((sub) =>
            sub.email.toLowerCase().includes(query)
        );
    }, [subscribers, searchQuery]);

    // Pagination
    const totalPages =
        itemsPerPage === "all"
            ? 1
            : Math.ceil(filteredSubscribers.length / itemsPerPage);
    const startIndex =
        itemsPerPage === "all" ? 0 : (currentPage - 1) * itemsPerPage;
    const endIndex =
        itemsPerPage === "all"
            ? filteredSubscribers.length
            : startIndex + itemsPerPage;
    const paginatedSubscribers = filteredSubscribers.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, itemsPerPage]);

    useEffect(() => {
        return () => {
            document.body.style.pointerEvents = "";
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        if (!isDeleteAlertOpen) {
            const timer = setTimeout(() => {
                document.body.style.pointerEvents = "";
                document.body.style.overflow = "";
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isDeleteAlertOpen]);

    const handleDelete = (subscriber: Subscriber) => {
        setSelectedSubscriber(subscriber);
        setIsDeleteAlertOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedSubscriber) {
            try {
                await deleteSubscriber(selectedSubscriber._id).unwrap();
                toast({
                    title: "Subscriber Removed",
                    description: `${selectedSubscriber.email} has been removed from the newsletter.`,
                });
            } catch {
                toast({
                    title: "Error",
                    description: "Failed to remove subscriber.",
                    variant: "destructive",
                });
            }
        }
        setIsDeleteAlertOpen(false);
        setSelectedSubscriber(null);
    };

    const handlePageChange = (page: number) => setCurrentPage(page);
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5;
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push("...");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push("...");
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push("...");
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push("...");
                pages.push(totalPages);
            }
        }
        return pages;
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: Failed to load subscribers</div>;

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <LuMail className="w-5 h-5" />
                                Newsletter Subscribers
                            </CardTitle>
                            <CardDescription>
                                View and manage all newsletter email subscriptions.
                            </CardDescription>
                        </div>
                        <div className="text-sm text-muted-foreground bg-secondary px-3 py-1.5 rounded-full font-medium">
                            {(subscribers as Subscriber[]).length} subscriber{(subscribers as Subscriber[]).length !== 1 ? "s" : ""}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Search Bar and Entries Selector */}
                    <div className="flex items-center gap-4 mb-4 flex-wrap">
                        <div className="relative flex-1 max-w-sm">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                type="text"
                                placeholder="Search by email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        {searchQuery && (
                            <Button variant="ghost" onClick={() => setSearchQuery("")} className="text-sm">
                                Clear
                            </Button>
                        )}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground whitespace-nowrap">Show:</span>
                            <Select
                                value={itemsPerPage.toString()}
                                onValueChange={(value) =>
                                    setItemsPerPage(value === "all" ? "all" : parseInt(value))
                                }
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
                        Showing {paginatedSubscribers.length > 0 ? startIndex + 1 : 0} to{" "}
                        {Math.min(endIndex, filteredSubscribers.length)} of{" "}
                        {filteredSubscribers.length} subscribers
                        {searchQuery && ` (filtered from ${(subscribers as Subscriber[]).length} total)`}
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[60px]">#</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Subscribed On</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedSubscribers.length > 0 ? (
                                paginatedSubscribers.map((sub: Subscriber, index: number) => (
                                    <TableRow key={sub._id}>
                                        <TableCell className="text-muted-foreground">
                                            {startIndex + index + 1}
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{sub.email}</div>
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(sub.subscribedAt), "PP")}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => handleDelete(sub)}
                                            >
                                                <FaTrash className="h-4 w-4 mr-1" />
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                        {searchQuery
                                            ? "No subscribers found matching your search."
                                            : "No newsletter subscribers yet."}
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
                                    {getPageNumbers().map((page, index) =>
                                        page === "..." ? (
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
                                    )}
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

            <DeleteConfirmationDialog
                isOpen={isDeleteAlertOpen}
                onOpenChange={setIsDeleteAlertOpen}
                onConfirm={confirmDelete}
                itemName={
                    selectedSubscriber
                        ? `the subscriber: "${selectedSubscriber.email}"`
                        : "the selected subscriber"
                }
            />
        </>
    );
}
