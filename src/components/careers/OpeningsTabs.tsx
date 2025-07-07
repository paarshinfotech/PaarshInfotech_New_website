"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { jobOpenings } from "@/lib/careersData";
import JobCard from "./JobCard";
import { ApplicationModal } from "./ApplicationModal";

export default function OpeningsTabs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle);
    setIsModalOpen(true);
  };

  return (
    <section id="openings" className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Current Openings</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Find the role that's right for you and start your journey with us.
          </p>
        </div>
        <Tabs defaultValue="full-time" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="full-time">Full-Time Jobs</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
          </TabsList>
          <TabsContent value="full-time" className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jobOpenings.fullTime.map((job) => (
                <JobCard key={job.title} job={job} onApplyClick={handleApplyClick} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="internships" className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jobOpenings.internships.map((job) => (
                <JobCard key={job.title} job={job} onApplyClick={handleApplyClick} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <ApplicationModal 
        jobTitle={selectedJobTitle}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </section>
  );
}
