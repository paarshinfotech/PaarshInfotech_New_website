"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { successStoriesData } from "@/lib/careersData";

export default function SuccessStories() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Success Stories from Our Alumni</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Hear from past interns and employees about their journey and growth at Paarsh Infotech.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {successStoriesData.map((story, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <div className="p-4 h-full">
                  <Card className="h-full bg-secondary/50 shadow-sm flex flex-col p-8">
                    <CardContent className="p-0 flex-grow">
                      <p className="text-foreground/80 mb-6 italic">"{story.quote}"</p>
                    </CardContent>
                    <div className="flex items-center gap-4 mt-auto pt-4 border-t">
                        <Image src={story.avatar} alt={story.name} width={48} height={48} className="rounded-full object-cover" data-ai-hint={story.hint} />
                        <div>
                            <p className="font-semibold text-primary">{story.name}</p>
                            <p className="text-sm text-muted-foreground">{story.role}</p>
                        </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
