
export default function MapEmbed() {
  return (
    <section className="bg-background">
      <div className="container max-w-7xl">
        <div className="aspect-video w-full rounded-lg overflow-hidden border shadow-sm">
           <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.522642502844!2d73.7839610148689!3d19.98656698657053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddec5f00000001%3A0x3c7e5b8d27e0a9a0!2sNashik%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1628588042466!5m2!1sen!2sus"
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
