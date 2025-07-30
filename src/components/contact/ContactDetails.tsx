import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactInfoCards from "./ContactInfoCards";
import WorkingHours from "./WorkingHours";
import SocialLinks from "./SocialLinks";

export default function ContactDetails() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-4">Get in Touch</h2>
        <p className="text-foreground/80 mb-6">
          We'd love to hear from you. For immediate assistance, please use the contact details provided.
        </p>
      </div>

      <div className="space-y-4">
        <ContactInfoCards />
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <WorkingHours />
          <SocialLinks />
        </CardContent>
      </Card>
    </div>
  );
}
