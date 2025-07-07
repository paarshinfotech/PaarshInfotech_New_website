import { Phone, Mail, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const contactInfo = [
  {
    Icon: Phone,
    title: "Phone",
    value: "+91 12345 67890",
    href: "tel:+911234567890",
  },
  {
    Icon: Mail,
    title: "Email",
    value: "info@paarshinfotech.com",
    href: "mailto:info@paarshinfotech.com",
  },
];

export const officeLocations = [
    {
        city: "Nashik (HQ)",
        address: "123 Tech Park, College Road",
        pincode: "422005, Maharashtra, India"
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

export const socialLinks: { name: string, Icon: LucideIcon, href: string }[] = [
    { name: "LinkedIn", Icon: Linkedin, href: "#" },
    { name: "Facebook", Icon: Facebook, href: "#" },
    { name: "Twitter", Icon: Twitter, href: "#" },
    { name: "Instagram", Icon: Instagram, href: "#" },
];
