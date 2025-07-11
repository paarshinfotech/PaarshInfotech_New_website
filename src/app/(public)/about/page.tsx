import AboutHero from "@/components/about/AboutHero";
import CompanyStatement from "@/components/about/CompanyStatement";
import VisionStatement from "@/components/about/VisionStatement";
import TeamGrid from "@/components/about/TeamGrid";
import Testimonials from "@/components/about/Testimonials";
import OurValues from "@/components/about/OurValues";
import OurProcess from "@/components/about/OurProcess";
import LeadershipTeam from "@/components/about/LeadershipTeam";
import CompanyCulture from "@/components/about/CompanyCulture";
import Stats from "@/components/home/Stats";
import OurJourney from "@/components/about/OurJourney";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyStatement />
      <VisionStatement />
      <OurJourney />
      <OurValues />
      <OurProcess />
      <Stats />
      <LeadershipTeam />
      <TeamGrid />
      <CompanyCulture />
      <Testimonials />
    </>
  );
}
