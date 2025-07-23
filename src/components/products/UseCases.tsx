import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LuHospital,
  LuLandmark,
  LuGraduationCap,
  LuBuilding2,
} from "react-icons/lu";

const useCases = [
  {
    title: "Healthcare",
    description:
      "Streamline patient management, appointments, and records with our secure and compliant CRM and HRMS solutions.",
    Icon: LuHospital,
  },
  {
    title: "Finance",
    description:
      "Enhance security, ensure regulatory compliance, and automate financial reporting with our powerful ERP system.",
    Icon: LuLandmark,
  },
  {
    title: "Education",
    description:
      "Manage student data, create online courses, and facilitate remote learning with our E-Learn and CRM platforms.",
    Icon: LuGraduationCap,
  },
  {
    title: "Manufacturing",
    description:
      "Optimize your supply chain, manage inventory, and control production floors with our comprehensive ERP solution.",
    Icon: LuBuilding2,
  },
];

export default function UseCases() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Tailored for Your Industry
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Our products are versatile and can be customized to meet the unique
            challenges of any industry.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase) => (
            <Card
              key={useCase.title}
              className="flex items-start p-6 gap-6 shadow-sm hover:shadow-lg transition-shadow bg-background"
            >
              <div className="p-4 bg-primary/10 rounded-full">
                <useCase.Icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl text-primary mb-2">
                  {useCase.title}
                </CardTitle>
                <p className="text-muted-foreground">{useCase.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
