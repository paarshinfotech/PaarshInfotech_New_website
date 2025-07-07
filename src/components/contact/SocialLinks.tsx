import { Button } from "@/components/ui/button";
import { socialLinks } from "@/lib/contactData";

export default function SocialLinks() {
  return (
    <div>
      <h3 className="text-xl font-bold text-primary mb-4">Follow Us</h3>
      <div className="flex gap-2">
        {socialLinks.map((link) => (
          <Button key={link.name} variant="outline" size="icon" asChild>
            <a href={link.href} aria-label={link.name}>
              <link.Icon className="w-5 h-5" />
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}
