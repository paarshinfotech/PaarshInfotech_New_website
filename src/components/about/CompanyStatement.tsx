import Image from "next/image";

export default function CompanyStatement() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-foreground/80 text-lg">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Mission and Values</h2>
            <p>
              We are dedicated to building strong, lasting relationships with our clients, founded on trust and mutual success. Our core principle is to deliver exceptional value and quality in every project we undertake.
            </p>
            <p>
              We believe in nurturing future talent through our comprehensive internship program. Interns gain invaluable real-world experience by working on live projects under the guidance of our senior developers, preparing them for a successful career in the tech industry.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Image src="https://placehold.co/400x600.png" alt="Office environment 1" fill className="object-cover" data-ai-hint="office meeting"/>
            </div>
            <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg mt-8 transform hover:scale-105 transition-transform duration-300">
                <Image src="https://placehold.co/400x600.png" alt="Office environment 2" fill className="object-cover" data-ai-hint="team collaboration"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
