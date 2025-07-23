
import Image from "next/image";

export default function Introduction() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary tracking-tight">
              Fostering the Next Wave of Tech Innovators
            </h2>
            <p className="text-lg text-muted-foreground">
              Our Centers of Excellence are dedicated hubs of learning and
              innovation established in collaboration with top colleges. The
              program is designed to provide students with industry-relevant
              skills, hands-on experience with cutting-edge technologies, and direct
              mentorship from our experts.
            </p>
            <p className="text-lg text-muted-foreground">
              By bridging the gap between academic curricula and real-world
              industry demands, we empower students to graduate with the
              confidence and competence needed to excel in their careers.
            </p>
          </div>
          <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Mentorship session at an Excellence Center"
              fill
              className="object-cover"
              data-ai-hint="mentorship session"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
