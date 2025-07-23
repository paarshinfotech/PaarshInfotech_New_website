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

  // In a real app, this data would come from an API. For now, we mock it.
  // The admin panel state doesn't persist, so we filter the source data.
  const publishedFullTime = jobOpenings.fullTime;
  const publishedInternships = jobOpenings.internships;

  return (
    <section id="openings" className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Current Openings
          </h2>
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
              {publishedFullTime.map((job) => (
                <JobCard
                  key={job.title}
                  job={job}
                  onApplyClick={handleApplyClick}
                />
              ))}
            </div>
            {publishedFullTime.length === 0 && (
              <p className="text-center text-muted-foreground col-span-2">
                No full-time positions currently open. Check back soon!
              </p>
            )}
          </TabsContent>
          <TabsContent value="internships" className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {publishedInternships.map((job) => (
                <JobCard
                  key={job.title}
                  job={job}
                  onApplyClick={handleApplyClick}
                />
              ))}
            </div>
            {publishedInternships.length === 0 && (
              <p className="text-center text-muted-foreground col-span-2">
                No internships currently available. Check back soon!
              </p>
            )}
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
