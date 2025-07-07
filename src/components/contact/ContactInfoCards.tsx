import { Card } from "@/components/ui/card";
import { contactInfo } from "@/lib/contactData";

export default function ContactInfoCards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {contactInfo.map((info) => (
        <a key={info.title} href={info.href} className="block group">
          <Card className="p-6 h-full transition-all duration-300 group-hover:bg-primary/5 group-hover:border-primary/20 group-hover:shadow-lg group-hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <info.Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">{info.title}</h3>
                <p className="text-muted-foreground break-all">{info.value}</p>
              </div>
            </div>
          </Card>
        </a>
      ))}
    </div>
  );
}
