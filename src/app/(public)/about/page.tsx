
'use client'

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
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function AboutPage() {
  const { settings } = useSiteSettings();

  return (
    <>
      <AboutHero />
      <CompanyStatement />
      <VisionStatement />
      <OurValues />
      <Stats />
      {/* Leadership and Team section */}
      <div className="bg-background">
        {settings.showLeadership && <LeadershipTeam />}
        {settings.showTeam && <TeamGrid />}
      </div>
      <OurJourney />
      <OurProcess />
      <CompanyCulture />
      <Testimonials />
    </>
  );
}
