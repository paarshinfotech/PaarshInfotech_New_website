"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { GoPlusCircle } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { JobFormModal } from "@/components/admin/careers/JobFormModal";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { format } from "date-fns";
import { ApplicantsViewModal } from "@/components/admin/careers/ApplicantsViewModal";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  useGetJobsQuery,
  useAddJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} from "../../../../services/api";

export interface Applicant {
  _id: string;
  name: string;
  email: string;
  resumeUrl: string;
}

export interface Job {
  _id: string;
  title: string;
  location: string;
  type: "Full-Time" | "Internship";
  status: "Open" | "Closed" | "Scheduled";
  published: boolean;
  applicants: string[] | Applicant[];
  description: string;
  skills: string[];
  publishDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function CareersManagementPage() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const {
    data: jobs = [],
    isLoading: jobsLoading,
    error: jobsError,
  } = useGetJobsQuery(undefined);

  console.log("Jobs Data : ", jobs);

  const [addJob] = useAddJobMutation();
  const [updateJob] = useUpdateJobMutation();
  const [deleteJob] = useDeleteJobMutation();

  const fullTimeJobs = jobs.filter((job: Job) => job.type === "Full-Time");
  const internships = jobs.filter((job: Job) => job.type === "Internship");

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
  };

  const handleViewApplicants = (job: Job) => {
    setSelectedJob(job);
    setIsApplicantsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedJob) {
      try {
        await deleteJob(selectedJob._id).unwrap();
        toast({
          title: "Job Deleted",
          description: `${selectedJob.title} has been deleted successfully.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete job.",
          variant: "destructive",
        });
      }
    }
    setIsDeleteAlertOpen(false);
    setSelectedJob(null);
  };

  const handleSave = async (jobData: {
    title: string;
    location: string;
    type: "Full-Time" | "Internship";
    status: "Open" | "Closed" | "Scheduled";
    description: string;
    skills: string[];
    publishDate: Date;
    published?: boolean;
  }) => {
    try {
      const dataToSave = {
        ...jobData,
        publishDate: jobData.publishDate.toISOString(),
      };
      if (selectedJob) {
        await updateJob({
          _id: selectedJob._id,
          ...dataToSave,
          published: dataToSave.published ?? selectedJob.published,
        }).unwrap();
        toast({
          title: "Job Updated",
          description: `${jobData.title} has been updated successfully.`,
        });
      } else {
        await addJob({
          ...dataToSave,
          published: dataToSave.published ?? true,
          applicants: [],
        }).unwrap();
        toast({
          title: "Job Created",
          description: `${jobData.title} has been created successfully.`,
        });
      }
      setIsModalOpen(false);
      setSelectedJob(null);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${selectedJob ? "update" : "create"} job.`,
        variant: "destructive",
      });
    }
  };

  const handleTogglePublished = async (jobId: string, published: boolean) => {
    try {
      const job = jobs.find((j: Job) => j._id === jobId);
      if (!job) return;
      await updateJob({
        _id: jobId,
        title: job.title,
        location: job.location,
        type: job.type,
        status: job.status,
        description: job.description,
        skills: job.skills,
        publishDate: job.publishDate,
        published,
      }).unwrap();
      toast({
        title: "Status Updated",
        description: `${job.title}'s visibility has been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update visibility status.",
        variant: "destructive",
      });
    }
  };

  const getStatusVariant = (status: Job["status"]) => {
    switch (status) {
      case "Open":
        return "default";
      case "Closed":
        return "secondary";
      case "Scheduled":
        return "outline";
      default:
        return "default";
    }
  };

  const JobTable = ({ data }: { data: Job[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Applicants</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Published</TableHead>
          <TableHead>Publish Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((job: Job) => (
          <TableRow key={job._id}>
            <TableCell className="font-medium">
              <div>{job.title}</div>
              <div className="text-xs text-muted-foreground">
                {job.location}
              </div>
            </TableCell>
            <TableCell>
              {Array.isArray(job.applicants) ? job.applicants.length : 0}
            </TableCell>
            <TableCell>
              <Badge
                variant={getStatusVariant(job.status)}
                className="capitalize"
              >
                {job.status === "Scheduled" && (
                  <MdDateRange className="mr-1.5 h-3 w-3" />
                )}
                {job.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Switch
                id={`published-${job._id}`}
                checked={job.published}
                onCheckedChange={(checked) =>
                  handleTogglePublished(job._id, checked)
                }
              />
            </TableCell>
            <TableCell>{format(new Date(job.publishDate), "PP")}</TableCell>
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
                  <DropdownMenuItem
                    onClick={() => handleViewApplicants(job)}
                    disabled={
                      Array.isArray(job.applicants) &&
                      job.applicants.length === 0
                    }
                  >
                    View Applicants
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleEdit(job)}>
                    <FiEdit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(job)}
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
  );

  if (jobsLoading) {
    return <div>Loading...</div>;
  }

  if (jobsError) {
    return <div>Error: Failed to load jobs</div>;
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Careers Management</h1>
            <p className="text-muted-foreground">
              Manage job openings and control their visibility on the public
              site.
            </p>
          </div>
          <Button onClick={handleAdd}>
            <GoPlusCircle className="mr-2 h-4 w-4" />
            New Opening
          </Button>
        </div>

        <Tabs defaultValue="full-time">
          <TabsList>
            <TabsTrigger value="full-time">
              Full-Time Jobs ({fullTimeJobs.length})
            </TabsTrigger>
            <TabsTrigger value="internships">
              Internships ({internships.length})
            </TabsTrigger>
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
  );
}
