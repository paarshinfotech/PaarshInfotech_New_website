"use client";

import Image from "next/image";
import { employeeSpotlight as initialEmployeeSpotlight } from "@/lib/mediaData";
import { Card } from "../ui/card";
import { ImagePreviewModal } from "../common/ImagePreviewModal";
import { useState } from "react";

export default function EmployeeSpotlight() {
  const [employeeSpotlight, setEmployeeSpotlight] = useState(
    initialEmployeeSpotlight
  );
  const { name, role, quote, avatar, hint } = employeeSpotlight;

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Employee Spotlight
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Celebrating the people who make Paarsh Infotech great.
          </p>
        </div>
        <Card className="grid md:grid-cols-3 gap-8 items-center p-8 shadow-lg bg-background">
          <ImagePreviewModal imgSrc={avatar} alt={`Portrait of ${name}`}>
            <div className="relative aspect-square md:col-span-1 cursor-pointer">
              <Image
                src={avatar}
                alt={`Portrait of ${name}`}
                fill
                className="object-cover rounded-lg shadow-md"
                data-ai-hint={hint}
              />
            </div>
          </ImagePreviewModal>
          <div className="md:col-span-2 space-y-4 text-center md:text-left">
            <blockquote className="text-xl italic text-foreground/80 border-l-4 border-accent pl-6 md:border-l-0 md:pl-0 md:border-t-4 md:pt-6">
              "{quote}"
            </blockquote>
            <div>
              <p className="text-lg font-semibold text-primary">{name}</p>
              <p className="text-base text-muted-foreground">{role}</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
