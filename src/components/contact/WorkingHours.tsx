import { workingHours } from "@/lib/contactData";

export default function WorkingHours() {
  return (
    <div>
        <h3 className="text-xl font-bold text-primary mb-4">Working Hours</h3>
        <div className="space-y-2 text-muted-foreground">
            {workingHours.map((item) => (
                <div key={item.day} className="flex justify-between">
                    <span>{item.day}</span>
                    <span className="font-medium">{item.hours}</span>
                </div>
            ))}
        </div>
    </div>
  );
}
