
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { upcomingEvents } from "@/lib/excellenceCentersData";
import { Button } from "../ui/button";
import { LuCalendar, LuClock, LuMapPin, LuArrowRight } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";

export default function UpcomingEvents() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <Card
              key={event.title}
              className="flex flex-col group hover:shadow-lg transition-shadow bg-background"
            >
              <CardHeader>
                <Badge
                  variant={
                    event.type === "Workshop" ? "default" : "secondary"
                  }
                  className="w-fit mb-2"
                >
                  {event.type}
                </Badge>
                <CardTitle className="text-xl text-primary">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <LuCalendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <LuClock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <LuMapPin className="w-4 h-4" />
                  <span>{event.location}</span>
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
      </div>
    </section>
  );
}
