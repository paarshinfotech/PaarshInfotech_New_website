"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { LuEye } from "react-icons/lu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetApplicantsByJobQuery } from "../../../services/api";

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
}

interface ApplicantsViewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job | null;
}

export function ApplicantsViewModal({ isOpen, onOpenChange, job }: ApplicantsViewModalProps) {
  const { data: applicants = [], isLoading, error } = useGetApplicantsByJobQuery(job?._id, {
    skip: !job?._id || !isOpen,
  });

  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Applicants for {job.title}</DialogTitle>
          <DialogDescription>
            {isLoading
              ? "Loading applicants..."
              : error
              ? "Failed to load applicants."
              : applicants.length > 0
              ? `Found ${applicants.length} applicant(s).`
              : "There are currently no applicants for this position."}
          </DialogDescription>
        </DialogHeader>
        {applicants.length > 0 && !isLoading && !error && (
          <ScrollArea className="max-h-[60vh] rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Resume</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicants.map((applicant: Applicant) => (
                  <TableRow key={applicant._id}>
                    <TableCell className="font-medium">{applicant.name}</TableCell>
                    <TableCell>{applicant.email}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <a href={applicant.resumeUrl} target="_blank" rel="noopener noreferrer">
                          <LuEye className="mr-1 h-4 w-4" />
                          View
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}