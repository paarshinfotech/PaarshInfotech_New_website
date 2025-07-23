
import { milestones } from "@/lib/excellenceCentersData";

export default function Milestones() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Our Journey & Milestones
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Tracing our progress in establishing a network of excellence and
            empowering students.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-4 md:left-1/2 w-0.5 h-full bg-border -translate-x-1/2"
            aria-hidden="true"
          ></div>
          <div className="space-y-16">
            {milestones.map((item, index) => (
              <div
                key={index}
                className="relative flex items-center md:justify-normal md:odd:flex-row-reverse group"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary absolute left-4 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 z-10 ring-8 ring-background group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <item.Icon className="w-4 h-4" />
                </div>
                <div className="w-full md:w-[calc(50%-2.5rem)] bg-secondary/50 p-6 rounded-lg shadow-md border border-transparent md:group-odd:ml-auto md:group-even:mr-auto group-hover:border-accent group-hover:shadow-lg transition-all duration-300 ml-14 md:ml-0">
                  <p className="text-accent font-bold text-lg mb-1">
                    {item.date}
                  </p>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
