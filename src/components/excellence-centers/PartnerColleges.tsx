
import { partnerColleges } from "@/lib/excellenceCentersData";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function PartnerColleges() {
  return (
    <section id="partners" className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Our Academic Partners
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            We are proud to collaborate with these esteemed institutions to
            shape the future of technology education.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {partnerColleges.map((college) => (
            <Card
              key={college.name}
              className="p-6 flex flex-col items-center justify-center aspect-square transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer bg-background"
            >
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={college.logo}
                  alt={`${college.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center font-semibold text-primary">
                {college.name}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
