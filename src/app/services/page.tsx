import ServicesGrid from "@/components/home/ServicesGrid";
import ExpectedOutcomes from "@/components/services/ExpectedOutcomes";
import ProblemSolutionGrid from "@/components/services/ProblemSolutionGrid";
import ServiceLifecycle from "@/components/services/ServiceLifecycle";
import SolutionFinder from "@/components/services/SolutionFinder";

export default function ServicesPage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
            Our Services
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80">
            We offer a comprehensive suite of technology solutions to empower your business and drive growth.
          </p>
        </div>
      </section>
      <ServicesGrid />
      <SolutionFinder />
      <ProblemSolutionGrid />
      <ServiceLifecycle />
      <ExpectedOutcomes />
    </>
  );
}
