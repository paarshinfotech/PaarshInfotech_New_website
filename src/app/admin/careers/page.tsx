
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fullTimeJobs = [
  { title: "Senior React Developer", location: "Nashik, India", status: "Open", applicants: 12 },
  { title: "Lead Python/Django Engineer", location: "Nashik, India", status: "Open", applicants: 8 },
  { title: "UI/UX Designer", location: "Remote", status: "Closed", applicants: 25 },
];

const internships = [
    { title: "Frontend Development Intern", location: "Nashik, India", status: "Open", applicants: 35 },
    { title: "Backend Development Intern", location: "Nashik, India", status: "Open", applicants: 28 },
]

export default function CareersManagementPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Careers Management</h1>
                    <p className="text-muted-foreground">Manage job openings and internships.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Opening
                </Button>
            </div>
            
            <Tabs defaultValue="full-time">
                <TabsList>
                    <TabsTrigger value="full-time">Full-Time Jobs</TabsTrigger>
                    <TabsTrigger value="internships">Internships</TabsTrigger>
                </TabsList>
                <TabsContent value="full-time">
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Applicants</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {fullTimeJobs.map((job) => (
                                        <TableRow key={job.title}>
                                            <TableCell className="font-medium">{job.title}</TableCell>
                                            <TableCell>{job.location}</TableCell>
                                            <TableCell>{job.applicants}</TableCell>
                                            <TableCell><Badge variant={job.status === 'Open' ? 'default' : 'secondary'}>{job.status}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View Applicants</DropdownMenuItem>
                                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                                        <DropdownMenuItem>Close Opening</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="internships">
                    <Card>
                         <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Applicants</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {internships.map((job) => (
                                        <TableRow key={job.title}>
                                            <TableCell className="font-medium">{job.title}</TableCell>
                                            <TableCell>{job.location}</TableCell>
                                             <TableCell>{job.applicants}</TableCell>
                                            <TableCell><Badge variant={job.status === 'Open' ? 'default' : 'secondary'}>{job.status}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                 <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View Applicants</DropdownMenuItem>
                                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                                        <DropdownMenuItem>Close Opening</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
