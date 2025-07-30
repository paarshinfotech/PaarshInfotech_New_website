import { LuPhone, LuMail, LuLinkedin, LuTwitter, LuInstagram, LuFacebook } from 'react-icons/lu';
import type { IconType } from 'react-icons';

export const contactInfo = [
  {
    Icon: LuPhone,
    title: "Phone",
    value: "+91 98609 88343",
    href: "tel:+919860988343",
  },
  {
    Icon: LuMail,
    title: "Primary Email",
    value: "info@paarshinfotech.com",
    href: "mailto:info@paarshinfotech.com",
  },
  {
    Icon: LuMail,
    title: "Secondary Email",
    value: "paarshinfotech@gmail.com",
    href: "mailto:paarshinfotech@gmail.com",
  },
];

export const officeLocations = [
    {
        city: "Nashik Office (HQ)",
        address: "Office No. 1, Bhakti Apartment, near Hotel Rasoi, Suchita Nagar, Mumbai Naka, Nashik, Maharashtra, India",
        pincode: "422009",
        mapUrl: "https://goo.gl/maps/bK7bJ8eR7z9y9A8t9"
    },
    {
        city: "Nashik Office",
        address: "Pandit Colony, Nashik, Maharashtra, India",
        pincode: "422002",
        mapUrl: "https://goo.gl/maps/example"
    },
    {
        city: "Pune Office",
        address: "Pune, Maharashtra, India",
        pincode: "411001",
        mapUrl: "https://goo.gl/maps/example"
    },
    {
        city: "Sangli Office",
        address: "G1 Pragati Residency, Lane No. 4, Pragati Colony, Near Diamond Hotel, 100 Ft. Road, Sangli, Maharashtra, India",
        pincode: "416416",
        mapUrl: "https://goo.gl/maps/example"
    },
    {
        city: "Surat Office",
        address: "Office No. 12, Exceluss Business Space, Bhimrad Canal Road, Althan, Surat, Gujarat, India",
        pincode: "395017",
        mapUrl: "https://goo.gl/maps/example"
    },
    {
        city: "Dharwad Office",
        address: "Office No. 1, Shelke Complex, Near Harimandir Mankilla, Dharwad, Karnataka, India",
        pincode: "580001",
        mapUrl: "https://goo.gl/maps/example"
    },
    {
        city: "Jalgaon Office",
        address: "Gurukul Colony, near MJ College, Beside JDCC Bank, Jalgaon, Maharashtra, India",
        pincode: "425001",
        mapUrl: "https://goo.gl/maps/example"
    }
];

export const workingHours = [
    { day: "Monday - Friday", hours: "9:30 AM – 6:30 PM" },
    { day: "Saturday", hours: "10:00 AM – 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
];

export const contactFAQs = [
    {
        question: "What is the typical response time?",
        answer: "We strive to respond to all inquiries within 24 business hours. For urgent matters, we recommend calling us directly."
    },
    {
        question: "How can I get a quote for my project?",
        answer: "The best way to get a quote is by filling out our detailed quote request form on the 'Get a Quote' page. This allows us to understand your requirements thoroughly and provide an accurate estimate."
    },
    {
        question: "Do you offer consultations?",
        answer: "Yes, we offer free initial consultations to discuss your project ideas and how we can help. Please contact us to schedule a call."
    },
    {
        question: "Where can I find information about careers?",
        answer: "All our job openings and internship opportunities are listed on our 'Careers' page. You can apply directly through the application forms provided there."
    }
];

export const socialLinks: { name: string, Icon: IconType, href: string }[] = [
    { name: "LinkedIn", Icon: LuLinkedin, href: "#" },
    { name: "Facebook", Icon: LuFacebook, href: "#" },
    { name: "Twitter", Icon: LuTwitter, href: "#" },
    { name: "Instagram", Icon: LuInstagram, href: "#" },
];
