import Image from "next/image";

export default function CompanyStatement() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary tracking-tight">Our Mission & Core Values</h2>
            <p className="text-lg text-muted-foreground">
              We are dedicated to building strong, lasting relationships with our clients, founded on trust and mutual success. Our core principle is to deliver exceptional value and quality in every project we undertake.
            </p>
            <p className="text-lg text-muted-foreground">
              We believe in nurturing future talent through our comprehensive internship program. Interns gain invaluable real-world experience by working on live projects under the guidance of our senior developers, preparing them for a successful career in the tech industry.
            </p>
          </div>
          <div className="relative h-96 w-full">
            <div className="absolute top-0 left-0 h-72 w-3/5 rounded-lg overflow-hidden shadow-2xl transform -rotate-3 transition-transform duration-500 hover:rotate-0 hover:scale-105">
                <Image src="https://placehold.co/400x600.png" alt="Office collaboration" fill className="object-cover" data-ai-hint="team collaboration"/>
            </div>
            <div className="absolute bottom-0 right-0 h-72 w-3/5 rounded-lg overflow-hidden shadow-2xl transform rotate-3 transition-transform duration-500 hover:rotate-0 hover:scale-105">
                <Image src="https://placehold.co/400x600.png" alt="Developer at work" fill className="object-cover" data-ai-hint="developer coding"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
