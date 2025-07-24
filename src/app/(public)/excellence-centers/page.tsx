
import Hero from "@/components/excellence-centers/Hero";
import Introduction from "@/components/excellence-centers/Introduction";
import CollegeLocator from "@/components/excellence-centers/CollegeLocator";
import PartnerColleges from "@/components/excellence-centers/PartnerColleges";
import StudentBenefits from "@/components/excellence-centers/StudentBenefits";
import ProgramsOffered from "@/components/excellence-centers/ProgramsOffered";
import TechStack from "@/components/excellence-centers/TechStack";
import MediaGallery from "@/components/excellence-centers/MediaGallery";
import SuccessStories from "@/components/excellence-centers/SuccessStories";
import Testimonials from "@/components/excellence-centers/Testimonials";
import Milestones from "@/components/excellence-centers/Milestones";
import UpcomingEvents from "@/components/excellence-centers/UpcomingEvents";
import Awards from "@/components/excellence-centers/Awards";
import Collaborate from "@/components/excellence-centers/Collaborate";
import Faqs from "@/components/excellence-centers/Faqs";

export default function ExcellenceCentersPage() {
  return (
    <>
      <Hero />
      <Introduction />
      <PartnerColleges />
      <StudentBenefits />
      <ProgramsOffered />
      <CollegeLocator />
      <TechStack />
      <MediaGallery />
      <SuccessStories />
      <Testimonials />
      <Milestones />
      <UpcomingEvents />
      <Awards />
      <Collaborate />
      <Faqs />
    </>
  );
}
