import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuMapPin } from "react-icons/lu";
import { officeLocations } from "@/lib/contactData";

export default function OfficeLocations() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Our Offices
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            Come visit us at one of our locations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {officeLocations.map((location) => (
            <Card key={location.city} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                <LuMapPin className="w-8 h-8 text-primary flex-shrink-0" />
                <CardTitle className="text-2xl">{location.city}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{location.address}</p>
                <p className="text-muted-foreground mt-2">
                  PIN - {location.pincode}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
