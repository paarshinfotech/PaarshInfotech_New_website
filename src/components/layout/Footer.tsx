
"use client";

import { Service } from "@/lib/servicesData";
import { useGetServicesQuery } from "@/services/api";
import Link from "next/link";

export function Footer() {


  const {data: servicesData} = useGetServicesQuery(undefined);

  const services = servicesData?.data || [];

  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <img className="w-56" src="/uploads/paarsh-infotech-6 (1).png" alt="Paarsh Infotech" />
            <p className="text-sm">
              Your complete technology partner for fast, scalable, and reliable software solutions. We are the emerging tech experts.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/media" className="hover:text-primary transition-colors">Media</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
               <li><Link href="/excellence-centers" className="hover:text-primary transition-colors">Excellence Centers</Link></li>
            </ul>
          </div>
          
          {/* Services Links */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {services.map((service:Service) => (
                <li key={service._id}>
                  <Link href={`/services/${service._id}`} className="hover:text-primary transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <address className="not-italic space-y-2 text-sm">
              <p>Nashik, Maharashtra, India</p>
              <p>
                <a href="mailto:info@paarshinfotech.com" className="hover:text-primary transition-colors">info@paarshinfotech.com</a>
              </p>
              <p>
                <a href="tel:+911234567890" className="hover:text-primary transition-colors">+91 12345 67890</a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Paarsh Infotech Pvt Ltd. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            <Link href="#" className="hover:text-primary transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
