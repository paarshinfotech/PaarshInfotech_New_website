import { Card } from "@/components/ui/card";
import { contactInfo } from "@/lib/contactData";

export default function ContactInfoCards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {contactInfo.map((info) => (
        <a key={info.title} href={info.href} className="block group">
          <Card className="p-6 h-full transition-all duration-300 group-hover:bg-primary/5 group-hover:shadow-lg group-hover:-translate-y-1 text-center">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-primary/10 rounded-full inline-flex transition-colors group-hover:bg-accent">
                <info.Icon className="w-8 h-8 text-primary transition-colors group-hover:text-accent-foreground" />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold text-primary">{info.title}</h3>
                <p className="text-muted-foreground break-all mt-1">{info.value}</p>
              </div>
            </div>
          </Card>
        </a>
      ))}
    </div>
  );
}
