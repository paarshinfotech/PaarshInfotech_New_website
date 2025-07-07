import { ContactForm } from "@/components/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
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
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">Get in Touch</h2>
                <p className="text-foreground/80 mb-6">
                  If you require any level of business support for our services, please get in touch with us via the methods below. For immediate assistance, please use the contact details provided.
                </p>
              </div>
              <ContactInfoCards />
              <Card>
                <CardContent className="p-6 grid sm:grid-cols-2 gap-8 items-start">
                  <WorkingHours />
                  <SocialLinks />
                </CardContent>
              </Card>
            </div>
            <div>
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
