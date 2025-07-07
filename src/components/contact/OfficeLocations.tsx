import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { officeLocations } from "@/lib/contactData";

export default function OfficeLocations() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Office</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            Come visit us at our headquarters.
          </p>
        </div>
        <div className="flex justify-center">
            {officeLocations.map((location) => (
                <Card key={location.city} className="max-w-md w-full">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <MapPin className="w-8 h-8 text-primary" />
                        <CardTitle className="text-2xl">{location.city}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{location.address}</p>
                        <p className="text-muted-foreground">{location.pincode}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
