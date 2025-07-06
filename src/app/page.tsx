import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import About from "@/components/home/About";
import ServicesGrid from "@/components/home/ServicesGrid";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import Clients from "@/components/home/Clients";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <About />
      <ServicesGrid />
      <Stats />
      <Testimonials />
      <Clients />
      <Newsletter />
    </>
  );
}
