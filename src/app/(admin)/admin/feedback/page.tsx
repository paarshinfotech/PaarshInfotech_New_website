
'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Check, Archive, Trash2 } from "lucide-react";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { FeedbackViewModal } from "@/components/admin/feedback/FeedbackViewModal";
import { initialFeedbacks } from "@/lib/feedbackData";
import type { Feedback } from "@/lib/feedbackData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FeedbackManagementPage() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

    const handleUpdateStatus = (id: number, status: 'Read' | 'Archived' | 'New') => {
        setFeedbacks(feedbacks.map(f => f.id === id ? { ...f, status } : f));
    };

    const handleView = (feedback: Feedback) => {
        setSelectedFeedback(feedback);
        if (feedback.status === 'New') {
            handleUpdateStatus(feedback.id, 'Read');
        }
        setIsViewModalOpen(true);
    }
    
    const handleDelete = (feedback: Feedback) => {
        setSelectedFeedback(feedback);
        setIsDeleteAlertOpen(true);
    }

    const confirmDelete = () => {
        if (selectedFeedback) {
            setFeedbacks(feedbacks.filter(f => f.id !== selectedFeedback.id));
        }
        setIsDeleteAlertOpen(false);
        setSelectedFeedback(null);
    }
    
    const getStatusVariant = (status: Feedback['status']) => {
        switch (status) {
            case 'New': return 'default';
            case 'Read': return 'secondary';
            case 'Archived': return 'outline';
            default: return 'default';
        }
    }
    
    const getSourceVariant = (source: Feedback['source']) => {
        switch (source) {
            case 'Customer': return 'default';
            case 'Team Member': return 'secondary';
            case 'Student': return 'outline';
            default: return 'default';
        }
    }

    const filteredFeedbacks = (source: Feedback['source'] | 'All') => {
        if (source === 'All') return feedbacks;
        return feedbacks.filter(f => f.source === source);
    }
    
    const FeedbackTable = ({ data }: { data: Feedback[] }) => (
         <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length > 0 ? data.map((feedback) => (
                    <TableRow key={feedback.id} className={feedback.status === 'New' ? 'font-bold' : ''}>
                        <TableCell>{feedback.name}</TableCell>
                        <TableCell>
                            <Badge variant={getSourceVariant(feedback.source)}>{feedback.source}</Badge>
                        </TableCell>
                        <TableCell className="max-w-sm truncate">{feedback.content}</TableCell>
                        <TableCell>
                            <Badge variant={getStatusVariant(feedback.status)}>{feedback.status}</Badge>
                        </TableCell>
                        <TableCell>{feedback.date}</TableCell>
                        <TableCell className="text-right">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => handleView(feedback)}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        View Feedback
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleUpdateStatus(feedback.id, 'Read')} disabled={feedback.status === 'Read'}>
                                        <Check className="mr-2 h-4 w-4" />
                                        Mark as Read
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleUpdateStatus(feedback.id, 'Archived')}>
                                        <Archive className="mr-2 h-4 w-4" />
                                        Archive
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDelete(feedback)} className="text-destructive">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                            No feedback in this category.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )

    return (
        <>
            <div className="space-y-6">
                 <div>
                    <h1 className="text-3xl font-bold">Feedback Management</h1>
                    <p className="text-muted-foreground">View and manage feedback from various sources.</p>
                </div>
                
                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="customers">Customers</TabsTrigger>
                        <TabsTrigger value="team">Team Members</TabsTrigger>
                        <TabsTrigger value="students">Students</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <Card><CardContent className="p-0"><FeedbackTable data={filteredFeedbacks('All')} /></CardContent></Card>
                    </TabsContent>
                    <TabsContent value="customers">
                        <Card><CardContent className="p-0"><FeedbackTable data={filteredFeedbacks('Customer')} /></CardContent></Card>
                    </TabsContent>
                    <TabsContent value="team">
                        <Card><CardContent className="p-0"><FeedbackTable data={filteredFeedbacks('Team Member')} /></CardContent></Card>
                    </TabsContent>
                    <TabsContent value="students">
                        <Card><CardContent className="p-0"><FeedbackTable data={filteredFeedbacks('Student')} /></CardContent></Card>
                    </TabsContent>
                </Tabs>
            </div>

            <FeedbackViewModal
                isOpen={isViewModalOpen}
                onOpenChange={setIsViewModalOpen}
                feedback={selectedFeedback}
            />

            <DeleteConfirmationDialog 
                isOpen={isDeleteAlertOpen}
                onOpenChange={setIsDeleteAlertOpen}
                onConfirm={confirmDelete}
                itemName={selectedFeedback ? `the feedback from ${selectedFeedback.name}` : "the selected feedback"}
            />
        </>
    )
}
