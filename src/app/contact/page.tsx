import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
            Contact Us
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80">
            We'd love to hear from you. Let's get in touch.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Get in Touch</h2>
              <p className="text-foreground/80 mb-6">
                Have a question or a project in mind? Fill out the form, and we'll get back to you as soon as possible.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-primary">Office Address</h3>
                  <p className="text-muted-foreground">Paarsh Infotech Pvt Ltd, Nashik, Maharashtra, India</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">Email</h3>
                  <a href="mailto:info@paarshinfotech.com" className="text-muted-foreground hover:text-primary">info@paarshinfotech.com</a>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">Phone</h3>
                   <a href="tel:+911234567890" className="text-muted-foreground hover:text-primary">+91 12345 67890</a>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
