import { ContactForm } from "@/components/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactDetails from "@/components/contact/ContactDetails";
import OfficeLocations from "@/components/contact/OfficeLocations";
import MapEmbed from "@/components/contact/MapEmbed";
import ContactFAQs from "@/components/contact/ContactFAQs";
import ContactCTA from "@/components/contact/ContactCTA";
import { Card, CardContent } from "@/components/ui/card";
import { ResponseTimeInfo } from "@/components/contact/ResponseTimeInfo";

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-6 lg:gap-6">
            {/* Left Column: Details */}
            <div className="lg:col-span-2">
              <ContactDetails />
            </div>
            
            {/* Right Column: Form */}
            <div className="lg:col-span-2 space-y-8">
              <ContactForm />
              <ResponseTimeInfo />
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
