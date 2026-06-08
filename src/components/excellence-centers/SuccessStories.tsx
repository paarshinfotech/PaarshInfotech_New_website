"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useGetSuccessStoriesQuery } from "@/services/api";
import { LuLoader } from "react-icons/lu";

export default function SuccessStories() {
  const { data, isLoading } = useGetSuccessStoriesQuery(true); // publishedOnly=true
  const stories = (data?.data || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  // Duplicate for infinite scroll effect
  const extendedStories = stories.length > 0 ? [...stories, ...stories] : [];

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl flex justify-center">
          <LuLoader className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (stories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Alumni Success Stories
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Hear from our graduates who have launched successful careers after
            completing our program.
          </p>
        </div>
        <div className="relative w-full overflow-hidden group">
          <div className="flex animate-marquee-right group-hover:[animation-play-state:paused]">
            {extendedStories.map((story: any, index: number) => (
              <div
                key={`${story._id}-${index}`}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4"
              >
                <Card className="h-full bg-secondary/50 shadow-sm flex flex-col p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <CardContent className="p-0 flex-grow">
                    <p className="text-foreground/80 mb-6 italic">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                  </CardContent>
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t">
                    <Image
                      src={story.avatar}
                      alt={story.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-primary">{story.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {story.role}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background via-transparent to-background"></div>
        </div>
      </div>
    </section>
  );
}
