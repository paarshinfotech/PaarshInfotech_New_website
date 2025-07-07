import Image from "next/image";

const behindTheScenesData = [
  {
    image: "https://placehold.co/600x400.png",
    hint: "team brainstorming",
    title: "Daily Standups & Brainstorms",
    description: "Where great ideas are born. Our daily huddles are collaborative, energetic, and focused on solving challenges together."
  },
  {
    image: "https://placehold.co/600x400.png",
    hint: "developer coding",
    title: "Deep Focus Work",
    description: "We value focused time to code, design, and create. Our workspace is designed to help everyone do their best work without distractions."
  },
  {
    image: "https://placehold.co/600x400.png",
    hint: "client presentation",
    title: "Client Collaboration",
    description: "Partnership is key. We work closely with our clients, involving them in the process to ensure we build solutions that truly meet their needs."
  }
];

export default function BehindTheScenes() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">A Day in the Life</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            A candid look at our daily routines, where passion for technology meets a collaborative spirit.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {behindTheScenesData.map((item) => (
            <div key={item.title} className="rounded-lg overflow-hidden border bg-card group">
              <div className="relative h-56 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={item.hint}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
