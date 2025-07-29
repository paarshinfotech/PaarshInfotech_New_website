"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import JobCard from "./JobCard";
import { ApplicationModal } from "./ApplicationModal";
import { useGetJobsQuery } from "@/services/api";
import { format } from "date-fns";

interface Job {
  _id: string;
  title: string;
  type: string;
  location: string;
  status: string;
  published: boolean;
  description: string;
  skills: string[];
  publishDate: string;
  applicants: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function OpeningsTabs() {
  const { data: jobsData, isLoading, error } = useGetJobsQuery(undefined);
  const jobs: Job[] = jobsData || [];
  console.log("Jobs Data : ", jobsData);
  console.log("Processed Jobs : ", jobs);

  const fullTimeJobs = jobs.filter((job: Job) => job.type === "Full-Time");
  const internships = jobs.filter((job: Job) => job.type === "Internship");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle);
    setIsModalOpen(true);
  };

  // Format publishDate to a readable date (e.g., "July 22, 2025")
  const formatPostedDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch {
      return dateString; // Fallback to raw string if parsing fails
    }
  };

  return (
    <section id="openings" className="py-16 md:py-24 bg-secondary min-h-screen">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Current Openings
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Find the role that's right for you and start your journey with us.
          </p>
        </div>

        {error ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-red-500">
              Failed to load job openings. Please try again later.
            </div>
          </div>
        ) : isLoading ? (
          <Tabs defaultValue="full-time" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="full-time">Full-Time Jobs</TabsTrigger>
              <TabsTrigger value="internships">Internships</TabsTrigger>
            </TabsList>
            <TabsContent value="full-time" className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex flex-col h-full">
                    <Skeleton className="h-64 w-full bg-gray-200" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="internships" className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex flex-col h-full">
                    <Skeleton className="h-64 w-full bg-gray-200" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <Tabs defaultValue="full-time" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="full-time">Full-Time Jobs</TabsTrigger>
              <TabsTrigger value="internships">Internships</TabsTrigger>
            </TabsList>
            <TabsContent value="full-time" className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {fullTimeJobs.length === 0 ? (
                  <p className="text-center text-muted-foreground col-span-2">
                    No full-time positions currently open. Check back soon!
                  </p>
                ) : (
                  fullTimeJobs.map((job: Job) => (
                    <JobCard
                      key={job._id}
                      job={{ ...job, posted: formatPostedDate(job.publishDate) }}
                      onApplyClick={handleApplyClick}
                    />
                  ))
                )}
              </div>
            </TabsContent>
            <TabsContent value="internships" className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {internships.length === 0 ? (
                  <p className="text-center text-muted-foreground col-span-2">
                    No internships currently available. Check back soon!
                  </p>
                ) : (
                  internships.map((job: Job) => (
                    <JobCard
                      key={job._id}
                      job={{ ...job, posted: formatPostedDate(job.publishDate) }}
                      onApplyClick={handleApplyClick}
                    />
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
      <ApplicationModal
        jobTitle={selectedJobTitle}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </section>
  );
}