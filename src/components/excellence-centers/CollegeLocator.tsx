
import { partnerColleges } from "@/lib/excellenceCentersData";
import { Button } from "@/components/ui/button";

export default function CollegeLocator() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Find an Excellence Center Near You
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Explore our network of partner colleges across the region. Use the
            filters to narrow your search.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-bold text-primary mb-4">Filter by State</h3>
              <div className="flex flex-wrap gap-2">
                {[...new Set(partnerColleges.map((c) => c.state))].map(
                  (state) => (
                    <Button key={state} variant="outline" size="sm">
                      {state}
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 aspect-[4/3] w-full rounded-lg overflow-hidden border-2 border-primary/10 shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.047111496!2d73.7805667!3d18.524545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1628588042466!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
