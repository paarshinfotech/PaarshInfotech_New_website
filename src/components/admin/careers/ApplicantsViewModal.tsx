
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Job } from "@/app/(admin)/admin/careers/page";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface ApplicantsViewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job | null;
}

export function ApplicantsViewModal({ isOpen, onOpenChange, job }: ApplicantsViewModalProps) {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Applicants for {job.title}</DialogTitle>
          <DialogDescription>
            {job.applicants.length > 0
              ? `Found ${job.applicants.length} applicant(s).`
              : "There are currently no applicants for this position."}
          </DialogDescription>
        </DialogHeader>
        {job.applicants.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Resume</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {job.applicants.map((applicant) => (
                        <TableRow key={applicant.id}>
                            <TableCell className="font-medium">{applicant.name}</TableCell>
                            <TableCell>{applicant.email}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm" asChild>
                                    <a href={applicant.resumeUrl} target="_blank" rel="noopener noreferrer">
                                        <Eye className="mr-2 h-4 w-4" />
                                        View
                                    </a>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
