import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaLightbulb } from "react-icons/fa";

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
  posted: string; // Derived from publishDate
}

interface JobCardProps {
  job: Job;
  onApplyClick: (jobTitle: string) => void;
}

export default function JobCard({ job, onApplyClick }: JobCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground pt-2">
          <div className="flex items-center gap-1.5">
            <FaMapMarkerAlt className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-muted-foreground text-sm">{job.description}</p>
        <div>
          <h4 className="font-semibold mb-2 text-primary flex items-center gap-2">
            <FaLightbulb className="w-4 h-4 text-accent" />
            Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
            </div>
          </div>
        </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto">
        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
          <FaClock className="w-4 h-4" />
          Posted {job.posted}
        </p>
        <Button onClick={() => onApplyClick(job.title)}>Apply Now</Button>
      </CardFooter>
    </Card>
  );
}