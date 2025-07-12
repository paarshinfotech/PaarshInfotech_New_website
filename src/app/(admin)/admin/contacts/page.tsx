
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Check, Archive, Trash2 } from "lucide-react";

const contacts = [
  { id: 1, name: "John Doe", email: "john@example.com", subject: "Web Development Inquiry", date: "2024-05-20", status: "New", message: "Hi, I would like to inquire about your web development services for my new e-commerce project." },
  { id: 2, name: "Jane Smith", email: "jane@example.com", subject: "Question about AI services", date: "2024-05-19", status: "Read", message: "Could you provide more details on your AI and ML offerings? I'm interested in predictive analytics." },
  { id: 3, name: "Peter Jones", email: "peter@example.com", subject: "Partnership Proposal", date: "2024-05-18", status: "Archived", message: "We are interested in a strategic partnership. Let's schedule a call to discuss." },
];

export default function ContactsManagementPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Contact Submissions</CardTitle>
                <CardDescription>View and manage messages from your contact form.</CardDescription>
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
                                    <div className="text-sm text-muted-foreground">{contact.email}</div>
                                </TableCell>
                                <TableCell>{contact.subject}</TableCell>
                                <TableCell>{contact.date}</TableCell>
                                <TableCell>
                                    <Badge variant={contact.status === 'New' ? 'default' : (contact.status === 'Read' ? 'secondary' : 'outline')}>{contact.status}</Badge>
                                </TableCell>
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
                                            <DropdownMenuItem>
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Message
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Check className="mr-2 h-4 w-4" />
                                                Mark as Read
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Archive className="mr-2 h-4 w-4" />
                                                Archive
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" />
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
    )
}
