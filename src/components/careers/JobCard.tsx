import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Clock, Sparkles } from "lucide-react";

interface Job {
  title: string;
  experience: string;
  location: string;
  skills: string[];
  posted: string;
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
                <Briefcase className="w-4 h-4" />
                <span>{job.experience}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <h4 className="font-semibold mb-2 text-primary flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent" />
          Skills
        </h4>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <Badge key={skill} variant="secondary">{skill}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            Posted {job.posted}
        </p>
        <Button onClick={() => onApplyClick(job.title)}>Apply Now</Button>
      </CardFooter>
    </Card>
  );
}
