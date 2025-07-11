
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const contacts = [
  { id: 1, name: "John Doe", email: "john@example.com", subject: "Web Development Inquiry", date: "2024-05-20", status: "New" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", subject: "Question about AI services", date: "2024-05-19", status: "Read" },
  { id: 3, name: "Peter Jones", email: "peter@example.com", subject: "Partnership Proposal", date: "2024-05-18", status: "Archived" },
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.map((contact) => (
                            <TableRow key={contact.id} className="cursor-pointer">
                                <TableCell>
                                    <div className="font-medium">{contact.name}</div>
                                    <div className="text-sm text-muted-foreground">{contact.email}</div>
                                </TableCell>
                                <TableCell>{contact.subject}</TableCell>
                                <TableCell>{contact.date}</TableCell>
                                <TableCell>
                                    <Badge variant={contact.status === 'New' ? 'default' : 'secondary'}>{contact.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
