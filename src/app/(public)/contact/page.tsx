import { ContactForm } from "@/components/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactDetails from "@/components/contact/ContactDetails";
import OfficeLocations from "@/components/contact/OfficeLocations";
import WorkingHours from "@/components/contact/WorkingHours";
import SocialLinks from "@/components/contact/SocialLinks";
import MapEmbed from "@/components/contact/MapEmbed";
import ContactFAQs from "@/components/contact/ContactFAQs";
import ContactCTA from "@/components/contact/ContactCTA";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left Column: Details */}
            <div className="lg:col-span-1">
              <ContactDetails />
            </div>
            
            {/* Right Column: Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      <OfficeLocations />
      <MapEmbed />
      <ContactFAQs />
      <ContactCTA />
    </>
  );
}
