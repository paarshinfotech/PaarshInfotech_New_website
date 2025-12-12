import { Card } from "@/components/ui/card";
import { contactInfo } from "@/lib/contactData";

export default function ContactInfoCards() {
  return (
    <div className="grid gap-4">
      {contactInfo.map((info) => (
        <a key={info.title} href={info.href} className="block group">
          <Card className="p-4 transition-all duration-300 group-hover:bg-primary/90 group-hover:text-white group-hover:shadow-md group-hover:border-primary/30">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg border-2 border-primary/20 group-hover:bg-primary/20 group-hover:border-white/50 group-hover:text-white transition-all duration-300">
                <info.Icon className="w-6 h-6 text-primary group-hover:text-white transition-all duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-primary group-hover:text-white transition-all duration-300">
                  {info.title}
                </h3>
                <p className="text-sm text-muted-foreground break-words leading-relaxed group-hover:text-white transition-all duration-300">
                  {info.value}
                </p>
              </div>
            </div>
          </Card>
        </a>
      ))}
    </div>
  );
}
