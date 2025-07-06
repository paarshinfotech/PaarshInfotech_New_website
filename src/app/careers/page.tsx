import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

const jobOpenings = [
  {
    title: "Senior React Developer",
    location: "Nashik, India (Remote options available)",
    description: "We are looking for an experienced React developer to join our team and build amazing user interfaces."
  },
  {
    title: "Lead Python/Django Engineer",
    location: "Nashik, India",
    description: "Lead our backend team in developing scalable and robust web applications using Python and Django."
  },
  {
    title: "UI/UX Designer",
    location: "Remote",
    description: "A creative UI/UX designer to craft beautiful and intuitive experiences for our clients."
  },
  {
    title: "DevOps Engineer",
    location: "Nashik, India",
    description: "Manage and improve our CI/CD pipelines, cloud infrastructure, and deployment processes."
  }
];

export default function CareersPage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
            Join Our Team
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80">
            Be a part of a passionate team that's building the future of software.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Current Openings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobOpenings.map((job) => (
              <Card key={job.title}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{job.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/contact">Apply Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
