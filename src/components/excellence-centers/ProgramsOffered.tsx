"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { programsOffered } from "@/lib/excellenceCentersData";
import { Badge } from "@/components/ui/badge";
import { IconType } from "react-icons";

interface ProgramsOffered {
  title: string;
  description: string;
  tags: string[];
  icon: IconType;
}

import { useGetProgramsQuery } from "@/services/api";

export default function ProgramsOffered() {
  const { data: programsOfferedData, isLoading } =
    useGetProgramsQuery(undefined);

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Programs Offered
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            A look at the specialized courses, certifications, and internships
            we provide through our centers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programsOfferedData?.data.map((program: ProgramsOffered) => (
            <Card
              key={program.title}
              className="flex flex-col group hover:shadow-lg transition-shadow bg-background"
            >
              <CardHeader>
                <div className="mb-4">
                  <program.icon className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-xl text-primary">
                  {program.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  {program.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {program.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
