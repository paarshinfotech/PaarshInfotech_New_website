import AboutHero from "@/components/about/AboutHero";
import CompanyStatement from "@/components/about/CompanyStatement";
import CompanyStats from "@/components/about/CompanyStats";
import DirectorCard from "@/components/about/DirectorCard";
import VisionStatement from "@/components/about/VisionStatement";
import TeamGrid from "@/components/about/TeamGrid";
import Testimonials from "@/components/about/Testimonials";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyStatement />
      <VisionStatement />
      <CompanyStats />
      <DirectorCard />
      <TeamGrid />
      <Testimonials />
    </>
  );
}
