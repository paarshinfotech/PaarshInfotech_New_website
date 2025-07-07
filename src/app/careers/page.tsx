import CareersHero from "@/components/careers/CareersHero";
import IntroSection from "@/components/careers/IntroSection";
import OpeningsTabs from "@/components/careers/OpeningsTabs";
import LifeAtPaarsh from "@/components/careers/LifeAtPaarsh";
import SuccessStories from "@/components/careers/SuccessStories";
import GrowthOpportunities from "@/components/careers/GrowthOpportunities";
import FAQsSection from "@/components/careers/FAQsSection";
import CallToActionBox from "@/components/careers/CallToActionBox";

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <IntroSection />
      <OpeningsTabs />
      <LifeAtPaarsh />
      <SuccessStories />
      <GrowthOpportunities />
      <FAQsSection />
      <CallToActionBox />
    </>
  );
}
