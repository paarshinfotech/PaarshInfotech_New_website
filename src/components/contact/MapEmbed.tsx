export default function MapEmbed() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Find Our Headquarters
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Visit our main office in Nashik. We look forward to welcoming you.
          </p>
        </div>
        <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-primary/10 shadow-xl shadow-primary/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.6456650845407!2d73.77936237468732!3d19.981398422927157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddebee73f7beb3%3A0x180f540ccce09ace!2sPAARSH%20INFOTECH%20PVT%20LTD!5e0!3m2!1sen!2sin!4v1765533721946!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
