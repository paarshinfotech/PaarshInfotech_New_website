"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { LuCalendar, LuMapPin, LuArrowRight } from "react-icons/lu";
import { useGetWorkshopsQuery } from "@/services/api";
import { format } from "date-fns";

interface Workshop {
  _id: string;
  title: string;
  date: string;
  location: string;
  presenter: string;
  description: string;
  topics: string[];
  status: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function UpcomingEvents() {
  const { data: workshopData, isLoading, error } = useGetWorkshopsQuery(undefined);
  const workshops: Workshop[] = workshopData?.data || [];

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-secondary min-h-screen">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Upcoming Events & Workshops
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Join us for our upcoming sessions to learn new skills, network with
            experts, and grow your career.
          </p>
        </div>

        {error ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-red-500">
              Failed to load workshops. Please try again later.
            </div>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={index}
                className="flex flex-col group hover:shadow-lg transition-shadow bg-background"
              >
                <CardHeader>
                  <Skeleton className="h-5 w-16 mb-2 bg-gray-200" />
                  <Skeleton className="h-6 w-3/4 bg-gray-200" />
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4 bg-gray-200" />
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4 bg-gray-200" />
                    <Skeleton className="h-4 w-20 bg-gray-200" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-6 w-24 bg-gray-200" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : workshops.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">
              No upcoming workshops available.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((event) => (
              <Card
                key={event._id}
                className="flex flex-col group hover:shadow-lg transition-shadow bg-background"
              >
                <CardHeader>
                  <Badge
                    variant={event.status === "Upcoming" ? "default" : "secondary"}
                    className="w-fit mb-2"
                  >
                    {event.status}
                  </Badge>
                  <CardTitle className="text-xl text-primary">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <LuCalendar className="w-4 h-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <LuMapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="font-semibold">Presenter:</span>
                    <span>{event.presenter}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="p-0 h-auto">
                    Register Now <LuArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}