import Image from "next/image";

export default function DirectorCard() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-5xl">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          <div className="relative aspect-square md:col-span-1">
            <Image 
              src="https://placehold.co/400x400.png" 
              alt="Mr. Kantilal B. Pagare, Director" 
              fill 
              className="object-cover rounded-lg shadow-xl" 
              data-ai-hint="professional man" 
            />
          </div>
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-3xl font-bold text-primary">A Word from Our Director</h2>
            <blockquote className="text-xl italic text-foreground/80 border-l-4 border-accent pl-6">
              "Our journey began with a simple vision: to build technology that empowers people. We are committed to fostering innovation, nurturing talent, and delivering excellence in everything we do. Our clients' success is our greatest achievement."
            </blockquote>
            <div>
              <p className="text-lg font-semibold text-primary">Mr. Kantilal B. Pagare</p>
              <p className="text-base text-muted-foreground">Director, Paarsh Infotech Pvt. Ltd.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
