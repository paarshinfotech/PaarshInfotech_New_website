
import { studentBenefits } from "@/lib/excellenceCentersData";
import { LuCheck } from "react-icons/lu";

export default function StudentBenefits() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Key Benefits for Students
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Our program is designed to provide students with a competitive edge
            in the tech industry.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {studentBenefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1 p-1 bg-primary text-primary-foreground rounded-full">
                <LuCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
