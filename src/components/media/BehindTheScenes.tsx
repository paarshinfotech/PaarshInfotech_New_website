
"use client";

import Image from "next/image";
import { useGetMediaItemsQuery } from "@/services/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

export default function BehindTheScenes() {
  const { data: btsItems = [], isLoading } = useGetMediaItemsQuery('bts');
  
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">A Day in the Life</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            A candid look at our daily routines, where passion for technology meets a collaborative spirit.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <Skeleton className="aspect-video w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3 mt-2" />
                </CardContent>
              </Card>
            ))
          ) : (
            btsItems.map((item: any) => (
              <Card key={item._id} className="rounded-lg overflow-hidden border bg-card group">
                <div className="relative h-56 w-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={item.hint}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
