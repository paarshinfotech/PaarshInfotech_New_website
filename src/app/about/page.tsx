import Image from "next/image";
import Stats from "@/components/home/Stats";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function AboutPage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
            About Paarsh Infotech
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80">
            We are innovators, creators, and partners in your technological journey.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="w-full h-96 relative rounded-lg overflow-hidden">
              <Image
                src="https://placehold.co/800x600.png"
                alt="Paarsh Infotech Office"
                fill
                className="object-cover"
                data-ai-hint="modern office"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Our Story</h2>
              <p className="text-foreground/80 mb-4">
                Founded with a passion for technology and a vision for excellence, Paarsh Infotech Pvt Ltd has grown from a small team of dedicated developers into a full-service software development company. Our headquarters in Nashik serves as a hub of innovation where we craft digital solutions for a global clientele.
              </p>
              <p className="text-foreground/80">
                Our mission is to empower businesses with technology that is not only powerful but also intuitive and reliable. We believe in building long-term partnerships with our clients, guided by principles of transparency, collaboration, and mutual success.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Stats />
      <WhyChooseUs />
    </>
  );
}
