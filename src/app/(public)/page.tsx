
import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import About from "@/components/home/About";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import Clients from "@/components/home/Clients";
import Newsletter from "@/components/home/Newsletter";
import TechStackShowcase from "@/components/home/TechStackShowcase";
import FeatureHighlightTiles from "@/components/home/FeatureHighlightTiles";
import CompanyIntroVideo from "@/components/home/CompanyIntroVideo";
import ServicesGrid from "@/components/home/ServicesGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <About />
      <div className="text-center mt-16">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r text-primary from-blue-600 to-purple-600 bg-clip-text ">
          Our Services
        </h2>
        <p className="mt-2 text-lg text-foreground/70 max-w-2xl mx-auto">
          We offer a wide range of services to cover all your digital needs.
        </p>
      </div>
      <ServicesGrid />
      <TechStackShowcase />
      <CompanyIntroVideo />
      <FeatureHighlightTiles />
      <Stats />
      <Testimonials />
      <WhyChooseUs />
      <Newsletter />
    </>
  );
}
