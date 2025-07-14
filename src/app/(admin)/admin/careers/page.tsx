
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal, Edit, Trash2, CalendarClock } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobFormModal } from "@/components/admin/careers/JobFormModal";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { format } from "date-fns";
import { ApplicantsViewModal } from "@/components/admin/careers/ApplicantsViewModal";

export interface Applicant {
    id: number;
    name: string;
    email: string;
    resumeUrl: string;
}

export interface Job {
  id: number;
  title: string;
  location: string;
  type: 'Full-Time' | 'Internship';
  status: 'Open' | 'Closed' | 'Scheduled';
  applicants: Applicant[];
  description: string;
  skills: string[];
  publishDate: Date;
}

const initialJobs: Job[] = [
  { id: 1, title: "Senior React Developer", location: "Nashik, India", type: 'Full-Time', status: "Open", applicants: [
      { id: 101, name: "Aarav Sharma", email: "aarav.s@example.com", resumeUrl: "#" },
      { id: 102, name: "Isha Gupta", email: "isha.g@example.com", resumeUrl: "#" },
  ], description: "We are looking for an experienced React developer to join our team.", skills: ["React", "TypeScript", "Next.js"], publishDate: new Date("2024-01-15") },
  { id: 2, title: "Lead Python/Django Engineer", location: "Nashik, India", type: 'Full-Time', status: "Open", applicants: [
      { id: 201, name: "Rohan Verma", email: "rohan.v@example.com", resumeUrl: "#" },
  ], description: "Lead our backend team and work on exciting projects.", skills: ["Python", "Django", "PostgreSQL"], publishDate: new Date("2024-02-01") },
  { id: 3, title: "UI/UX Designer", location: "Remote", type: 'Full-Time', status: "Closed", applicants: [], description: "Design beautiful and intuitive interfaces for our products.", skills: ["Figma", "Sketch", "User Research"], publishDate: new Date("2023-12-10") },
  { id: 4, title: "Frontend Development Intern", location: "Nashik, India", type: 'Internship', status: "Open", applicants: [
      { id: 401, name: "Priya Patel", email: "priya.p@example.com", resumeUrl: "#" },
      { id: 402, name: "Sameer Singh", email: "sameer.s@example.com", resumeUrl: "#" },
      { id: 403, name: "Anika Reddy", email: "anika.r@example.com", resumeUrl: "#" },
  ], description: "An exciting opportunity for aspiring frontend developers.", skills: ["HTML", "CSS", "JavaScript"], publishDate: new Date("2024-03-01") },
  { id: 5, title: "Backend Development Intern", location: "Nashik, India", type: 'Internship', status: "Scheduled", applicants: [], description: "Learn backend development with Python and Django.", skills: ["Python", "SQL"], publishDate: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000) }, // 10 days from now
];


export default function CareersManagementPage() {
    const [jobs, setJobs] = useState<Job[]>(initialJobs);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const fullTimeJobs = jobs.filter(job => job.type === 'Full-Time');
    const internships = jobs.filter(job => job.type === 'Internship');

    const handleAdd = () => {
        setSelectedJob(null);
        setIsModalOpen(true);
    };

    const handleEdit = (job: Job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };
    
    const handleDelete = (job: Job) => {
        setSelectedJob(job);
        setIsDeleteAlertOpen(true);
    }

    const handleViewApplicants = (job: Job) => {
        setSelectedJob(job);
        setIsApplicantsModalOpen(true);
    }

    const confirmDelete = () => {
        if (selectedJob) {
            setJobs(jobs.filter(j => j.id !== selectedJob.id));
        }
        setIsDeleteAlertOpen(false);
        setSelectedJob(null);
    }

    const handleSave = (jobData: any) => {
        if (selectedJob && jobData.id) {
            // Edit
            setJobs(jobs.map(j => j.id === jobData.id ? { ...j, ...jobData } : j));
        } else {
            // Add
            setJobs([...jobs, { ...jobData, id: Date.now(), applicants: [] }]);
        }
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    const getStatusVariant = (status: Job['status']) => {
        switch (status) {
            case 'Open': return 'default';
            case 'Closed': return 'secondary';
            case 'Scheduled': return 'outline';
            default: return 'default';
        }
    }

    const JobTable = ({ data }: { data: Job[] }) => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Publish Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((job) => (
                    <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{job.applicants.length}</TableCell>
                        <TableCell>
                            <Badge variant={getStatusVariant(job.status)} className="capitalize">
                                {job.status === 'Scheduled' && <CalendarClock className="mr-1.5 h-3 w-3" />}
                                {job.status}
                            </Badge>
                        </TableCell>
                         <TableCell>{format(job.publishDate, 'PP')}</TableCell>
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
                                    <DropdownMenuItem onClick={() => handleViewApplicants(job)}>
                                        View Applicants
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleEdit(job)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDelete(job)} className="text-destructive">
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
    )

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Careers Management</h1>
                        <p className="text-muted-foreground">Manage job openings and internships.</p>
                    </div>
                    <Button onClick={handleAdd}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Opening
                    </Button>
                </div>
                
                <Tabs defaultValue="full-time">
                    <TabsList>
                        <TabsTrigger value="full-time">Full-Time Jobs ({fullTimeJobs.length})</TabsTrigger>
                        <TabsTrigger value="internships">Internships ({internships.length})</TabsTrigger>
                    </TabsList>
                    <TabsContent value="full-time">
                        <Card>
                            <CardContent className="p-0">
                                <JobTable data={fullTimeJobs} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="internships">
                        <Card>
                            <CardContent className="p-0">
                                <JobTable data={internships} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            
            <JobFormModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSave={handleSave}
                job={selectedJob}
            />

            <ApplicantsViewModal
                isOpen={isApplicantsModalOpen}
                onOpenChange={setIsApplicantsModalOpen}
                job={selectedJob}
            />

            <DeleteConfirmationDialog 
                isOpen={isDeleteAlertOpen}
                onOpenChange={setIsDeleteAlertOpen}
                onConfirm={confirmDelete}
                itemName={selectedJob?.title || "the selected job opening"}
            />
        </>
    )
}
