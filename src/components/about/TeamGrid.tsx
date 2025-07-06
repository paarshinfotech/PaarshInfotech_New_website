import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const teamMembers = [
  { name: "Priya Sharma", role: "HR Manager", avatar: "https://placehold.co/200x200.png", hint: "professional woman" },
  { name: "Rajesh Kumar", role: "Lead PHP Developer", avatar: "https://placehold.co/200x200.png", hint: "professional man" },
  { name: "Anita Desai", role: "Full Stack Developer", avatar: "https://placehold.co/200x200.png", hint: "woman developer" },
  { name: "Vikram Singh", role: "Data Analyst", avatar: "https://placehold.co/200x200.png", hint: "man at computer" },
  { name: "Sunita Reddy", role: "UI/UX Designer", avatar: "https://placehold.co/200x200.png", hint: "creative woman" },
  { name: "Arjun Mehta", role: "Project Manager", avatar: "https://placehold.co/200x200.png", hint: "ceo portrait" },
  { name: "Kavita Rao", role: "Marketing Head", avatar: "https://placehold.co/200x200.png", hint: "woman marketing" },
  { name: "Rohan Gupta", role: "DevOps Engineer", avatar: "https://placehold.co/200x200.png", hint: "man infrastructure" },
];

export default function TeamGrid() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Meet Our Expert Team</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            A dedicated group of professionals committed to your success.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <CardHeader className="items-center p-6">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-secondary"
                  data-ai-hint={member.hint}
                />
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <CardTitle className="text-xl text-primary">{member.name}</CardTitle>
                <p className="text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
