"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useGetAwardsQuery } from "@/services/api";
import { ComponentType } from "react";
import { LuAward, LuStar, LuTrophy } from "react-icons/lu";

// Icon mapping for dynamic icons
const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  LuAward,
  LuStar,
  LuTrophy,
};

interface Award {
  _id: string;
  title: string;
  year: string;
  description: string;
  icon: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Awards() {
  const { data: AwardsData, isLoading, error } = useGetAwardsQuery(undefined);
  const awards: Award[] = AwardsData?.data || [];

  return (
    <section className="py-16 md:py-24 bg-background min-h-screen">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Awards & Recognitions
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Celebrating the achievements and impact of our collaborative efforts.
          </p>
        </div>

        {error ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-red-500">
              Failed to load awards. Please try again later.
            </div>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={index}
                className="flex flex-col items-center text-center p-6 group hover:shadow-xl transition-shadow"
              >
                <CardHeader className="p-0">
                  <Skeleton className="w-12 h-12 mb-4 bg-gray-200" />
                  <Skeleton className="h-6 w-3/4 bg-gray-200" />
                  <Skeleton className="h-5 w-16 mt-2 bg-gray-200" />
                </CardHeader>
                <CardContent className="p-0 mt-4">
                  <Skeleton className="h-4 w-full bg-gray-200" />
                  <Skeleton className="h-4 w-5/6 mt-1 bg-gray-200" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : awards.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">
              No awards available.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awards.map((award) => {
              const IconComponent = iconMap[award.icon] || LuAward;
              return (
                <Card
                  key={award._id}
                  className="flex flex-col items-center text-center p-6 group hover:shadow-xl transition-shadow"
                >
                  <CardHeader className="p-0">
                    <div className="mb-4 flex justify-center">
                      <IconComponent className="w-12 h-12 text-accent" />
                    </div>
                    <CardTitle className="text-xl text-primary flex justify-center">
                      {award.title}
                    </CardTitle>
                    <Badge variant="outline" className="mt-2 flex justify-center">
                      {award.year}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-0 mt-4">
                    <p className="text-muted-foreground">{award.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}